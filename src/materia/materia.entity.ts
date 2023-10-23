import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne, OneToMany, JoinColumn, JoinTable } from 'typeorm';
import { Curso } from 'src/curso/entities/curso.entity';
import { EstudianteEntity } from 'src/estudiante/estudiante.entity';

@Entity('materias')
export class Materia {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;
 
  @Column()
  cursoId: number;

  @ManyToMany(() => EstudianteEntity, estudiante => estudiante.materias)
  estudiantes: EstudianteEntity[];
  
  // @ManyToOne(() => CursoEntity, curso => curso.materias) // Relación de muchos a uno
  // curso: CursoEntity; // Propiedad para la relación

  // @ManyToOne(() => EscuelaEntity, escuela => escuela.curso) // Relación de muchos a uno}}
  // @JoinTable()
  // escuela: EscuelaEntity;




  @ManyToOne(() => Curso, curso => curso.materias) // Relación de muchos a uno}}
  @JoinTable()
  curso: Curso;



  @OneToMany(() => EstudianteEntity, estudiante => estudiante.curso) // Relación de uno a muchos
  estudiante: EstudianteEntity[]; // Propiedad para la relación
}