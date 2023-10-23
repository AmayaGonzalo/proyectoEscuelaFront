import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MateriaDto } from './dto/create-materia.dto';
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

  async findAll():Promise<MateriaDto[]> {
    try{
      const materias : MateriaDto[] = await this.materiaRepository.find();
      if(!materias){
        throw new Error('No se encontró la lista de materias');
      }else{
        return materias;
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Materia - ' + error
      },HttpStatus.NOT_FOUND);
    } 
  }

  async findOne(id: number):Promise<MateriaDto> {
    try{
      const materia: MateriaDto = await this.materiaRepository.findOne({ where:{ id:id }});
      if(!materia){
        throw new Error('No se encontró la materia buscada');
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

  async update(id:number, materiaDto: MateriaDto): Promise<MateriaDto> {
    try{
      const { nombre } = materiaDto;
      let materia: Materia = await this.materiaRepository.findOne({where:{ id:id }});
      if(!materia){
        throw new Error('No se encontró la materia ha modificar');
      }else{
        if(nombre != null || nombre != undefined){
          materia.setNombre(nombre);
          materia = await this.materiaRepository.save(materia);
          return materia;
        }else{
          throw new Error('No se pudo cambiar el nombre de la materia');
        }
      } 
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Materia - ' + error
      },HttpStatus.NOT_FOUND);
    } 
  }

  async remove(id: number):Promise<{ message:string }> {
    try{
      const materia: Materia = await this.materiaRepository.findOne({ where:{ id:id }});
      if(!materia){
        throw new Error('No se encontró la escuela ha eliminar');
      }else{
        await this.materiaRepository.remove(materia);
        return {
          message: "Se ha eliminado la materia: "+ `${materia.nombre}`
        }
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Materia - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }
}
