import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MemberRepositoryAbstract } from './repositories/member.repository.abstract';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities';
import { MemberAlreadyExistsError } from './errors/member-already-exists.error';
import { Prisma } from '../../generated/prisma/client';
import { MemberNotFoundError } from './errors/member-not-found.error';
import { BookNotFoundError } from '../book/errors/book-not-found.error';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepositoryAbstract) {}

  async findAll(): Promise<Member[]> {
    return await this.memberRepository.findAll();
  }

  async findOne(id: string): Promise<Member | null> {
    const member = await this.memberRepository.findOne(id);
    if (!member) throw new MemberNotFoundError();
    return member;
  }

  async save(payload: CreateMemberDto): Promise<Member> {
    try {
      return await this.memberRepository.save(payload);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') throw new MemberAlreadyExistsError();
        if (err.code === 'P2025') throw new BookNotFoundError();
        throw new InternalServerErrorException(err.message);
      }
      throw err;
    }
  }

  async update(id: string, payload: UpdateMemberDto): Promise<Member> {
    try {
      const { borrowedBookIds } = payload;

      if (borrowedBookIds) {
        const borrowedBooks =
          await this.memberRepository.findBooks(borrowedBookIds);
        if (borrowedBookIds.length !== borrowedBooks.length) {
          throw new BookNotFoundError();
        }
      }

      return await this.memberRepository.update(id, payload);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') throw new MemberAlreadyExistsError();
        if (err.code === 'P2025') throw new MemberNotFoundError();
        throw new InternalServerErrorException(err.message);
      }

      if (err instanceof Prisma.PrismaClientValidationError) {
        throw new InternalServerErrorException(
          `Invalid member update payload: ${err.message}`,
        );
      }

      throw err;
    }
  }

  async remove(id: string): Promise<Member> {
    try {
      return await this.memberRepository.remove(id);
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2025') throw new MemberNotFoundError();
        throw new InternalServerErrorException(err.message);
      }
      throw err;
    }
  }
}
