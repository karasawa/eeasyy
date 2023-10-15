import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { CreateSampleDto, SampleDto } from 'src/dto/sample/sample.dto';

@Injectable()
export class ParsePipe implements PipeTransform<SampleDto, CreateSampleDto> {
  transform(value: SampleDto, metadata: ArgumentMetadata): CreateSampleDto {
    console.log(value);
    if (
      value?.sex === undefined ||
      value?.name === undefined ||
      value?.age === undefined
    ) {
      throw new BadRequestException('name, age, sexを含めたbodyを送信ください');
    }
    const result: CreateSampleDto = {
      name: value.name,
      age: value.age,
    };
    return result;
  }
}
