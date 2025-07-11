import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsController } from './appointments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { appointmentSchema } from './entities/appointment.entity';

@Module({
  imports:[MongooseModule.forFeature([{name: 'appointment', schema: appointmentSchema}])],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppointmentsModule {}
