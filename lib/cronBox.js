exports.cronoTrigger = async function ( linkTree, xMetric, yMetric, logical ) { // Função: cronoTrigger para 5 minutos.

  const date = require ('node-datetime');
  const cron = require ('node-cron');                                                 
  const tool = require ('./toolBox');
  const last = require ('path');
  const fork = require ('jimp');
  const link = require ('url');
  const file = require ('fs');

  const { exit } = require('process');

  var buff = ' ';                                                               // Define valor "Buffer" para atribuir ao fluxo
  var save = '../Gooser/var/img/';                                              // IMPORTANTE: precisa reconhecer o local onde se encontra!
  var site = link.parse(linkTree, true).host;                                   // Guarda o valor de site para complementar o texto da caixa de dialogo
  var side = '/'+last.basename(linkTree, last.extname(linkTree))
  var hora = date.create().format('H:Mh');                                      // Guarda o valor de hora para complementar o texto da caixa de dialogo
  var data = date.create().format('d/m/Y');                                     // Guarda o valor de data para complementar o texto da caixa de dialogo
  var text = ' Nova publicação localizada às '+hora+' de '+data+', alvo: '
             +site+' salvo em '+save+site+side;                                 // Guarda o valor de texto para inserir na caixa de dialogo
  
  tool.onlineHost ( linkTree )

  if(tool.existPath ( save, linkTree ) == false) { 
    tool.printFile ( save, xMetric, yMetric, linkTree, logical )
        .then(string => { fork.read(string).then(flux => {
          buff = flux
          console.log(text)
      })
    })
  } else {
    var cont = file.readdirSync(save+site+side, function(err) {                 // vetor responsável por ler arquivos no diretório de armazenamento de Prints
        console.log('Não foi possível ler o diretório: '+save+site+side);
        console.log(err);
        exit(1);
      });

    fork.read(save+site+side+'/'+cont[cont.length-1])
        .then(flux => { buff = flux } );  

    tool.printFile ( save, xMetric, yMetric, linkTree, logical )
        .then(string => { fork.read(string).then(flux => {
         if( fork.diff ( buff, flux ).percent >= 0.01 ) {
             buff = flux              
             console.log(text)}                      
         else {
             file.unlinkSync(string)
             console.log('  => Verificado as '+hora+' de '+data)
         }
       })      
    })                              
  }
 
  const timer = '0 */5 * * * *';                                                // Intervalo de 5min entre as verificações
  cron.schedule (timer, () => {

    tool.onlineHost ( linkTree )

    hora = date.create().format('H:Mh'); 
    data = date.create().format('d/m/Y');
        
    try{      
      tool.printFile ( save, xMetric, yMetric, linkTree, logical )
          .then(string => { fork.read(string).then(flux => {
           if( fork.diff ( buff, flux ).percent >= 0.01 ) {
               buff = flux              
               console.log(text)}                      
           else {
               file.unlinkSync(string)
               console.log('  => Verificado as '+hora+' de '+data) 
           }
         })      
      })
    } catch (error) {
      console.error(' Falha crítica!'+erro)
      exit(1)
    }       
  }, { scheduled: true,
        timezone: "America/Sao_Paulo" })     
}; 
// -----------------------------------------------------------------------------