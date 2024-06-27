import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // heryerden erişim
@Module({
  providers: [PrismaService],
  exports:[PrismaService]
})
export class PrismaModule {}
