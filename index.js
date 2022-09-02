// Biblioteca pessoal que sintetiza as funcionalidades do app
const seeker = require('./lib/pageRun');  

// Biblioteca npm de recursos do nodejs                                     
const webapp = require('express');
const reader = require ('fs');
const status = webapp();   

// Exibe status de execução ao usuário
status.use(
  webapp.json(),
  webapp.static('./usr/local/www'),                                             
  webapp.urlencoded({ extended: true })
);

// status operacional, exibe log atual em formato texto no navegador  
status.get('/status', (req, res) => { 

  // Varredura de arquivos e diretórios - "var/log".
  if(cont = reader.readdirSync('./var/log'))                                  
    reader.readFile('./var/log/'+cont[cont.length-1],'utf-8',
    (error, data) => {

    // Seletor de texto/type  
    res.set({
      'Content-Type':
      'text/plain'
    })
    if (!error) 

      // Emissão de relatório de saída - feedback sobre o funcionamento das principais funções do app.        
      res.send(data);
    else

      // Notificação em caso de ausência de arquivos de log
      res.status(500)
         .send(' Status não pode ser exibido,'
         +'arquivo log não encontrado:  \n\n'+error);
    });
  else

  // Notificação em caso de ausência de arvore de diretórios
  res.status(500)
     .send(' Status não pode ser exibido,'
     +'arvore de diretório inexistente:  \n\n'+error);
});
status.listen(3000, () => {

  // Retorna ao usuário host:porta onde é exibido status de execução.
  console.log(' Gooser está setado em http://localhost: 3000')

  // Verificação de atualizações na página alvo, as salvando e notificando.                                                   
  seeker.pageMonitor((error) => {                                               
    console.log(' Falha na execução de pageMonitor: '+error) 
    throw error;                   
  });                                       
});