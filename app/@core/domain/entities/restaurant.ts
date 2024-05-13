export type RestauranttProps = {
  id: string;
  name: string;
  imageUrl: string;
  deliveryFee: number;
  deliveryTimeMinutes: number;
};

export class Restaurant {
  constructor(private props: RestauranttProps) {}
  get id() {
    return this.props.id;
  }
  get name() {
    return this.props.name;
  }
  get imageUrl() {
    return this.props.imageUrl;
  }
  get deliveryFee() {
    return this.props.deliveryFee;
  }
  get deliveryTimeMinutes() {
    return this.props.deliveryTimeMinutes;
  }
}
