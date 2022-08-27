#!bin/bash

## Criação de arquivo de configuração
locdir=$(pwd)                                                                   # Define local de instalação do app Gooser
config="uConfig Gooser.dat"                                                     # Arquivo de configuração do app Gooser
if [ ! -e "$locdir"/etc/config/"$config" ] ; then                               # Condicional para verificar a existência do arquivo
  touch "$locdir"/etc/config/"$config"                                          # Cria arquivo de configuração
  echo "$(pwd)" >> "$locdir"/etc/config/"$config"                               # Insere no arquivo de configuração o local de instalação de Gooser
fi

## Emissão de relatório de saída
while : 
do                                                              
  numeral=$(date '+%Y-%m-%d %H:%M:%S')                                          # Valor acessório para caracterização de numeral característico
  arquivo=$(echo "uRecall Gooser $numeral.log")                                 # Define um número de série para o log
  touch "$locdir"/var/log/"$arquivo"                                            # Cria arquivo de saída de dados no doretório /var/log
  node  "$locdir"/index.js >> "$locdir"/var/log/"$arquivo"                      # Salva log de execução no arquivo criado
  sleep 30                                                                      # Executa de forma contínua, em caso de interrupção por ausência de conexão
done