/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteEntity } from './estudiante.entity';
import { EstudianteDto } from './estudiante.interface';

@Controller('estudiantes')
export class EstudianteController {
    constructor(private readonly estudiantesService : EstudianteService){}

    // @Get()
    // async getEstudiantes(): Promise<EstudianteEntity[]>{
    //     return await this.estudiantesService.getAllEstudiantes();
    // }
    @Get()
  async findAll(): Promise<EstudianteEntity[]> {
    return this.estudiantesService.findAllWithRelations();
  }

    @Post()
    async addEstudiante(@Body() estudiante: EstudianteDto): Promise<EstudianteEntity>{
        return await this.estudiantesService.AddEstudiante(estudiante);
    }

    @Put(':id')
    async editarEstudiante(@Param() params, @Body() estudiante: EstudianteEntity){
        return await this.estudiantesService.editarEstudiante(params.id, estudiante);
    }

    @Delete(':id')
    async deleteEstudiante(@Param() params){
        return await this.estudiantesService.eliminarEstudiante(params.id);
    }

    
  // @Get('/mate')
  // async findAllWithMaterias(): Promise<EstudianteEntity[]> {
  //   return this.estudiantesService.findAllWithMaterias();
  // }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<EstudianteEntity> {
    return this.estudiantesService.getEstudianteById(id);
  }

    

    
}
