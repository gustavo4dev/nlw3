/**
 * Recursos nesse arquivo
 * 
 *  Request e Response do express:
 *    - nesse caso serve para fornecer a tipagem dos parâmetros nas funções exportadas 
 */
import {Request, Response} from 'express';

/**
 * getRepository
 *  - serve para abstrair os procedimentos feitos no banco de dados
 *    é capaz de realizar os procedimentos sem precisar escrever queryes de banco
 */
import { getRepository } from 'typeorm';

/**
 * Yup
 *  - serve para realizar a validação dos dados, 
 *    como por exemplo na criação de um novo registro que está descrito abaixo
 */
import * as Yup from 'yup';

/*** importando o model para possibilitar a gravação dos dados na base */
import Orphanage from '../models/Orphanage';

/**
 * a view serve para restringir quais dados serão enviados na resposta da requisição
 */
import orphanageView from '../views/orphanages_view';


export default {
  /** definição dos metodos da controller */
  async index (request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ['images']
    });

    return response.json(orphanageView.renderMany(orphanages));
  },

  async show (request: Request, response: Response) {
    const {id} = request.params;

    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ['images']
    });

    return response.json(orphanageView.render(orphanage));
  },

  async create(request: Request, response: Response) {

    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    const orphanagesRepository = getRepository(Orphanage);

    /** utilização do multer para salvar o nome das imagens na base de dados */
    const requestImages = request.files as Express.Multer.File[];

    const images = requestImages.map( image => {
      return {path: image.filename}
    });

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images
    };

    /** abaixo o exemplo de uso do yup para validar os dados que foram recebidos */
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required()
        })
      )
    });

    await schema.validate(data, {
      /** abort early como false indica que o yup deve validar todos os campos
       *  e não parar a validação no primeiro erro encontrado */
      abortEarly: false,
    })

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  }
};



