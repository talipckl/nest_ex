import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';

@UseGuards(JwtGuard)
@ApiTags('bookmark')
@Controller('bookmark')
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {} // service

  @Post()
  create(@GetUser('id') user_id: number ,@Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarkService.create(user_id,createBookmarkDto);
  }

  @Get()
  findAll(@GetUser('id') user_id: number ) {
    return this.bookmarkService.findAll(user_id);
  }

  @Get(':id')
  findOne(@GetUser('id') user_id: number ,@Param('id',ParseIntPipe) id: number) {
    return this.bookmarkService.findOne(user_id,id);
  }

  @Patch(':id')
  update(@GetUser('id') user_id: number ,@Param('id') id: number, @Body() updateBookmarkDto: UpdateBookmarkDto) {
    return this.bookmarkService.update(+id, updateBookmarkDto);
  }

  @Delete(':id')
  remove(@GetUser('id') user_id: number ,@Param('id') id: number) {
    return this.bookmarkService.remove(+id);
  }
}
