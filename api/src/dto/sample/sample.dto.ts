import { IsInt, IsString } from 'class-validator';

export class CreateSampleDto {
  readonly name: string;
  readonly age: number;
}

export class UpdateSampleDto {
  @IsString()
  name: string;

  @IsInt()
  age: number;
}

export class SampleDto {
  name: string;
  age: number;
  sex: string;
}
