import { Injectable } from '@nestjs/common';

export type test = {
  a: string;
};

export type test2 = {
  b: number;
};

@Injectable()
export class AppService {
  getHello(): test & test2 {
    return { a: 'test', b: 2 };
  }
}
