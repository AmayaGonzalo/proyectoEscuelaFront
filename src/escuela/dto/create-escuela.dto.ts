import { IsNotEmpty, IsString } from "class-validator";

export class EscuelaDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre:string;

    @IsString()
    @IsNotEmpty()
    readonly direccion:string;
}
