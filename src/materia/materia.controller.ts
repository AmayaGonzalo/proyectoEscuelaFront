import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MateriaService } from './materia.service';
import { MateriaDto } from './dto/create-materia.dto';

@Controller('materia')
export class MateriaController {
  constructor(private readonly materiaService: MateriaService) {}

  @Post('nuevo')
  async create(@Body() materiaDto: MateriaDto):Promise<MateriaDto> {
    return await this.materiaService.create(materiaDto);
  }

  @Get()
  async findAll():Promise<MateriaDto[]> {
    return await this.materiaService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id:number): Promise<MateriaDto> {
    return await this.materiaService.findOne(id);
  }

  @Put('modificar/:id')
  async update(@Param('id') id:number, @Body() materiaDto: MateriaDto):Promise<MateriaDto> {
    return await this.materiaService.update(id, materiaDto);
  }

  @Delete('eliminar/:id')
  async remove(@Param('id') id:number): Promise<{ message:string }> {
    return await this.materiaService.remove(id);
  }
}
