import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RequestAppointmentsDto } from './dto/request-appointments.dto';
import { Appointment } from './entities/appointment.entity';
import { Therapist } from './entities/therapist.entity';

export const mockRepository = jest.fn(() => ({
  metadata: {
    columns: [],
    relations: [],
  },
  create: jest.fn(() => {}),
  findOne: jest.fn(() => {}),
}));

describe.only('AppointmentsService', () => {
  let service: AppointmentsService;
  let appointmentRepo: Repository<Appointment>
  let therapistRepo: Repository<Therapist>


  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppointmentsService, 
        {provide: getRepositoryToken(Therapist), 
          useClass: mockRepository,
      }, 
        {provide: getRepositoryToken(Appointment),
          useClass: mockRepository
        }]
           
    }).compile();

    appointmentRepo = module.get<Repository<Appointment>>(getRepositoryToken(Appointment))
    therapistRepo = module.get<Repository<Therapist>>(getRepositoryToken(Therapist))
    service = module.get<AppointmentsService>(AppointmentsService);
  });

  afterEach(() => jest.clearAllMocks());

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(appointmentRepo).toBeDefined();
  });

  //NOTE: I had such an issue getting the mocked repository to work. I basically had the same issue as a lot of people https://github.com/nestjs/nest/issues/991 (one example)
  // Would love to discuss how to do this properly! 

  
  // it('should call findBy method with expected params', async () => {
  //   const findAppointmentSpy = jest.spyOn(service, 'findBy');
  //   const dto = new RequestAppointmentsDto();
  //   service.findBy(dto);
  //   expect(findAppointmentSpy).toHaveBeenCalledWith(dto);
  // });

  // it('should indicate conflict when createAppointment is called more than once for the same time with the same therapist', () => {
  //   const dto = new CreateAppointmentDto();
  //   jest.spyOn(appointmentRepo, 'create').mockReturnValueOnce(new Appointment())
  //   jest.spyOn(therapistRepo, 'findOne').mockResolvedValue({id: 1, specialisms:[], name: "test", appointments: []})
  //   service.create(dto)
  //   expect(service.create).toThrowError()
  // })
});



