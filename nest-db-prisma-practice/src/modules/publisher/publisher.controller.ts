import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PublisherService } from './publisher.service';
import { CreatePublisherDto } from './dto/create-publisher.dto';
import { UpdatePublisherDto } from './dto/update-publisher.dto';

@Controller('publishers')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  async create(@Body() createPublisherDto: CreatePublisherDto) {
    return this.publisherService.create(createPublisherDto);
  }

  @Get()
  async findAll() {
    return this.publisherService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.publisherService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePublisherDto: UpdatePublisherDto,
  ) {
    return this.publisherService.update(id, updatePublisherDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.publisherService.remove(id);
  }
}
