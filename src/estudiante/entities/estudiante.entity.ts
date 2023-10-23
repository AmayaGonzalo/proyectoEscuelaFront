import { Curso } from "src/curso/entities/curso.entity";
import { Escuela } from "src/escuela/entities/escuela.entity";
import { Materia } from "src/materia/entities/materia.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"


@Entity()
export class Estudiante {

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @Column()
    apellido:string;

    @Column()
    dni:number;

    @Column()
    direccion:string;

    @ManyToOne(()=> Escuela, escuela => escuela.estudiantes)
    @JoinTable()
    escuela: Escuela;

    @ManyToOne(()=>Curso, curso=>curso.estudiantes)
    @JoinTable()
    curso: Curso;

    @ManyToMany(()=>Materia, materias => materias.estudiantes)
    @JoinTable({ name: 'estudiantes_materias'})
    materias: Materia[];

    constructor(nombre:string, apellido:string, dni:number, direccion?:string){
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.direccion = direccion;
    }

    public getNombre():string{
        return this.nombre;
    }

    public setNombre(nombre:string):void{
        this.nombre = nombre;
    }

    public getApellido():string{
        return this.apellido;
    }

    public setApellido(apellido:string):void{
        this.apellido = apellido;
    }

    public getDni():number{
        return this.dni;
    }

    public setDni(dni:number):void{
        this.dni = dni;
    }

    public getDireccion():string{
        return this.direccion;
    }

    public setDireccion(direccion:string):void{
        this.direccion = direccion;
    }
}
