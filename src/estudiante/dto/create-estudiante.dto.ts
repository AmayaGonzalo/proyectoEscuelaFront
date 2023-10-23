import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EstudianteDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre:string;

    @IsString()
    @IsNotEmpty()
    readonly apellido:string;

    @IsNumber()
    @IsNotEmpty()
    readonly dni:number;

    @IsString()
    @IsNotEmpty()
    readonly direccion:string;
}
