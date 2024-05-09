import { CaculateDiscont } from "@/app/@core/domain/entities/calculate-disconted";

export class CalculatePercentage {
  async execute(price: number, discontPercent: number): Promise<number> {
    if (discontPercent == 0) return Promise.resolve(price);
    const discountCalculator = new CaculateDiscont({ price });
    const priceWhithDiscont =
      await discountCalculator.calculatePercentageDiscount(discontPercent);
    return Promise.resolve(priceWhithDiscont);
  }
}
