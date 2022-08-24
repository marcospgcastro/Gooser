const date = require ('node-datetime');
const cron = require ('node-cron');
const tool = require ('./toolBox');
const exit = require ('process');
const last = require ('path');
const fork = require ('jimp');
const link = require ('url');
const file = require ('fs');

const save = '../Gooser/var/img/';                                              // IMPORTANTE: precisa reconhecer o local onde se encontra!
const timer = '0 */1 * * * *'                                                   // Intervalo de 1min entre as verificações

exports.checkPrintSc = function ( linkTree, xMetric, yMetric, logical ) {       // Função: cronoTrigger para 5 minutos.

  var num  = 0;
  var buff = ' ';                                                                 // Define valor "Buffer" para atribuir ao fluxo
  var site = link.parse(linkTree, true).host;                                     // Guarda o valor de site para complementar o texto da caixa de dialogo
  var side = '/'+last.basename(linkTree, last.extname(linkTree))
  var hora = date.create().format('H:Mh');                                        // Guarda o valor de hora para complementar o texto da caixa de dialogo
  var data = date.create().format('d/m/Y');                                       // Guarda o valor de data para complementar o texto da caixa de dialogo
  var cont = file.readdirSync(save+site+side);
  var text = ' Nova publicação localizada às '+hora+' de '+data+', alvo: '
             +site+' salvo em '+last.basename(linkTree, last.extname(linkTree));  // Guarda o valor de texto para inserir na caixa de dialogo
  
  tool.onlineHost ( linkTree )

  if(tool.existPath ( save, linkTree )) {
      fork.read(save+site+side+'/'+cont[cont.length-1])
          .then(flux => buff = flux)    
      tool.printFile ( save, xMetric, yMetric, linkTree, logical )
          .then(string => { fork.read(string).then(flux => {
           if( fork.diff ( buff, flux ).percent >= 0.01 ) {
               buff = flux              
               console.log(text)}                      
           else {
               file.unlinkSync(string)
           }
         })      
      })                                      
  }
  else {
    tool.printFile ( save, xMetric, yMetric, linkTree, logical )
        .then(string => { fork.read(string).then(flux => {
         buff = flux
         console.log(text)
       })
     })
  }
}; 

exports.cronoTrigger = async function ( linkTree, xMetric, yMetric, logical ) { // Função: cronoTrigger para 5 minutos.

  cron.schedule (timer, () => {  
    if(tool.onlineHost ( linkTree )) {
       hora = date.create().format('H:Mh'); 
       data = date.create().format('d/m/Y');
       text = ' Nova publicação localizada às '+hora+' de '+data+', alvo: '
             +site+' salvo em '+last.basename(linkTree, last.extname(linkTree)); 

       tool.printFile ( save, xMetric, yMetric, linkTree, logical )
           .then(string => { fork.read(string).then(flux => {
               if( fork.diff ( buff, flux ).percent >= 0.01 ) {
                   buff = flux;               
                   console.log(text);   
               } else {
                 try {
                   file.unlinkSync(string)
                 } catch (err) {
                   console.error(err)  
                 }
               }
           })            
       }) 
       num = 0;    
    }  
  }, { scheduled: true,
        timezone: "America/Sao_Paulo" })     
}; 
// -----------------------------------------------------------------------------