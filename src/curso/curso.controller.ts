import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { CursoService } from './curso.service';
import { CursoDto } from './dto/create-curso.dto';

@Controller('curso')
export class CursoController {
  constructor(private readonly cursoService: CursoService) {}

  @Post('nuevo')
  async create(@Body() cursoDto: CursoDto):Promise<CursoDto> {
    return await this.cursoService.create(cursoDto);
  }

  @Get()
  async findAll():Promise<CursoDto[]> {
    return await this.cursoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id:number):Promise<CursoDto> {
    return await this.cursoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id:number, @Body() cursoDto: CursoDto) {
    return this.cursoService.update(id, cursoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id:number): Promise<{ message:string }> {
    return this.cursoService.remove(id);
  }
}
