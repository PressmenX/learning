import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';
import { Member } from '../entities';
import { MemberRepositoryAbstract } from './member.repository.abstract';
import { Book } from '../../book/entities';

@Injectable()
export class PrismaMemberRepository implements MemberRepositoryAbstract {
  constructor(private readonly prisma: PrismaService) {}

  async findBooks(ids: string[]): Promise<Book[]> {
    return await this.prisma.book.findMany({ where: { id: { in: ids } } });
  }

  async findAll(): Promise<Member[]> {
    return await this.prisma.member.findMany();
  }

  async findOne(id: string): Promise<Member | null> {
    return await this.prisma.member.findUnique({
      where: { id },
      include: { borrowedBooks: true },
    });
  }

  async save(payload: CreateMemberDto): Promise<Member> {
    const { borrowedBookIds, ...data } = payload;
    return await this.prisma.member.create({
      data: {
        ...data,
        borrowedBooks: { connect: borrowedBookIds?.map((id) => ({ id })) },
      },
    });
  }

  async update(id: string, payload: UpdateMemberDto): Promise<Member> {
    const { borrowedBookIds, ...data } = payload;
    return await this.prisma.member.update({
      where: { id },
      data: {
        ...data,
        borrowedBooks: { connect: borrowedBookIds?.map((id) => ({ id })) },
      },
    });
  }

  async remove(id: string): Promise<Member> {
    return await this.prisma.member.delete({ where: { id } });
  }
}
