import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { EscuelaService } from './escuela.service';
import { EscuelaDto } from './dto/create-escuela.dto';
import { Escuela } from './entities/escuela.entity';

@Controller('escuela')
export class EscuelaController {
  constructor(private readonly escuelaService: EscuelaService) {}

  @Get()
  async findAllEstcuelas():Promise<EscuelaDto[]> {
    return await this.escuelaService.findAll();
  }

  @Post('nuevo')
  async createEscuela(@Body() escuelaDto: EscuelaDto):Promise<Escuela> {
    return await this.escuelaService.create(escuelaDto);
  }

  @Get(':id')
  async findOne(@Param('id') id:number):Promise<EscuelaDto> {
    return await this.escuelaService.findOne(id);
  }

  @Put('modificar/:id')
  async update(@Param('id') id: number, @Body() escuelaDto: EscuelaDto):Promise<EscuelaDto> {
    return await this.escuelaService.update(id, escuelaDto);
  }

  @Delete('eliminar/:id')
  async remove(@Param('id') id:number):Promise<{ massage:string }> {
    return await this.escuelaService.remove(id);
  }
}
