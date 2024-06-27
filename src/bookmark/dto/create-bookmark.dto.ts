import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator"

export class CreateBookmarkDto { 
    @IsNotEmpty()
    @IsString()
    title: string
}
