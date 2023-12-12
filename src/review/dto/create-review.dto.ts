// create-review.dto.ts

export class CreateReviewDto {
  readonly user: string;
  readonly product: string;
  readonly text: string;
  readonly rate: number;
}
