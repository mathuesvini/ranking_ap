require('dotenv').config(); 
//importando a bibiloteca dotenv auxilia n lietura de aequivo
//para controle de variaveis de ambiente
const express = require('express');
//instancia o framework espress, que auxilia no deloy do seuvidor http
const cors = require('cors');
//instancia configura permissoes navegadores para codigos javascript
const apiRoutes = require('./src/routes');
//modulo (arquivo jv) que contem as rotas (enderecos) para requisicoes

const mongodb = require('./src/database/mongodb');
//modulo (arquivo jv) que contem a conexao com banco de dados mogo nosql
 
mongodb();
//inicia conexao com p banco de dados mongo
 
const server = express();
///instancia o servidor express
 
server.use(cors(
    {
        origin: '*',
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'UPDATE', 'PATCH'],
        allowedHeaders: ['Content-Type']
    }
));
//servidor esta injetando o uso do cors permitindo acesso de qualquer origem a especificando
//os metodos de requisicoes permtidos
server.use(express.json());
server.use(express.urlencoded({extended: true}));
//fazer uso do json do formato das requisicoes
 
server.use('/', apiRoutes);
//definindo o uso das rotas no servidor espress
 
server.listen(process.env.PORT, () => {
    console.log(`- Rodando no porta: ${process.env.PORT}.`);
});//criando uma portta que vai ficar ouvindo as requisicoes http e iniciando o servidor