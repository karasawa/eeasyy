import { Controller, Post, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { HttpCode } from '@nestjs/common/decorators/http';

export type test3 = {
  c: boolean;
};

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get(':id')
  // getHello(@Param() params): test & test2 & test3 {
  //   const sample = this.appService.getHello();
  //   console.log(params.id);
  //   return { ...sample, c: true };
  // }

  @Post()
  @HttpCode(204)
  postHello(@Req() request: Request): void {
    return;
  }
}
