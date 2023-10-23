import { MateriaService } from './materia.service';
import { MateriaController } from './materia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import {  MateriasEntity } from './materia.entity';

@Module({
    imports: [TypeOrmModule.forFeature([MateriasEntity])],
    controllers: [
        MateriaController,],
    providers: [
        MateriaService,],
})
export class MateriaModule { }
