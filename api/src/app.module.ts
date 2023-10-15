import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SampleModule } from './sample/sample.module';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';
import { SampleController } from './sample/sample.controller';
import { SampleMiddleware } from './sample/sample.middleware';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [SampleModule, AuthModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware, SampleMiddleware)
      .exclude({ path: '/sample', method: RequestMethod.POST })
      .forRoutes(SampleController);
  }
}
