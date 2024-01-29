import { CalculationInput, CalculationRule } from '../types'

export class MissingValueSurCharge implements CalculationRule {
  private minimumCartValue: number

  constructor() {
    this.minimumCartValue = 10
  }

  calculate({ deliveryInformation }: CalculationInput) {
    const { cartValue } = deliveryInformation

    if (cartValue < this.minimumCartValue) {
      return {
        surCharge: Number((this.minimumCartValue - cartValue).toFixed(1)),
        isFreeDelivery: false,
      }
    }
    return { surCharge: 0, isFreeDelivery: false }
  }
}
