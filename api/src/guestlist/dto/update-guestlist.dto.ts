import { PartialType } from '@nestjs/swagger';
import { CreateGuestlistDto } from './create-guestlist.dto';

export class UpdateGuestlistDto extends PartialType(CreateGuestlistDto) {}
