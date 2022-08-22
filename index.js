/* 

    $ O app uStalker monitora páginas indexadas, notificando sempre que uma
    atualização é encontrada. Seu modo de atuação consiste em salvar imagem
    da página monitorada num diretório local, sempre que uma modificação no
    layout da mesma é encontrada um alerta é emitido.
      
*/
//const seek = require ('./lib/cronBox')    
//const find = require('express')

const target = 'https://www.instagram.com/prefriobonito/';
seek.cronoTrigger( target, 1920, 3240, false )                                  // cronoTrigger ( "endereço", "largura", "altura", "logica: página toda" )

//const app = find()
//app.get('/', async (req, res) => {
//    res.send('Gooser em execução! Monitorando: '+target)
//})

//app.listen(3000);