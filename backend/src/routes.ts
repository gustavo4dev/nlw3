/**
 * recursos nesse arquivo
 * 
 * Router: recurso do express para cração de rotas
 *  - precisa ser usado na criação das rotas;
 */
import { Router} from 'express';

/**
 * multer: recurso responsável por realizar o uload de arquivos
 */
import multer from 'multer';

 /** 
 *  multer precisa de um arquivo de configuração para determinar os parâmetros para o upload
 *    - 'UploadConfig'
 */
import uploadConfig from './config/upload';

/** 
 * OrphanagesController: deve ser importado para acessar os métodos dentro do controller;
 * 
 */
import OrphanagesController from './controllers/OrphanagesController';


const routes = Router();

/** carregando o arquivo de configuração para os uploads */
const upload = multer(uploadConfig);

/** rotas da aplicação */
routes.get('/orphanages', OrphanagesController.index);
routes.get('/orphanages/:id', OrphanagesController.show);

/** 
 *  - na linha routes.post('/orphanages', upload.array('images'), OrphanagesController.create);
 *    - passado para o metodo post na rota '/orphanages' 
 *      um array de imagens do multer e o comando para criar o recurso;
 */
routes.post('/orphanages', upload.array('images'), OrphanagesController.create);


/** precisa exportar as rotas para serem usadas pelo arquivo principal */
export default routes;






