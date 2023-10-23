import { Estudiante } from "src/estudiante/entities/estudiante.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name:'escuela' })
export class Escuela {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    direccion:string;

    @OneToMany(()=> Estudiante, estudiantes => estudiantes.escuela)
    estudiantes:Estudiante[];

    constructor(nombre:string, direccion:string){
        this.nombre = nombre;
        this.direccion = direccion;
    }

    public setNombre(nombre:string):void{
        this.nombre = nombre;
    }

    public getNombre():string{
        return this.nombre;
    }

    public setDireccion(direccion:string):void{
        this.direccion = direccion;
    }

    public getDireccion():string{
        return this.direccion;
    }
}
