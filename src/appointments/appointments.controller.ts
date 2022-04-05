import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UsePipes, ValidationPipe, DefaultValuePipe, PipeTransform, ArgumentMetadata } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { RequestAppointmentsDto } from './dto/request-appointments.dto';
import { AppointmentResponseDto, ResponseAppointmentDto } from './dto/response-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';


export class ParseDatePipe implements PipeTransform{
  
  transform(value: string, metadata: ArgumentMetadata) {
    
  }
}
@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @UsePipes(new ValidationPipe({transform:true}))
  findAll(@Query() dto:RequestAppointmentsDto)  {
    return this.appointmentsService.findBy(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.appointmentsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(+id, updateAppointmentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.appointmentsService.remove(+id);
  }
}

