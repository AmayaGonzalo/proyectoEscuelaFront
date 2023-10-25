import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { EstudianteService } from './estudiante.service';
import { EstudianteDto } from './dto/create-estudiante.dto';

@Controller('estudiante')
export class EstudianteController {
  constructor(private readonly estudianteService: EstudianteService) {}

  @Post('nuevo')
  async create(@Body() estudianteDto: EstudianteDto):Promise<EstudianteDto> {
    return await this.estudianteService.create(estudianteDto);
  }

  @Get()
  async findAll():Promise<EstudianteDto[]> {
    return await this.estudianteService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id:number):Promise<EstudianteDto> {
    return await this.estudianteService.findOne(id);
  }

  // @Put('modificar/:id')
  // async update(@Param('id') id:number, @Body() estudianteDto: EstudianteDto):Promise<EstudianteDto> {
  //   return await this.estudianteService.update(id, estudianteDto);
  // }

  // @Delete('eliminar/:id')
  // async remove(@Param('id') id:number): Promise<{ message:string }> {
  //   return await this.estudianteService.remove(id);
  // }
}
