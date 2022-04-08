import { Appointment, AppointmentType } from "src/appointments/entities/appointment.entity";
import { Specialism, Therapist } from "src/appointments/entities/therapist.entity";
import {getRepository, MigrationInterface, QueryRunner} from "typeorm";

export class SEEDDATA1648930844772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const therapist1 = getRepository(Therapist).create({
            name: "Jeff Winger",
            specialisms: [Specialism.ADDICTION],
        })

        const appointment1 = getRepository(Appointment).create({
            startTime: new Date(2022,4,1,12,30),
            endTime: new Date(2022,4,1,13,30),
            appointmentType: AppointmentType.CONSULTATION,
            therapist: therapist1
        })

        const therapist2 = getRepository(Therapist).create({
            name: "Jack O'Neill",
            specialisms: [Specialism.CBT],
        })

        const appointment2 = getRepository(Appointment).create({
            startTime: new Date(2022,4,2,9,30),
            endTime: new Date(2022,4,2,11,30),
            appointmentType: AppointmentType.CONSULTATION,
            therapist: therapist2
        })

        const therapist3 = getRepository(Therapist).create({
            name: "Amy Santiago",
            specialisms: [Specialism.ADHD],
        })

        const appointment3 = getRepository(Appointment).create({
            startTime: new Date(2022,4,21,15,0),
            endTime: new Date(2022,4,21,16,30),
            appointmentType: AppointmentType.ONEOFF,
            therapist: therapist1
        })

        await getRepository(Therapist).save(therapist1);
        await getRepository(Appointment).save(appointment1);
        await getRepository(Therapist).save(therapist2);
        await getRepository(Appointment).save(appointment2);
        await getRepository(Therapist).save(therapist3);
        await getRepository(Appointment).save(appointment3);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
