import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { EstudianteDto } from './dto/create-estudiante.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Estudiante } from './entities/estudiante.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EstudianteService {

constructor(@InjectRepository(Estudiante)
            private readonly estudianteRepository:Repository<Estudiante>
  ){}

  async create(estudianteDto: EstudianteDto):Promise<EstudianteDto> {
    try{
      const { nombre, apellido, dni, direccion } = estudianteDto;
      const newEstudiante : Estudiante = await this.estudianteRepository.save(new Estudiante(nombre,apellido,dni,direccion));
      if(!newEstudiante){
        throw new Error('No se pudo crear el nuevo estudiante');
      }else{
        return newEstudiante;
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Estudiantes - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findAll():Promise<EstudianteDto[]> {
    try{
      const estudiantes: EstudianteDto[] = await this.estudianteRepository.find();
      if(!estudiantes){
        throw new Error('No se encontró la lista de estudiantes');
      }else{
        return estudiantes;
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Estudiantes - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  async findOne(id: number):Promise<EstudianteDto> {
    try{
      const estudiante : EstudianteDto = await this.estudianteRepository.findOne({ where:{ id:id }});
      if(!estudiante){
        throw new Error('No se encontro el estudiante')
      }else{
        return estudiante;
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Estudiantes - ' + error
      },HttpStatus.NOT_FOUND);
    }
  }

  // update(id: number, estudianteDto: EstudianteDto) {
  //   return `This action updates a #${id} estudiante`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} estudiante`;
  // }
}
