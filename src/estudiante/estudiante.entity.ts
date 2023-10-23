import { Curso } from "src/curso/entities/curso.entity";
import { Escuela } from "src/escuela/entities/escuela.entity";
import { Materia } from "src/materia/entities/materia.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinTable, OneToMany, ManyToMany } from "typeorm";

@Entity('estudiante')
export class EstudianteEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    apellido: string;

    @Column()
    dni: number;
  
    @Column()
    direccion: string;

    @Column()
    cursoId: number;

   
  
    // @ManyToMany(() => MateriasEntity, materias => materias.estudiantes)
    // @JoinTable({
    //   name: 'estudiante_materias',
    //   joinColumn: { name: 'estudiante_id', referencedColumnName: 'id' },
    //   inverseJoinColumn: { name: 'materia_id', referencedColumnName: 'id' },
    // })
    // materias: MateriasEntity[];

    // @Column({type: 'timestamp', default: () => "CURRENT_TIMESTAMP"})
    // fecha_registro: Date;   
    

    // @ManyToOne(() => CursoEntity, curso => curso.estudiante) // Relación de muchos a uno}}
    // @JoinTable()
    // curso: CursoEntity;
}