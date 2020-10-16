/*
* express serve para abstrair as rotas
* e outras funções para agilizar o desenvolvimento
*/
import express from 'express';

/**
 * usado para tratamento de erros da aplicação
 */
import 'express-async-errors';

/**
 * path: server para ter um maior controle dos caminhos das pastas do projeto
 */
import path from 'path';

/**
 * cors: deve ser habilitado para permitir que a api receba conexões de diferentes endereços
 */
import cors from 'cors';

/** importando arquivo de configuração da conexão com a base de dados */
import './database/connection';


/**
 * arquivo responsável pelo tratamento de erros da aplicação
 */
import errorHandler from './errors/handler';


/** arquivo de rotas */
import routes from './routes';

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

/** definindo a pasta padrão do servidor para a rota /uploads onde estão armazenadas as imagens */
app.use('/uploads', express.static(path.join(__dirname,'..','uploads')));

app.use(errorHandler);

app.listen(3333);