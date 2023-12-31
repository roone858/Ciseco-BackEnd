import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  readonly userId: string;

  @IsString()
  readonly productId: string;

  @IsString()
  readonly text: string;

  @IsNumber()
  @Min(1, { message: 'Rate must be at least 1' })
  @Max(5, { message: 'Rate must not exceed 5' })
  readonly rate: number;
}
