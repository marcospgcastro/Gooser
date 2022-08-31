const seeker = require('./lib/pageRun');                                        // Biblioteca pessoal que sintetiza as funcionalidades do app
const webapp = require('express');
const status = webapp();                                                        // Porta dedicada a execução de Gooser
status.get('/', (req, res) => {                                                 // Exibe status de execução ao usuário - Esta versão do Gooser será posta em um docker container!
    res.send('   Gooser está em operacional!')
});
status.listen(3000, () => { 
    console.log(' Gooser está setado em http://localhost: 3000')                // Retorna ao usuário host:porta onde é exibido status de execução.                                   
    seeker.pageMonitor((error) => {throw error});                               // Executa de forma recursiva a verificação de atualizações na página alvo, as salvando e notificando.
 });