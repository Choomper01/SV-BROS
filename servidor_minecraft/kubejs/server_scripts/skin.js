// Versión compatible con KubeJS antiguo
var skins = {
    'charbel': 'https://i.imgur.com/4hRSnYO.png',
    'jorge': 'https://i.imgur.com/4hRSnYO.png',
    'gustavo': 'https://i.imgur.com/4hRSnYO.png'
};

// Función principal
function registerSkinCommand(event) {
    event.register('skin', function(builder) {
        builder.requires(function(source) {
            return source.hasPermission(2); // Requiere permisos de OP
        });
        
        // Versión con argumento
        builder.then(argument('nombre', StringArgumentType.string())
            .suggests(function(context, suggestions) {
                Object.keys(skins).forEach(function(key) {
                    suggestions.suggest(key);
                });
                return suggestions.buildFuture();
            })
            .executes(function(context) {
                var player = context.source.player;
                var nombre = StringArgumentType.getString(context, 'nombre').toLowerCase();
                
                if (!skins[nombre]) {
                    player.tell(Text.red('Nombre de skin no válido. Opciones: ' + Object.keys(skins).join(', ')));
                    return 0;
                }
                
                var result = Utils.server.runCommandSilent('setskin ' + skins[nombre] + ' @s');
                if (result) {
                    player.tell(Text.green('Skin cambiada a ' + nombre));
                    return 1;
                }
                player.tell(Text.red('Error al cambiar skin'));
                return 0;
            }));
        
        // Versión sin argumento (muestra ayuda)
        builder.executes(function(context) {
            context.source.player.tell(Text.yellow('Usa: /skin <nombre> (' + Object.keys(skins).join(', ') + ')'));
            return 0;
        });
    });
}

// Registro tradicional para KubeJS antiguo
onEvent('command.registry', registerSkinCommand);