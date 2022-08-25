/* 

    $ O app uStalker monitora páginas indexadas, notificando sempre que uma
    atualização é encontrada. Seu modo de atuação consiste em salvar imagem
    da página monitorada num diretório local, sempre que uma modificação no
    layout da mesma é encontrada um alerta é emitido.
      
*/

const seeker = require('./lib/cronBox'); 
const webapp = require('express');
const status = webapp();

// Seta alvo para monitoramento - Escolha: trends para acompanhamento da corrida presidencial de 2022.
const target = 'https://trends24.in/brazil/';

// Exibe status de execução ao usuário - Esta versão do Gooser será posta em um docker container!
status.get('/', (req, res) => {
    res.send('   Gooser está contido em um container - docker!')
});

status.listen(3000, () => { 

    // Retorna ao usuário host:porta onde é exibido status de execução.
    console.log(' Gooser está "dockerizado" - Setado em http://localhost:3000')
    
    // Executa individualmente a verificação de arquivos do diretório e cria arvore para o mesmo.
    seeker.checkPrintSc( target, 6480, 1080, true,
        (error) => { console.error(error)
    });
    // Executa de forma recursiva a verificação de atualizações na página alvo, as salvando e notificando.
    seeker.cronoTrigger( target, 6480, 1080, true,
        (error) => { console.error(error)
    });
});