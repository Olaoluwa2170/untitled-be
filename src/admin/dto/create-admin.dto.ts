import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Status } from "src/events/dto";

export class CreateAdminDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class LoginAdminDto {
  @IsString()
  @IsNotEmpty()
  username: string

  @IsString()
  @IsNotEmpty()
  password: string
}

export class InviteAdminDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
}


export class AdminEventStatusDto {
  @IsEnum(Status)
  status: Status
}
