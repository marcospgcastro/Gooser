const seeker = require('./lib/pageRun');                                        // Biblioteca pessoal que sintetiza as funcionalidades do app
const webapp = require('express');
const reader = require ('fs');
const status = webapp();                                                        // Porta dedicada a execução de Gooser

status.use(webapp.static('./usr/local/www'));                                   // Exibe status de execução ao usuário - Esta versão do Gooser será posta em um docker container!
status.use(webapp.json());
status.use(webapp.urlencoded({ extended: true }));

status.get('/status', (req, res) => {                                           // status operacional, exibe log atual em formato texto no navegador
  if(cont = reader.readdirSync('./var/log')) {                                  // vetor responsável por ler arquivos no diretório de armazenamento de Prints
    reader.readFile('./var/log/'+cont[cont.length-1], (error, data) => {
      if (!error) {
        res.set({ 'Content-Type': 'text/plain' })
        res.send(data);
      } else {
        res.status(500).send(' Status não pode ser exibido,'+
          'arquivo log não encontrado!');
      }
    });
  } else {
    res.status(500).send(' Status não pode ser exibido,'+
      'arvore de diretório inexistente!');
  } 
});

status.listen(3000, () => {
  console.log(' Gooser está setado em http://localhost: 3000')                  // Retorna ao usuário host:porta onde é exibido status de execução.                                   
  seeker.pageMonitor((error) => {                                               // Executa de forma recursiva a verificação de atualizações na página alvo, as salvando e notificando.
    console.log(' Falha na execução de pageMonitor: '+error) 
    throw error;                   
  });                                       
});