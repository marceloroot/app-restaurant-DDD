export class formatCurrency {
  constructor() {}

  execute(value: number): string {
    return `R$ ${Intl.NumberFormat("pt-BR", {
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(value)}`;
  }
}
