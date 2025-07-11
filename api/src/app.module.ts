import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoriesModule } from './categories/categories.module';
import { ServicesModule } from './services/services.module';
import { EventsModule } from './events/events.module';
import { CommentsModule } from './comments/comments.module';
import { CustomersModule } from './customers/customers.module';
import { ProvidersModule } from './providers/providers.module';
import { GuestlistModule } from './guestlist/guestlist.module';
import { AdminsModule } from './admins/admins.module';
import { TypesModule } from './types/types.module';
import { PacksModule } from './packs/packs.module';
import { AppointmentsModule } from './appointments/appointments.module';
import { FacturesModule } from './factures/factures.module';
import { DisponibilitiesModule } from './disponibilities/disponibilities.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';


@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017', {dbName:'pfeproject'}),UsersModule, CategoriesModule, ServicesModule, EventsModule, CommentsModule, CustomersModule, ProvidersModule, GuestlistModule, AdminsModule, TypesModule, PacksModule, 
  AppointmentsModule, 
  FacturesModule,
   DisponibilitiesModule, 
   AuthModule,ConfigModule.forRoot({isGlobal:true}),
  MailerModule.forRoot({
    transport:{
      host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "bcf0e63ecacabf",
    pass: "ff9d86d691416a"
  }
  
  },
    defaults:{
      from:'no-replay<noreplay@exemple.com'
    },
    template:{
      dir: join(__dirname , 'templates'),
      adapter: new HandlebarsAdapter(),
      options:{
        strict: true
      }
    }
    
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
