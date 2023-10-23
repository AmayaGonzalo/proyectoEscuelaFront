import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Curso } from "src/curso/entities/curso.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";

@Entity()
export class Materia {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @ManyToOne(()=>Curso,curso=>curso.materias)
    @JoinTable()
    curso: Curso;

    @ManyToMany(()=>Estudiante, estudiantes=> estudiantes.materias)
    estudiantes: Estudiante[];

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
