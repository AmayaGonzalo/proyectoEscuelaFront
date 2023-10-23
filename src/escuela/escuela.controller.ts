import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.escuelaService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateEscuelaDto: UpdateEscuelaDto) {
  //   return this.escuelaService.update(+id, updateEscuelaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.escuelaService.remove(+id);
  // }
}
