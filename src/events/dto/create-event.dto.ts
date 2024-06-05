import {
  //   IsDateString,
  //   IsJSON,
  IsNotEmpty,
  IsObject,
  IsString,
} from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  bgImage: string;

  @IsObject()
  @IsNotEmpty()
  prices: string;

  @IsNotEmpty()
  date: Date;
}
