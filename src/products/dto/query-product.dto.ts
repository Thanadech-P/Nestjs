import { ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';

export class QueryProductDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty({ example: 1000 })
  @IsOptional()
  @IsObject()
  priceSubunit: string;

}
