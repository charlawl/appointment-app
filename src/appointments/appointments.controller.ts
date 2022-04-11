import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, UseInterceptors, ClassSerializerInterceptor, SerializeOptions, HttpCode, HttpStatus, NotFoundException, HttpException } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ArrayNotEmpty } from 'class-validator';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RequestAppointmentsDto } from './dto/request-appointments.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { Appointment } from './entities/appointment.entity';

@ApiTags('appointments')
@Controller('appointments')
@SerializeOptions({
  strategy: 'excludeAll'
})
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Record found',
    type: Appointment,
  })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({transform:true}))
  @UseInterceptors(ClassSerializerInterceptor)
  async findAppointments(@Query() dto:RequestAppointmentsDto)  {
    //NOTE: normally I would validate the input query string parameters here in .NET. Using the IActionResult class I could 
    //return OK, BadRequest etc. But I used the class-validator in NestJs in my DTO instead to validate the types of the inputs
    return this.appointmentsService.findBy(dto);
  }

  @Post()
  @ApiResponse({
    status: 204,
    description: 'Appointment Created',
    type: Appointment,
  })
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({transform:true}))
  createAppointment(@Body() createAppointmentDto: CreateAppointmentDto) {
    //NOTE: there should be a 409 Conflict check here if an appointment with a therapist already exists at the requsted time
    return this.appointmentsService.create(createAppointmentDto);
  }

  //NOTE: left the boiler plate code from the module creation in case we needed to add more methods
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}

