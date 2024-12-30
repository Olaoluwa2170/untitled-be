import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

enum Role {
    HOST="HOST",
    USER="USER",
    ADMIN="ADMIN"
}

export class AuthSignUpDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsEnum(Role)
    role: Role
}