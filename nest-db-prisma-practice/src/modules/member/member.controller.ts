import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { PrismaLogInterceptor } from '../../core/interceptors/prisma-log.interceptor';

@Controller('members')
@UseInterceptors(PrismaLogInterceptor)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get('search/email')
  async findByEmail(@Query('email') email: string) {
    return this.memberService.findByEmail(email);
  }

  @Get('search/fullname')
  async findByFullName(@Query('fullName') fullName: string) {
    return this.memberService.findByFullName(fullName);
  }

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
