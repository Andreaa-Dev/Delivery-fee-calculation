import { CalculationInput, CalculationRule } from '../types'

export const meters = 1
export const kilometers = 1000 * meters

export class ExtraDistanceSurCharge implements CalculationRule {
  private baseDistanceMeter: number
  private additionalDistanceMeter: number
  private baseFee: number
  private extraFeePerAdditionalDistance: number

  constructor() {
    this.baseDistanceMeter = 1 * kilometers
    this.baseFee = 2
    this.additionalDistanceMeter = 0.5 * kilometers
    this.extraFeePerAdditionalDistance = 1
  }

  calculate({ deliveryInformation }: CalculationInput) {
    const { deliveryDistance } = deliveryInformation
    if (deliveryDistance <= this.baseDistanceMeter) {
      return { surCharge: this.baseFee, isFreeDelivery: false }
    }
    const overflowDistance = deliveryDistance - this.baseDistanceMeter
    const overflowTimes = Math.ceil(
      overflowDistance / this.additionalDistanceMeter
    )
    return {
      surCharge:
        this.baseFee + overflowTimes * this.extraFeePerAdditionalDistance,
      isFreeDelivery: false,
    }
  }
}
