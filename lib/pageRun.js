exports.pageMonitor = async function ( ) {
  const seeker = require('./cronBox');                                          // Biblioteca pessoal que sintetiza as funcionalidades do app
  const reader = require ('fs');
  const finder = filename => reader.readFileSync(filename)
                                   .toString('UTF8').split('\n');
  
  try{
    var cont = reader.readdirSync('./etc/target')                               // Executa de forma recursiva a verificação de atualizações na página alvo, as salvando e notificando.
    for(var i = 0; i < cont.length; i++){
      var vetor = finder('./etc/target/'+cont[i])
          seeker.cronoTrigger(
            vetor[0],
            parseInt(vetor[1]),
            parseInt(vetor[2]),
            converte(vetor[3])
          )   
    }
  } catch (error) {
    console.error( ' Gooser não possui alvos para buscar: '+error);
  }
  // Converte string em boolean
  function converte( valor ) {
    if(valor == true) {
      return true;
    } else {
      return false;
    }
  }
};
// =============================================================================