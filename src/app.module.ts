import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentsModule } from './appointments/appointments.module';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    //Should have different connection for seeding DB
    AppointmentsModule
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
