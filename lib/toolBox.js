exports.existPath = function  (savePath, targetSite) {
  const fileSyst = require('fs');                                               // Evoca biblioteca fs, responsável por verificar o "Path"
  const linkName = require('url')                                               // Biblioteca para manipulação de URL
  const { exit } = require('process');
  const lastName = require('path')
  const siteName = linkName.parse(targetSite, true).host                        // Seleciona nome do Host por link fornecido
  const pathName = '/'+lastName.basename(targetSite,
                       lastName.extname(targetSite))

  if (!fileSyst.existsSync(savePath)) {                                         // Verifica caminho de "imagem" de forma Síncrona                                       
    fileSyst.mkdirSync(savePath, function(err){                                 // Cria diretório em caso de ausência
      if (err) {
        console.error(' Falha na criação de: '+savePath)
        console.error(err)                                                      // Emissão de erro
        exit(1)
      }
    })
  }

  if (!fileSyst.existsSync(savePath+siteName)) {                                // Verifica caminho de "imagem" de forma Síncrona                                       
    fileSyst.mkdirSync(savePath+siteName, function(err){                        // Cria diretório em caso de ausência
      if (err) {
        console.error(' Falha na criação de: '+savePath+siteName)
        console.error(err)                                                      // Emissão de erro
        exit(1)
      }
    })
  }

  if (!fileSyst.existsSync(savePath+siteName+pathName)) {                       // Verifica caminho de "imagem" de forma Síncrona                                       
    fileSyst.mkdirSync(savePath+siteName+pathName, function(err){               // Cria diretório em caso de ausência
      if (err) {
        console.error(' Falha na criação de: '+savePath+siteName+pathName)
        console.error(err)                                                      // Emissão de erro
        exit(1)
      }
    })
    console.log(' Criado arvore de diretórios: '+savePath+siteName+pathName)
    return false;
  }

  console.log(' Localizada arvore de diretórios: '+savePath+siteName+pathName)
  var cont = fileSyst.readdirSync(savePath+siteName+pathName, function(err){
    if (err) {
        console.error(' Falha na leitura de: '+savePath+siteName+pathName)
        console.error(err)
        exit(1)                                                                 // Emissão de erro
    }
  })
  if( cont.length != 0 ) {
    if(cont.length == 1){
      console.log(' Encontrado somente um arquivo no diretório.')
    } else {
      console.log(' Encontrados '+cont.length+' arquivos no diretório.')
    }
    return true;
  } else {
    console.log(' Não foram encontrados arquivos no diretório.')
    return false;
  }

};

// =============================================================================
exports.onlineHost = function ( hostName ) { 
  const linkTest = require('dns')                                               // Resolve DNS para consultas
  const linkName = require('url')                                               // Manipulador de url
  linkTest.resolve(linkName.parse(hostName, true).host, function(err) {         // Verifica estado do "Host" de forma Síncrona
    if (err) {
      console.error(err)
      return false;
    }  
  })
  return true;
};
 
// =============================================================================
exports.printFile = async function ( pathSave, x, y, targetSite, logical ) { 

  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))       // Condição para uso de Timer
  const puppeteer= require('puppeteer')                                         // Evoca biblioteca Puppeteer
  const editDate = require('node-datetime')                                     // Evoca biblioteca datetime  
  const linkName = require('url')                                               // Biblioteca para manipulação de URL
  const lastName = require('path')

  const browser = await puppeteer.launch({                                      // Função que simula abertura de navegador
        args: ["--no-sandbox", "--disabled-setupid-sandbox"],
  });
  
  const webpage = await browser.newPage()                                       // Função que simula abertura de nova aba

  var formDate = editDate.create().format(' Y-m-d H:M:S')                       // Formatação de data
  var siteName = linkName.parse(targetSite, true).host                          // Seleciona nome do Host por link fornecido
  var pathName = '/'+lastName.basename(targetSite, lastName.extname(targetSite))
  var nameSave = 'uGetcha '+siteName+formDate+'.png'                            // Define nome do arquivo JPEG gerado
      pathSave = pathSave+siteName+pathName                                     // Atualiza o caminho do arquivo JPEG grado 

  try {
    await webpage.setViewport({width: x, height: y})                            // Dimensionamento de janela para print
    await webpage.goto(targetSite,{waitUntil: 'load',timeout: 0});              // Inserir escolha de link do alvo para print                                   
    await delay(5000)                                                           // Timer para carregamento do conteúdo - janelas de "popup"
    await webpage.screenshot({path: pathSave+'/'+nameSave, fullPage: logical})  // Inserir escolha de local para salvar os arquivos                                 
    await browser.close()                                                       // Encerra puppeteer
    return pathSave+'/'+nameSave                                                // Retorno de função
  } catch (err) {                                                               // Emissão de erro
    console.error(err)                                                          
  }  
};
