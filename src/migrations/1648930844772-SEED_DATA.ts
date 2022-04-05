import { Appointment, AppointmentType } from "src/appointments/entities/appointment.entity";
import { Specialism, Therapist } from "src/appointments/entities/therapist.entity";
import {getRepository, MigrationInterface, QueryRunner} from "typeorm";

export class SEEDDATA1648930844772 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        const therapist1 = getRepository(Therapist).create({
            name: "John Smith",
            specialisms: [Specialism.ADDICTION],
        })

        const appointment1 = getRepository(Appointment).create({
            startTime: new Date(2022,4,1,12,30),
            endTime: new Date(2022,4,1,13,30),
            appointmentType: AppointmentType.CONSULTATION,
            therapist: therapist1
        })

        await getRepository(Therapist).save(therapist1);
        await getRepository(Appointment).save(appointment1);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
