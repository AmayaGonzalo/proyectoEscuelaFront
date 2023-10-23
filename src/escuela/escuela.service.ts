import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Escuela } from './entities/escuela.entity';
import { Repository } from 'typeorm';
import { EscuelaDto } from './dto/create-escuela.dto';

@Injectable()
export class EscuelaService {

  constructor(@InjectRepository(Escuela)
              private readonly escuelaRepositoy:Repository<Escuela>
  ){}

  async findAll(): Promise<EscuelaDto[]> {
    try{
      const escuelas: EscuelaDto[] = await this.escuelaRepositoy.find();
      if(!escuelas){
        throw new Error('Lo siento, no se encontró la lista de escuelas')
      }else{
        return escuelas;
      }
    }
    catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Escuelas - ' + error
      },HttpStatus.NOT_FOUND);
    }      
  }      

  async create(escuelaDto: EscuelaDto): Promise<Escuela> {
    try{
      const escuela : Escuela = await this.escuelaRepositoy.save(new Escuela(escuelaDto.nombre,escuelaDto.direccion));
      if(!escuela){
        throw new Error('No se pudo crear la nueva escuela')
      }else{
        return escuela;
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Escuelas - ' + error
      },HttpStatus.NOT_FOUND);
    }    
  }


  async findOne(id: number):Promise<EscuelaDto> {
    try{
      const escuela : EscuelaDto = await this.escuelaRepositoy.findOne({ where:{ id:id }});
      if(!escuela){
        throw new Error('No se encontró la escuela');
      }else{
        return escuela;
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Escuelas - ' + error
      },HttpStatus.NOT_FOUND);
    }    
  }

  async update(id: number, escuelaDto: EscuelaDto):Promise<EscuelaDto> {
    try{
      const { nombre, direccion } = escuelaDto;
      let escuela : Escuela = await this.escuelaRepositoy.findOne({ where:{ id:id }});
      if(!escuela){
        throw new Error('No se encontró la escuela a modificar');
      }else{
        if(nombre != null || nombre != undefined){
          escuela.setNombre(nombre);
          escuela = await this.escuelaRepositoy.save(escuela);
          if(direccion != null || direccion != undefined){
            escuela.setDireccion(direccion);
            escuela = await this.escuelaRepositoy.save(escuela);
            return escuela;
          }else{
            throw new Error('No se pudo cambiar la división');
          }
        }else{
          throw new Error('No se pudo cambiar el nombre');
        }
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Escuelas - ' + error
      },HttpStatus.NOT_FOUND);
    }  
  }

  async remove(id: number):Promise<{ massage:string }> {
    try{
      const escuela : Escuela = await this.escuelaRepositoy.findOne({ where:{ id:id }});
      if(!escuela){
        throw new Error('No se encontró la escuela a eliminar');
      }else{
        await this.escuelaRepositoy.remove(escuela);
        return {
          massage: "Se ha borrado la escuela: "+`${escuela.nombre}`
        }
      }
    }catch(error){
      throw new HttpException({
          status: HttpStatus.CONFLICT,
          error: 'Error en Escuelas - ' + error
      },HttpStatus.NOT_FOUND);
    }  
  }
}
