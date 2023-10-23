import { IsNotEmpty, IsString }  from 'class-validator';

export class CursoDto {

    @IsString()
    @IsNotEmpty()
    readonly grado: string;

    @IsString()
    @IsNotEmpty()
    readonly division: string;
}
