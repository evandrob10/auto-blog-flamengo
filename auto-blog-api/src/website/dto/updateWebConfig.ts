import { CreateConfigDto } from './createWebConfig.dto';
import { PartialType } from '@nestjs/swagger';

export class updateWebConfig extends PartialType(CreateConfigDto) {}
