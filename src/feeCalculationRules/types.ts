import { DeliveryInformation } from '../types/type'

export type CalculationInput = {
  deliveryInformation: DeliveryInformation
}

export interface CalculationRule {
  calculate(input: CalculationInput): {
    surCharge: number
    isFreeDelivery: boolean
  }
}
