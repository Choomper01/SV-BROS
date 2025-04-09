const skins = {
    'Charbel': 'https://i.imgur.com/4hRSnYO.png',
    'Jorge': 'https://i.imgur.com/4hRSnYO.png',
    'Gustavo': 'https://i.imgur.com/4hRSnYO.png'
}

export function registerCommands(event) {
    event.register('skin', 'Cambia tu skin a una predeterminada', builder => {
        // Argumento con sugerencias de skins disponibles
        builder.then(argument('nombre', StringArgumentType.string())
            .suggests((context, suggestionsBuilder) => {
                // Sugerir los nombres de skins disponibles
                Object.keys(skins).forEach(skinName => {
                    suggestionsBuilder.suggest(skinName)
                })
                return suggestionsBuilder.buildFuture()
            })
            .executes(context => {
                const skinType = StringArgumentType.getString(context, 'nombre').toLowerCase()
                const player = context.source.player
                const playerName = player.name.string
                
                // Verificar si el tipo de skin existe
                if (!skins[skinType]) {
                    player.tell(Text.red('Skin no válida. Opciones disponibles: ' + Object.keys(skins).join(', ')))
                    return 0
                }
                
                // Obtener la URL correspondiente
                const skinUrl = skins[skinType]
                
                // Ejecutar el comando setskin
                Utils.server.runCommandSilent(`setskin ${skinUrl} ${playerName}`)
                
                // Mensaje de confirmación
                player.tell(Text.green(`Skin cambiada a la versión almacenada "${skinType}"`))
                return 1
            })
        )
        
        // Mensaje de ayuda si no se proporciona argumento
        builder.executes(context => {
            context.source.player.tell(Text.yellow('Uso: /skin <nombre> (Opciones: ' + Object.keys(skins).join(', ') + ')'))
            return 0
        })
    })
}