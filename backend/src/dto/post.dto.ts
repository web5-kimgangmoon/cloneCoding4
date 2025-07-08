// import { Like, Post, ViewDate } from '@prisma/client';
// import {
//   IsDate,
//   IsInt,
//   IsOptional,
//   IsPositive,
//   IsString,
//   Length,
// } from 'class-validator';

// export class CreatePostDto {
//   @IsInt()
//   @IsPositive()
//   id: number;

//   @IsInt()
//   @IsPositive()
//   writerId: number;

//   @IsInt()
//   @IsPositive()
//   @IsOptional()
//   replyId?: number;

//   @IsString()
//   @Length(0, 3000)
//   content: string;

//   @IsString()
//   @Length(0, 1000)
//   @IsOptional()
//   imgLink?: string;

//   @IsInt()
//   @IsPositive()
//   viewCnt: number;

//   @IsDate()
//   createdAt: Date;

//   @IsDate()
//   updatedAt: Date;

//   //   Like: Like[];
//   //   ViewDate: ViewDate[];
//   //   repliedPost: Post[];
// }
