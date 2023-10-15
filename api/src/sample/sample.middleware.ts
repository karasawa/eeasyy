import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class SampleMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('SampleMiddeware...');
    next();
  }
}
