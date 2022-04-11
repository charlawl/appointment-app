import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Therapist } from './therapist.entity';

export enum AppointmentType{
    ONEOFF = "oneOff",
    CONSULTATION = "consultation"
}

export function overlaps(s1,e1, s2,e2) {
    return s1 <= e2 && s2 <= e1
}
@Entity()
export class Appointment {
    @Expose()
    @PrimaryGeneratedColumn()
    id: number;

    @Expose()
    @Column()
    startTime: Date

    @Column()
    endTime: Date

    @Expose()
    get duration(): number {
        var millis =  this.endTime.getTime() - this.startTime.getTime() 
        return millis/60000
    }

    //TODO: Implement a function to check overlapping appointments
    conflicts(appointments:Appointment[]) : boolean {
        return appointments.some((a:Appointment) => overlaps(this.startTime, this.endTime, a.startTime, a.endTime))
    }

    @Expose()
    @Column({
        type:"enum",
        enum: AppointmentType,
    })
    appointmentType: AppointmentType

    @Expose()
    @ManyToOne(type => Therapist, therapist => therapist.appointments, {eager: true})
    therapist: Therapist 
}

