import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Controller('members')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  async findAll() {
    return this.memberService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.memberService.findOne(id);
  }

  @Post()
  async create(@Body() payload: CreateMemberDto) {
    return this.memberService.save(payload);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateMemberDto) {
    return this.memberService.update(id, payload);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.memberService.remove(id);
  }
}
