import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';

@Module({
  imports: [
      ProductModule,

    // npm install --save @nestjs/mongoose mongoose
    // npm install @types/mongoose -D
    MongooseModule.forRoot('mongodb://localhost/nestjs_products_api', { useNewUrlParser: true }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
