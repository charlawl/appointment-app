import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    //Should have different connection for seeding DB
    AppointmentsModule,
    ConfigModule.forRoot()
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
