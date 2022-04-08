import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppointmentsModule } from '../src/appointments/appointments.module';
import { AppointmentsService } from '../src/appointments/appointments.service';
import { RequestAppointmentsDto } from 'src/appointments/dto/request-appointments.dto';


describe('AppController (e2e)', () => {
  let app: INestApplication;
  let appointmentService: { 
    findBy: (e: RequestAppointmentsDto) => ['test'],
    findAll: () => ['test']};

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppointmentsModule]
    })
      .overrideProvider(AppointmentsService)
      .useValue(appointmentService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/appointments (GET)', () => {
    return request(app.getHttpServer())
      .get('/appointments')
      .expect(200)
  });

  it('/appointments (POST)', () => {
    return request(app.getHttpServer())
    .post('/appointments')
    .send({
      therapistId: 2,
      startTime: "2022-04-06T13:00:00Z",
      endTime: "2022-04-06T14:00:00Z",
      appointmentType: "oneOff"
  })
  .expect(409)
  })
});
