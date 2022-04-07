import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, ManyToOne, GridFSBucketOpenUploadStreamOptions } from 'typeorm';
import { Therapist } from './therapist.entity';

export enum AppointmentType{
    ONEOFF = "oneOff",
    CONSULTATION = "consultation"
}

@Entity()
export class Appointment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default:null})
    clientId: string;

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

