import { Test, TestingModule } from '@nestjs/testing';
import { AppointmentsController } from './appointments.controller';
import { AppointmentsService } from './appointments.service';
import { RequestAppointmentsDto } from './dto/request-appointments.dto';

describe('AppointmentsController', () => {
  let appointmentController: AppointmentsController;
  let appointmentService: AppointmentsService;

  beforeAll(async () => {
    const ApiServiceProvider = {
      provide: AppointmentsService,
      useFactory: () => ({
        findBy: jest.fn(() => [])
      })
    }
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointmentsController],
      providers: [AppointmentsService, ApiServiceProvider],
    }).compile();

    appointmentService = module.get<AppointmentsService>(AppointmentsService);
    appointmentController = module.get<AppointmentsController>(AppointmentsController);
  });

  it('should be defined', () => {
    expect(appointmentController).toBeDefined();
  });

  it('calling findAppointments method', () => {
    const dto = new RequestAppointmentsDto();
    expect(appointmentController.findAppointments(dto)).not.toEqual(null);
  })

  it("calling findAppointments method", () => {
    const dto = new RequestAppointmentsDto();
    appointmentController.findAppointments(dto);
    expect(appointmentService.findBy).toHaveBeenCalled();
    expect(appointmentService.findBy).toHaveBeenCalledWith(dto);
  }) 
});
