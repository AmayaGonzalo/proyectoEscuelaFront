import { PartialType } from '@nestjs/mapped-types';
import { CursoDto } from './create-curso.dto';

export class UpdateCursoDto extends PartialType(CursoDto) {}
