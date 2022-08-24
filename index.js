/* 

    $ O app uStalker monitora páginas indexadas, notificando sempre que uma
    atualização é encontrada. Seu modo de atuação consiste em salvar imagem
    da página monitorada num diretório local, sempre que uma modificação no
    layout da mesma é encontrada um alerta é emitido.
      
*/

const seek = require('./lib/cronBox'); 
const target = 'https://trends24.in/brazil/';
// const target = 'https://trends24.in/argentina'

    seek.checkPrintSc( target, 6480, 1080, true )
    seek.cronoTrigger( target, 6480, 1080, true )
