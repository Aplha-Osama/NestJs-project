import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class ProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    price: number

    sale: boolean

    // @IsString()
    // availability: string
}