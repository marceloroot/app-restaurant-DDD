export type CalculateProps = {
  price: number;
};
export class CaculateDiscont {
  constructor(private props: CalculateProps) {}
  get price(): number {
    return this.props.price;
  }

  calculatePercentageDiscount(discontPercent: number): number {
    const discountAmount = this.price * (discontPercent / 100);
    const priceWhihtDisconted = this.price - discountAmount;
    return priceWhihtDisconted;
  }

  calculateFixedDiscount(): number {
    const discountAmount = this.price - 10;
    return discountAmount;
  }
}
