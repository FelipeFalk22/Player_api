require('dotenv').config();
const express = require('express');
const config = require('./config.js');
const cors = require('cors');

// --- ADICIONE ESTAS DUAS LINHAS ---
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swaggerConfig'); // Importa a configuração
// ---------------------------------

const app = express();
//PRE-CONFIGURACAO
app.use(express.json());
app.use(
  cors({
    origin: '*',
  })
);

//BANCO DE DADOS
const conexao = require('./app/models');

// --- ADICIONE ESTA ROTA PARA A DOCUMENTAÇÃO ---
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// -------------------------------------------

//ROTAS
app.get('/', (request, response) => {
  response.json({
    message: 'Game API',
    version: '1.0',
  });
});
const jogadorRotas = require('./app/routes/jogador.routes.js');
const clienteRotas = require('./app/routes/cliente.routes.js');
app.use(jogadorRotas);
app.use(clienteRotas);

//RODANDO SERVER
app.listen(config.port, () => {
  console.log('servidor on-line');
  // --- ADICIONE ESTE LOG PARA FACILITAR ---
  console.log(`Documentação da API disponível em http://localhost:${config.port}/api-docs`);
  // ---------------------------------------
});