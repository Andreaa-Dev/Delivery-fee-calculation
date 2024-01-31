import { CalculationRule } from "../../feeCalculationRules/types";
import {
  DayInWeek,
  DeliveryInformation,
  RushHourSchedule,
} from "../../types/type";
import { UseCase } from "../UseCase";

export class DeliveryFeeCalculator
  implements UseCase<DeliveryInformation, number>
{
  private calculationRules: CalculationRule[];
  private maximumFee: number;
  private rushHoursSchedule: RushHourSchedule;

  constructor(
    calculationRules: CalculationRule[],
    maximumFee: number,
    rushHoursSchedule: RushHourSchedule
  ) {
    this.calculationRules = calculationRules;
    this.maximumFee = maximumFee;
    this.rushHoursSchedule = rushHoursSchedule;
  }

  execute(deliveryInformation: DeliveryInformation) {
    let totalFee = 0;
    for (let i = 0; i < this.calculationRules.length; i++) {
      const currentRule = this.calculationRules[i];
      const { surCharge, isFreeDelivery } = currentRule.calculate({
        deliveryInformation,
      });

      if (isFreeDelivery) {
        totalFee = 0;
        break;
      }
      totalFee = totalFee + surCharge;
    }

    totalFee = this.calculateRushHourTotalFee(totalFee, deliveryInformation);
    totalFee = this.checkDeliveryFee(totalFee);

    return totalFee;
  }

  private checkDeliveryFee(currentFee: number) {
    if (currentFee >= this.maximumFee) {
      return this.maximumFee;
    }
    return currentFee;
  }

  private calculateRushHourTotalFee(
    currentFee: number,
    deliveryInfo: DeliveryInformation
  ) {
    const { time } = deliveryInfo;
    const currentDay = time.getDay();
    const rushHours = this.rushHoursSchedule[currentDay as DayInWeek];

    if (!rushHours) {
      return currentFee;
    }
    const { start, end, multiplier } = rushHours;

    const startTime = this.toDate(time, start);
    const endTime = this.toDate(time, end);

    if (time >= startTime && time <= endTime) {
      return currentFee * multiplier;
    }

    return currentFee;
  }

  private toDate(chosenDeliveryTime: Date, time: string) {
    const [hour, minute] = time.split(":").map(Number);
    const date = new Date(chosenDeliveryTime);
    date.setHours(hour, minute);
    return date;
  }
}
