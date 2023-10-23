import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MateriaDto } from './dto/create-materia.dto';
import { UpdateMateriaDto } from './dto/update-materia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Materia } from './entities/materia.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MateriaService {

  constructor(@InjectRepository(Materia)
             private readonly materiaRepository:Repository<Materia>
  ){}

  async create(materiaDto: MateriaDto): Promise<MateriaDto> {
    try{
      const { nombre } = materiaDto;
      const materia : Materia = await this.materiaRepository.save(new Materia(nombre));
      if(!materia){
        throw new Error('No se pudo crear la materia');
      }else{
        return materia;
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Materia - ' + error
      },HttpStatus.NOT_FOUND);
    } 
  }

  findAll() {
    return `This action returns all materia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} materia`;
  }

  update(id: number, updateMateriaDto: UpdateMateriaDto) {
    return `This action updates a #${id} materia`;
  }

  remove(id: number) {
    return `This action removes a #${id} materia`;
  }
}
