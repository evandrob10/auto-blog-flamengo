import { Module } from '@nestjs/common';
import { WritersController } from './writers.controller';
import { WritersService } from './writers.service';
import { PrismaClientModule } from 'src/prisma-client/prisma-client.module';

@Module({
  imports: [PrismaClientModule],
  controllers: [WritersController],
  providers: [WritersService],
  exports: [WritersService],
})
export class WritersModule {}
