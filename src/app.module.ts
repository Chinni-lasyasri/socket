import { Module } from '@nestjs/common';
import { ChatGateway } from './test/test.gateway';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'src/public'),
    }),
  ],
  providers: [ChatGateway],
})
export class AppModule {}
