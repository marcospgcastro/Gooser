const seeker = require('./lib/cronBox'); 
const webapp = require('express');
const status = webapp();
// Seta alvo para monitoramento - Escolha: trends para acompanhamento da corrida presidencial de 2022.
const target = 'https://trends24.in/brazil';
const port = 3000;
const host = '0.0.0.0';
// Exibe status de execução ao usuário - Esta versão do Gooser será posta em um docker container!
status.get('/', (req, res) => {
    res.send('   Gooser está em operacional!')
});
status.listen(port, host, () => { 
    // Retorna ao usuário host:porta onde é exibido status de execução.
    console.log(' Gooser está "dockerizado" - Setado em http://'+host+':'+port)
    // Executa de forma recursiva a verificação de atualizações na página alvo, as salvando e notificando.
    seeker.cronoTrigger( target, 6480, 1080, true, (error) => {
      throw error;
    });
 });