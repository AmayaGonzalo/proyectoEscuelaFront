import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CursoDto } from './dto/create-curso.dto';
import { UpdateCursoDto } from './dto/update-curso.dto';
import { Curso } from './entities/curso.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CursoService {

  constructor(@InjectRepository(Curso)
              private readonly cursoRepository:Repository<Curso>){}

  async create(cursoDto: CursoDto):Promise<CursoDto> {
    try{
      const { grado, division } = cursoDto;
      const newCurso : Curso = await this.cursoRepository.save(new Curso(grado,division));
      if(!newCurso){
        throw new Error('No se pudo crear el nuevo curso')
      }else{
        return newCurso;
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Curso - ' + error
      },HttpStatus.NOT_FOUND);
    }     
  }

  async findAll():Promise<CursoDto[]> {
    try{
      const cursos : CursoDto[] = await this.cursoRepository.find();
      if(!cursos){
        throw new Error('No se encontró la lista de cursos')
      }else{
        return cursos;
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Curso - ' + error
      },HttpStatus.NOT_FOUND);
    }   
  }

  async findOne(id: number):Promise<CursoDto> {
    try{
      const curso: CursoDto = await this.cursoRepository.findOne({ where:{ id: id }});
      if(!curso){
        throw new Error('No se encontró el curso');
      }else{
        return curso;
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Curso - ' + error
      },HttpStatus.NOT_FOUND);
    }   
  }

  async update(id: number, cursoDto: CursoDto):Promise<CursoDto> {
    try{
      const { grado, division } = cursoDto;
      let curso: Curso = await this.cursoRepository.findOne({ where:{ id: id }});
      if(grado != null || grado != undefined){
        curso.setGrado(grado);
        curso = await this.cursoRepository.save(curso);
        if(division != null || division != undefined){
          curso.setDivision(division);
          curso = await this.cursoRepository.save(curso);
          return curso;
        }else{
          throw new Error('No se encontró la división')
        }
      }else{
        throw new Error('No se encontró el grado');
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Curso - ' + error
      },HttpStatus.NOT_FOUND);
    } 
  }

  async remove(id: number):Promise<{ message:string }> {
    try{
      const curso: Curso = await this.cursoRepository.findOne({ where:{ id:id }});
      if(!curso){
        throw new Error('No se encontró el curso a eliminar');
      }else{
        await this.cursoRepository.remove(curso);
        return {
          message: 'Se ha eliminado el Curso: '+`${curso.grado}`+' '+`${curso.division}`
        }
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Curso - ' + error
      },HttpStatus.NOT_FOUND);
    } 
  }
}
