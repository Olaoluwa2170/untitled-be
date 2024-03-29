import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

enum Role {
    HOST="HOST",
    USER="USER"
}

export class AuthLoginDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}