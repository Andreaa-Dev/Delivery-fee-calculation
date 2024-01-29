import { CalculationInput, CalculationRule } from '../types'

export class FreeDeliveryValue implements CalculationRule {
  private freeDeliveryCartValue: number

  constructor() {
    this.freeDeliveryCartValue = 200
  }

  calculate({ deliveryInformation }: CalculationInput) {
    if (deliveryInformation.cartValue >= this.freeDeliveryCartValue) {
      return { surCharge: 0, isFreeDelivery: true }
    }
    return { surCharge: 0, isFreeDelivery: false }
  }
}
