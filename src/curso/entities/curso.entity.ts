import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Materia } from "src/materia/entities/materia.entity";
import { Estudiante } from "src/estudiante/entities/estudiante.entity";

@Entity()
export class Curso {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    grado: string;

    @Column()
    division: string;

    @OneToMany(()=>Materia,materias=>materias.curso)   
    materias: Materia[];

    @OneToMany(()=>Estudiante, estudiantes=> estudiantes.curso)
    estudiantes:Estudiante[];

    constructor(grado:string,division:string){
        this.grado = grado;
        this.division = division;
    }

    public setGrado(grado:string):void{
        this.grado = grado;
    }

    public getGrado():string{
        return this.grado;
    }

    public setDivision(division:string){
        this.division = division;
    }

    public getDivision():string{
        return this.division;
    }
}
