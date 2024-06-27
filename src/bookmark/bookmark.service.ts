import { Injectable } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) { }

  async create(user_id: number, createBookmarkDto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookMark.create({
      data: {
        user_id,
        ...createBookmarkDto,
      },
    });

    return bookmark;
  }

  findAll(user_id: number) {
    const data = this.prisma.bookMark.findMany({
      where: {
        user_id
      }
    })
    return data
  }

  findOne(user_id:number,id: number) {
    return this.prisma.bookMark.findFirst({
      where: {
        id: id,
        user_id,
      },
    });
  }

  update(id: number, updateBookmarkDto: UpdateBookmarkDto) {
    return `This action updates a #${id} bookmark`;
  }

  remove(id: number) {
    return `This action removes a #${id} bookmark`;
  }
}