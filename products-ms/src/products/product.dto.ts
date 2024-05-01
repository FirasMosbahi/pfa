import { IsNumber, IsPositive } from 'class-validator';

export class BuyProductDto {
  @IsNumber()
  @IsPositive()
  quantity: number;
}
  