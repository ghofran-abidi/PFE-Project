import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from './entities/user.entity';
import { Admin, adminSchema } from 'src/admins/entities/admin.entity';
import { Customer, CustomerSchema } from 'src/customers/entities/customer.entity';
import { Provider, providerSchema } from 'src/providers/entities/provider.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:"users" , schema:userSchema ,discriminators:[{name:Admin.name , schema:adminSchema},
    {name:Customer.name, schema:CustomerSchema},
    {name:Provider.name, schema:providerSchema}]}])],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
