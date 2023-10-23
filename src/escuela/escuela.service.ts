import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { Repository } from 'typeorm';
import { EscuelaDto } from './dto/create-escuela.dto';

@Injectable()
export class EscuelaService {

  constructor(@InjectRepository(Escuela)
              private readonly escuelaRepositoy:Repository<Escuela>
  ){}

  async findAll(): Promise<EscuelaDto[]> {
    try{
      const escuelas: EscuelaDto[] = await this.escuelaRepositoy.find();
      if(!escuelas){
        throw new Error('Lo siento, no se encontró la lista de escuelas')
      }else{
        return escuelas;
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Escuelas - ' + error
      },HttpStatus.NOT_FOUND);
    }      
  }      

  async create(escuelaDto: EscuelaDto): Promise<Escuela> {
    try{
      const escuela : Escuela = await this.escuelaRepositoy.save(new Escuela(escuelaDto.nombre,escuelaDto.direccion));
      if(!escuela){
        throw new Error('No se pudo crear la nueva escuela')
      }else{
        return escuela;
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Escuelas - ' + error
      },HttpStatus.NOT_FOUND);
    }    
  }


  // findOne(id: number) {
  //   return `This action returns a #${id} escuela`;
  // }

  // update(id: number, updateEscuelaDto: UpdateEscuelaDto) {
  //   return `This action updates a #${id} escuela`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} escuela`;
  // }
}
