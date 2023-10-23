import { Column, Entity, JoinTable, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "src/curso/entities/curso.entity";

@Entity()
export class Materia {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @ManyToOne(()=>Curso,curso=>curso.materias)
    @JoinTable()
    curso: Curso;

    constructor(nombre:string){
        this.nombre = nombre;
    }

    public getNombre():string{
        return this.nombre;
    }

    public setNombre(nombre:string):void{
        this.nombre = nombre;
    }
}
