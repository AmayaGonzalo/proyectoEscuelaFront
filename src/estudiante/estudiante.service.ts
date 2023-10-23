/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { EstudianteEntity } from './estudiante.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstudianteDto } from './estudiante.interface';

@Injectable()
export class EstudianteService {

    constructor(
        @InjectRepository(EstudianteEntity)
        private estudianteRepository : Repository<EstudianteEntity>,
    ){}

    async AddEstudiante(estudiante: EstudianteDto): Promise<any>{
        let item = new EstudianteEntity();
        item.nombre = estudiante.nombre;
        item.apellido = estudiante.apellido;
        item.dni = estudiante.dni;
        item.direccion = estudiante.direccion;
        const newEstudiante = await this.estudianteRepository.save(item);
        return newEstudiante;
    }

    async editarEstudiante(id: number, estudiante: EstudianteEntity): Promise<EstudianteEntity>{
        let toUpdate = await this.estudianteRepository.findOneBy({id});
        let update = Object.assign(toUpdate, estudiante);
        const estudianteActualizado = await this.estudianteRepository.save(toUpdate);
        return estudianteActualizado;
        
    }


    async getEstudianteById(id: number): Promise<EstudianteEntity> {
        return this.estudianteRepository
          .createQueryBuilder('estudiante')
          .where('estudiante.id = :id', { id }) // Filtrar por el id proporcionado
          .leftJoinAndSelect('estudiante.materias', 'materias')
          .leftJoinAndSelect('materias.curso', 'curso')
          // Puedes seguir agregando más leftJoinAndSelect para otras relaciones
          .getOne(); // Utiliza getOne() en lugar de getMany() para obtener solo un estudiante
      }

    
    //get alumnos con todas sus relaciones
    async findAllWithRelations(): Promise<EstudianteEntity[]> {  
        return this.estudianteRepository
        .createQueryBuilder('estudiante')
        .leftJoinAndSelect('estudiante.materias', 'materias')
        .leftJoinAndSelect('materias.curso', 'curso')
        // Puedes seguir agregando más leftJoinAndSelect para otras relaciones
        .getMany();
    }

    async eliminarEstudiante(id: number): Promise<void>{
        await this.estudianteRepository.delete(id);
    }
}
