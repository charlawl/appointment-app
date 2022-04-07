import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsService } from './appointments.service';
import { RequestAppointmentsDto } from './dto/request-appointments.dto';

class ApiServiceMock {
  findBy(dto: any) {
     return [];
  }
}

describe.only('AppointmentsService', () => {
  let service: AppointmentsService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: AppointmentsService,
      useClass: ApiServiceMock,
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsService, ApiServiceProvider],
    }).compile();

    service = module.get<AppointmentsService>(AppointmentsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call findBy method with expected params', async () => {
    const findAppointmentSpy = jest.spyOn(service, 'findBy');
    const dto = new RequestAppointmentsDto();
    service.findBy(dto);
    expect(findAppointmentSpy).toHaveBeenCalledWith(dto);
  });
});



