import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, UseInterceptors, ClassSerializerInterceptor, SerializeOptions, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
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
    description: 'The found record',
    type: Appointment,
  })
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({transform:true}))
  @UseInterceptors(ClassSerializerInterceptor)
  findAppointments(@Query() dto:RequestAppointmentsDto)  {
    //NOTE: normally I would validate the input query string parameters here in .NET. Using the IActionResult class I could 
    //return OK, BadRequest etc. But I used the class-validator in NestJs in my DTO instead to validate the types of the inputs
    return this.appointmentsService.findBy(dto);
  }

  @Post()
  @UsePipes(new ValidationPipe({transform:true}))
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.appointmentsService.findOne();
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}

