onEvent('command.registry', event => {
    event.register('skin', 'Cambia tu skin a una predeterminada', builder => {
        const skins = {
            'Charbel': 'https://i.imgur.com/4hRSnYO.png',
            'Jorge': 'https://i.imgur.com/4hRSnYO.png',
            'Gustavo': 'https://i.imgur.com/4hRSnYO.png'
        }
        
        builder.then(argument('Nombre', StringArgumentType.string())
            .suggests((context, suggestionsBuilder) => {
                Object.keys(skins).forEach(skinName => {
                    suggestionsBuilder.suggest(skinName)
                })
                return suggestionsBuilder.buildFuture()
            })
            .executes(context => {
                const skinType = StringArgumentType.getString(context, 'Nombre').toLowerCase()
                const player = context.source.player
                const playerName = player.name.string
                
                if (!skins[skinType]) {
                    player.tell(Text.red('Skin no válida. Opciones disponibles: ' + Object.keys(skins).join(', ')))
                    return 0
                }
                
                const skinUrl = skins[skinType]
                
                Utils.server.runCommandSilent(`setskin ${skinUrl} ${playerName}`)
                
                player.tell(Text.green(`Skin cambiada a la versión alamcenada "${skinType}"`))
                return 1
            })
        )
        builder.executes(context => {
            context.source.player.tell(Text.yellow('Uso: /skin <nombre> (Opciones: ' + Object.keys(skins).join(', ') + ')'))
            return 0
        })
    })
})