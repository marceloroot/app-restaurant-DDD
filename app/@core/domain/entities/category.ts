export type CategoryProps = {
  id: string;
  name: string;
  imageUrl: string;
  createAt: Date;
};
export class Category {
  constructor(private props: CategoryProps) {}

  get id() {
    return this.props.id;
  }

  get name() {
    return this.props.name;
  }

  get imageUrl() {
    return this.props.imageUrl;
  }
  get createAt() {
    return this.props.createAt;
  }
}
