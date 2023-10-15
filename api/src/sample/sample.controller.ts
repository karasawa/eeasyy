import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Param,
  ParseIntPipe,
  UsePipes,
} from '@nestjs/common';
import { SampleService } from './sample.service';
import { Sample } from './sample.interface';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';
import { UseFilters } from '@nestjs/common/decorators';
import { HttpFilter } from 'src/filter/http/http.filter';
import { CreateSampleDto, UpdateSampleDto } from 'src/dto/sample/sample.dto';
import { JoiValidationPipe } from 'src/pipe/joi-validation/joi-validation.pipe';
import { createSampleSchema } from 'src/schema/sample/sample.schema';
import { ValidationPipe } from 'src/pipe/validation/validation.pipe';
import { ParsePipe } from 'src/pipe/parse/parse.pipe';

@Controller('sample')
export class SampleController {
  constructor(private readonly sampleService: SampleService) {}

  @Get()
  @UseFilters(new HttpFilter())
  getSample() {
    // const promiseSample = new Promise((resolve, reject) => {
    //   resolve('success!');
    //   reject('error!');
    // })
    //   .then((a) => console.log(a))
    //   .catch((b) => console.log(b));
    throw new HttpException(
      { error: 'error', status: HttpStatus.FORBIDDEN },
      HttpStatus.FORBIDDEN,
    );
  }

  @Get('id')
  getSampleById(@Body('id', ParseIntPipe) id: number): number {
    console.log(id);
    console.log(typeof id);
    if (typeof id !== 'number') {
      throw new HttpException(
        {
          error: 'number型にしましょう',
          status: HttpStatus.FORBIDDEN,
        },
        HttpStatus.FORBIDDEN,
      );
    }
    return id;
  }

  @Post()
  postSample(@Body() sample: Sample): Sample[] {
    return this.sampleService.postSample(sample);
  }

  @Post('id')
  postSampleById(@Body(new ParsePipe()) createSampleDto: CreateSampleDto) {
    console.log(createSampleDto);
    console.log(createSampleDto instanceof CreateSampleDto);
    return;
  }

  @Post('keke')
  postSampleByKeke(
    @Body(new ValidationPipe()) updateSampleDto: UpdateSampleDto,
  ) {
    console.log(updateSampleDto);
    return;
  }
}
