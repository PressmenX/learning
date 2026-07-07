import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MemberRepositoryAbstract } from './repositories/member.repository.abstract';
import { PrismaMemberRepository } from './repositories/prisma-member.repository';

@Module({
  controllers: [MemberController],
  providers: [
    MemberService,
    {
      provide: MemberRepositoryAbstract,
      useClass: PrismaMemberRepository,
    },
  ],
})
export class MemberModule {}
