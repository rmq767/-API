import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiPropertyOptional,
  ApiProperty,
} from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Post as PostSchema } from './post.model';
import { InjectModel } from 'nestjs-typegoose';
import { ModelType } from '@typegoose/typegoose/lib/types';

class CreatePostDto {
  @ApiProperty({ description: '帖子标题', example: '帖子标题1' })
  @IsNotEmpty({ message: '请输入标题' })
  title: string;
  @ApiProperty({ description: '帖子详情', example: '帖子内容1' })
  content: string;
}

@Controller('posts')
@ApiTags('帖子')
export class PostsController {
  constructor(
    @InjectModel(PostSchema) private readonly PostModel: ModelType<PostSchema>,
  ) {}

  @Get()
  @ApiOperation({ summary: '显示博客列表' })
  async index() {
    return await this.PostModel.find();
  }

  @Post()
  @ApiOperation({ summary: '创建帖子' })
  async create(@Body() CreatePostDto: CreatePostDto) {
    await this.PostModel.create(CreatePostDto);
    return {
      success: true,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: '博客详情' })
  async detail(@Param('id') id: string) {
    return await this.PostModel.findById(id);
  }

  @Put(':id')
  @ApiOperation({ summary: '编辑帖子' })
  async update(@Param('id') id: string, @Body() updatePost: CreatePostDto) {
    await this.PostModel.findByIdAndUpdate(id, updatePost);
    return {
      success: true,
    };
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除帖子' })
  async remove(@Param('id') id: string) {
    await this.PostModel.findByIdAndDelete(id);
    return {
      success: true,
    };
  }
}
