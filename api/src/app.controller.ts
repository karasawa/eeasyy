import { Controller, Get, Post, Req } from '@nestjs/common';
import { AppService, test, test2 } from './app.service';
import { Request } from 'express';
import { HttpCode, Param } from '@nestjs/common/decorators/http';

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
    console.log(request);
    return;
  }
}
