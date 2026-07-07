import { Member } from '../entities';
import { CreateMemberDto } from '../dto/create-member.dto';
import { UpdateMemberDto } from '../dto/update-member.dto';

export abstract class MemberRepositoryAbstract {
  abstract findAll(): Promise<Member[]>;
  abstract findOne(id: string): Promise<Member | null>;
  abstract save(payload: CreateMemberDto): Promise<Member>;
  abstract update(id: string, payload: UpdateMemberDto): Promise<Member>;
  abstract remove(id: string): Promise<Member>;
}
