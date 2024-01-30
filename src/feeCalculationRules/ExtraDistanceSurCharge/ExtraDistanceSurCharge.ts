import { CalculationInput, CalculationRule } from "../types";

export class ExtraDistanceSurCharge implements CalculationRule {
  private baseDistanceKilometer: number;
  private additionalDistanceKilometer: number;
  private baseFee: number;
  private extraFeePerAdditionalDistance: number;

  constructor() {
    this.baseDistanceKilometer = 1;
    this.baseFee = 2;
    this.additionalDistanceKilometer = 0.5;
    this.extraFeePerAdditionalDistance = 1;
  }

  calculate({ deliveryInformation }: CalculationInput) {
    const { deliveryDistanceKilometer } = deliveryInformation;
    if (deliveryDistanceKilometer <= this.baseDistanceKilometer) {
      return { surCharge: this.baseFee, isFreeDelivery: false };
    }
    const overflowDistance =
      deliveryDistanceKilometer - this.baseDistanceKilometer;
    const overflowTimes = Math.ceil(
      overflowDistance / this.additionalDistanceKilometer
    );
    return {
      surCharge:
        this.baseFee + overflowTimes * this.extraFeePerAdditionalDistance,
      isFreeDelivery: false,
    };
  }
}
