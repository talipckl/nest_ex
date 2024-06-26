import { IsEmail, IsEmpty, IsNotEmpty, IsString } from "class-validator"
export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    password: string;

}