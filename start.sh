#!bin/bash
while : 
  do
    numeral=$(date '+%Y-%m-%d %H:%M:%S')
    arquivo=$(echo "uRecall Gooser $numeral.log")                               # Define um número de série para o log
    touch ../Gooser/var/log/"$arquivo"                                          # Cria arquivo de saída de dados no doretório /var/log
    node ../Gooser/index.js >> ../Gooser/var/log/"$arquivo"                     # Salva log de execução no arquivo criado
    sleep 30                                                                    # Executa de forma contínua, em caso de interrupção por ausência de conexão
  done
