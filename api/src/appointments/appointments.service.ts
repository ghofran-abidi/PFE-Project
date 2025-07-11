import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IAppointment } from './interfaces/appointment.interface';

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectModel("appointment")
    private appointmentModel:Model<IAppointment>
    
  ){}


  async createAppointment(createAppointmentDto: CreateAppointmentDto):Promise<IAppointment>{
    const newAppointment = new this.appointmentModel(createAppointmentDto);
    return await newAppointment.save();
  }

  async findAllAppointments():Promise<IAppointment[]> {
    const AppointmentsData = await this.appointmentModel.find().exec();
    if (!AppointmentsData || AppointmentsData.length === 0) {
      throw new NotFoundException ('No Appointments found');
    }
    return AppointmentsData;
    
  }

  async findOneAppointment(AppointmentId: string) :Promise<IAppointment>{
    const ExistingAppointment = await this.appointmentModel.findById(AppointmentId).exec();
    if(!ExistingAppointment){
      throw new NotFoundException ('Appointment not found');
    }
    return ExistingAppointment;
  }

  async updateAppointment(AppointmentId: string, updateAppointmentDto: UpdateAppointmentDto):Promise<IAppointment> {
    const updateAppointment=await this.appointmentModel.findByIdAndUpdate(AppointmentId , updateAppointmentDto, {new:true})
    if(!updateAppointment) throw new NotFoundException("Appointment does not found")
    return updateAppointment
  }

  async removeAppointment(AppointmentId: string) {
    const deletedAppointment=await this.appointmentModel.findByIdAndDelete(AppointmentId)
    if(!deletedAppointment) throw new NotFoundException( "Appointment does not found")
    return deletedAppointment
  }
}
