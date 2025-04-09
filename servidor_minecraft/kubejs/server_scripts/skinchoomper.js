onEvent('command.registry', event => {
    event.register('skinc', 'Establece tu skin a la predeterminada de Charbel', builder => {
        builder.executes(context => {
            const player = context.source.player
            const playerName = player.name.string
            
            // Ejecutar el comando setskin como la consola
            Utils.server.runCommandSilent(`setskin https://i.imgur.com/4hRSnYO.png ${playerName}`)
            
            // Mensaje de confirmación al jugador
            player.tell(Text.green('¡Skin cambiada correctamente a la de Charbel!'))
            return 1
        })
    })
})