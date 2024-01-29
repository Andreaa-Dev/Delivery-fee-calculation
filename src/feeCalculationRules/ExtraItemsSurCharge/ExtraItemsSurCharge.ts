import { CalculationInput, CalculationRule } from '../types'

export class ExtraItemsSurCharge implements CalculationRule {
  private baseItemNumber: number
  private maxItemNumber: number
  private bulkFee: number
  private baseSurCharge: number

  constructor() {
    this.baseItemNumber = 5
    this.maxItemNumber = 12
    this.bulkFee = 1.2
    this.baseSurCharge = 0.5
  }

  calculate({ deliveryInformation }: CalculationInput) {
    const { numberOfItems } = deliveryInformation

    let finalSurCharge = 0
    if (numberOfItems < this.baseItemNumber) {
      return { surCharge: 0, isFreeDelivery: false }
    }
    if (numberOfItems >= this.baseItemNumber) {
      const overFlowItems = numberOfItems - this.baseItemNumber
      const overFlowItemsIncludingTheBase = overFlowItems + 1
      finalSurCharge =
        finalSurCharge + this.baseSurCharge * overFlowItemsIncludingTheBase
    }
    if (numberOfItems > this.maxItemNumber) {
      finalSurCharge = finalSurCharge + this.bulkFee
    }
    return { surCharge: finalSurCharge, isFreeDelivery: false }
  }
}
