import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';
import { Member } from '../entities';
import { MemberRepositoryAbstract } from './member.repository.abstract';

@Injectable()
export class PrismaMemberRepository implements MemberRepositoryAbstract {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Member[]> {
    return await this.prisma.member.findMany();
  }

  async findOne(id: string): Promise<Member | null> {
    return await this.prisma.member.findUnique({
      where: { id },
    });
  }

  async save(payload: CreateMemberDto): Promise<Member> {
    return await this.prisma.member.create({ data: payload });
  }

  async update(id: string, payload: UpdateMemberDto): Promise<Member> {
    return await this.prisma.member.update({
      where: { id },
      data: payload,
    });
  }

  async remove(id: string): Promise<Member> {
    return await this.prisma.member.delete({ where: { id } });
  }
}
