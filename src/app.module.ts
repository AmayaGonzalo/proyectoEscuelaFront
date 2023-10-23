import { EscuelaModule } from './escuela/escuela.module';
import { MateriaModule } from './materia/materia.module';
import { EstudianteModule } from './estudiante/estudiante.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CursoModule } from './curso/curso.module';

@Module({
  imports: [
    EscuelaModule,
    CursoModule,
    MateriaModule,
    EstudianteModule, TypeOrmModule.forRoot({
      "type": "mysql",
      "host": "localhost",
      "port": 3306,
      "username": "root",
      "password": "12345",
      "database": "escueladb",
      "entities":["dist/**/**.entity{.ts,.js}"],
      "synchronize": true
    })],
  controllers: [
    AppController],
  providers: [
    AppService],
})
export class AppModule { }
