# uMarket
> Uma API teste, expondo dados das feiras livres de São Paulo no ano de 2014


### Como rodar
Este projeto está sendo implementado em nodeJS, com uma base de dados PostgreSQL. Se não os tem instalados, precisa instalá-los antes de tudo.

Caso esteja em um ambiente Linux, basta abrir um terminal e seguir esses passos:
```sh
sudo apt update
```
```sh
sudo apt install nodejs
```
```sh
sudo apt install npm
```
```sh
sudo apt install postgresql postgresql-contrib
```
Com o PostgreSQL instalado, criaremos a database local que utilizaremos:

```sh
sudo -u postgres psql -c "SELECT version();"
```
```sh
sudo su - postgres
```
```sh
psql
```
```sh
CREATE DATABASE umarket;
```

Sendo `umarket`, o nome da nossa database. 
Caso não esteja utilizando as configurações default do postgres, precisará editar a variável 
`pollInfo`, em `createTable/createTable.js`, e a variável `connection` em `db.js`, com as informações do seu postgres.

Após essas configurações, mova-se até o diretório `createTable`, e execute o arquivo `createTable.js` para subir os arquivos da planilha de feiras para a base de dados. 
```sh
node ./createTable.js
```
A chamada da função `buildDatabase`, na linha `116` do `createTable.js`, pode receber os argumentos:
`filePath`- o caminho para a planilha;
`dbName`- o nome da database criada;
`tableName`- o nome da tabela a ser gerada.
Se achar mais cômodo, não passe nenhum parâmetro para manter a configuração default.

Após isso, a aplicação já estará pronta para ser testada. Podendo ser executada no diretório raiz do projeto com 
```sh
node ./server.js
```

Nas configurações originais, a aplicação estará rodando em `localhost:3000/api/v1`.



Até o momento, estão disponíveis 4 endpoints para interações na base de dados. 

##### GET `/umarkets/:label?${filters}`
Retorna todos os elementos no banco de dados que tenham um dos atributos passados nos filtros igual à label.
Se nenhum filtro for passado, ele considera uma pesquisa com todos os filtros.
Os filtros disponíveis são os citados no documento de requisitos: `distrito`, `regiao5`, `nome_feira` e `bairro`.

- http://localhost:3000/api/v1/umarkets?label=VILA%20FORMOSA 
retorna as duas feiras de Vila Formosa
- http://localhost:3000/api/v1/umarkets?label=Leste&regiao5=true
retorna todas as feiras da Zona Leste


##### POST `/umarket`
Adiciona uma nova feira, com a info passada no body da request.

- http://localhost:3000/api/v1/umarket/
Com o body
```sh
{
    "long": 62185661,
    "lat": 52479807,
    "setcens": "355030885000091",
    "areap": "3550308005040",
    "coddist": 12,
    "distrito": "TRITO",
    "codsubpref": 7,
    "subprefe": "Aeroclube",
    "regiao5": "Leste",
    "regiao8": "Leste 1",
    "nome_feira": "FEIRA DARPULGA",
    "registro": "S2_*-*",
    "logradouro": "Rua dos Bobos",
    "numero": "0",
    "bairro": "ZEPA",
    "referencia": "Parque PB2"
}
```
Adicionará uma feira com esses dados.



##### PUT `/umarket/:registro`
Atualiza a feira com o registro passado no param, com as infos passadas no body.

- http://localhost:3000/api/v1/umarket/7052-1
Com o body
```sh
{
    "long": 127783809,
    "lat": 26357896,
    "setcens": "622202220602226",
    "areap": "3550308005040",
    "coddist": 113,
    "distrito": "TRITO",
    "codsubpref": 8,
    "subprefe": "Ocaida",
    "regiao5": "Oeste",
    "regiao8": "Oeste 1",
    "nome_feira": "FEIRA DA PRATA",
    "logradouro": "Rua do fogo",
    "numero": "S/N",
    "bairro": "Pomo",
    "referencia": "Baixa da egua"
}
```
Atalizará a feira de registro `7052-1`.

##### DELETE `/umarket/:registro`
Apaga a feira com o registro passado no param.
- http://localhost:3000/api/v1/umarket/del/7052-1
Apagará a feira de registro `7052-1`.
