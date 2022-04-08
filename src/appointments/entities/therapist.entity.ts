import { Expose } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';

export enum Specialism {
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

    @Expose()
    @Column()
    name: string;

    @Column({
        type:"enum",
        enum: Specialism,
        array: true,
        default: []
    })
    specialisms: Specialism[]

    @OneToMany(type => Appointment, appointment => appointment.therapist,  {eager: true})
    appointments: Appointment[];
}