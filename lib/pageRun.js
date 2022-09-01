exports.pageMonitor = async function ( ) {
  const seeker = require('./cronBox');                                          // Biblioteca pessoal que sintetiza as funcionalidades do app
    

  seeker.cronoTrigger(                                                        // Executa de forma recursiva a verificação de atualizações na página alvo, as salvando e notificando.
      "https://trends24.in/brazil", 
      6480,
      1080,
      true // vai até o final da página - Para não, inserir "false".
    );
    seeker.cronoTrigger(
      "https://www.in.gov.br/acesso-a-informacao/"+
      "institucional/concursos-e-selecoes",
      1920,
      2160,
      true
    );
    seeker.cronoTrigger(
      "https://www.saquarema.rj.gov.br/concursos/",
      1920,
      1080,
      true
    );
  };
// =============================================================================  