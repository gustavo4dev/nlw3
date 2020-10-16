/**
 * Definição da classe  que será associada com o recurso/tabela na base de dados
 */

/**
 * importação dos recursos que vão fazer a associação com as informações da base de dados
 * **funciona parecido com o hibernate do java com os @ antes das colunas
 */
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm';
import Image from './Image';

@Entity('orphanages')
export default class Orphanage {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name: string;
  @Column()
  latitude: number;
  @Column()
  longitude: number;
  @Column()
  about: string;
  @Column()
  instructions: string;
  @Column()
  opening_hours: string;
  @Column()
  open_on_weekends: boolean;

  @OneToMany(() => Image, image =>image.orphanage, {
    cascade: ['insert', 'update']
  })
  @JoinColumn({name:"orphanage_id"})
  images: Image[];
}
