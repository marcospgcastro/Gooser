const seeker = require('./lib/cronBox');                                        // Biblioteca pessoal que sintetiza as funcionalidades do app
const webapp = require('express');
const status = webapp();
const target = 'https://trends24.in/brazil';                                    // Seta alvo para monitoramento - Escolha: trends para acompanhamento da corrida presidencial de 2022.
const port = 3000;                                                              // Porta dedicada a execução de Gooser
status.get('/', (req, res) => {                                                 // Exibe status de execução ao usuário - Esta versão do Gooser será posta em um docker container!
    res.send('   Gooser está em operacional!')
});
status.listen(port, () => { 
    console.log(' Gooser está "dockerizado" - Setado em http://localhost:'+port) // Retorna ao usuário host:porta onde é exibido status de execução.                                   
    seeker.cronoTrigger( target, 6480, 1080, true, (error) => {                 // Executa de forma recursiva a verificação de atualizações na página alvo, as salvando e notificando.
      console.log(' >> Running, on our way, hiding!')
      throw error;  
    });
 });