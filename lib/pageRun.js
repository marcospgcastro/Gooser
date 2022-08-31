exports.pageMonitor = async function ( ) {
  const seeker = require('./cronBox');                                        // Biblioteca pessoal que sintetiza as funcionalidades do app

    seeker.cronoTrigger(                                                        // Executa de forma recursiva a verificação de atualizações na página alvo, as salvando e notificando.
      "https://trends24.in/brazil", 
      6480,
      1080,
      true, // timer + sensibility
    );

  };
// =============================================================================  