import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedPointsGateway } from './shared-points/shared-points.gateway';
import { UsersService } from './users/users.service';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PlacesController } from './places/places.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..'),
    })
  ],
  controllers: [AppController, PlacesController],
  providers: [AppService, SharedPointsGateway, UsersService],
})
export class AppModule {}
