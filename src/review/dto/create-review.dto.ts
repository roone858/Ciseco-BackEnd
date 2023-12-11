// create-review.dto.ts

export class CreateReviewDto {
  readonly user_id: string;
  readonly product_id: string;
  readonly text: string;
  readonly rate: number;
}
