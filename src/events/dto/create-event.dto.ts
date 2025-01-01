import {
  IsEnum,
  //   IsDateString,
  //   IsJSON,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export enum Status {
  pending="pending",
  active="active"
}
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

  @IsEnum(Status)
  status: Status

  @IsObject()
  @IsNotEmpty()
  prices: string;

  @IsNotEmpty()
  date: Date;
}
export class CreateEventRestructureDto {
  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  location: {
    landmark: string, venue: string, state: string
  };

  @IsString()
  @IsNotEmpty()
  bgImage: string;

  @IsEnum(Status)
  status: Status

  @IsObject()
  @IsNotEmpty()
  prices: string;

  @IsNotEmpty()
  date: Date;
}
export class EventFilterDto {
  // @IsString()
  // @IsNotEmpty()
  name?: string;

  // @IsString()
  // @IsNotEmpty()
  type?: string;

  page?: number;

  size?: number;

  @IsEnum(Status)
  @IsOptional()
  status?: Status;

  // @IsString()
  // @IsNotEmpty()
  // location: string;

  // @IsString()
  // @IsNotEmpty()
  // bgImage: string;

  // @IsObject()
  // @IsNotEmpty()
  // prices: string;

  // @IsNotEmpty()
  date: Date;
}
