import { IsNotEmpty, IsString } from "class-validator";

export class MateriaDto {

    @IsNotEmpty()
    @IsString()
    readonly nombre: string;
}
