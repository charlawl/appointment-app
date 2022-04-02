import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';

export enum Speciality {
    ADDICTION = "addiction",
    ADHD = "adhd",
    CBT = "cbt",
    DIVORCE = "divorce",
    SEXUALITY = "sexuality"
}

@Entity()
export class Therapist{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({
        type:"enum",
        enum: Speciality,
        array: true,
        default: []
    })
    specialities: Speciality[]

    @OneToMany(type => Appointment, appointment => appointment.therapist)
    appointments: Appointment[];
}