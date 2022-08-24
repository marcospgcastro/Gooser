#!bin/bash
while : 
  do
    num=$(date +%Y%m%d%H%M%S)                                                   # Define um número de série para o log
    touch ../Gooser/var/log/gooser-$num.log                                     # Cria arquivo de saída de dados no doretório /var/log
    node ../Gooser/index.js >> ../Gooser/var/log/gooser-$num.log                # Salva log de execução no arquivo criado
    sleep 30                                                                    # Executa de forma contínua, em caso de interrupção por ausência de conexão
  done
