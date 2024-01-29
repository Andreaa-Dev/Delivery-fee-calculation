import { ExtraDistanceSurCharge } from '../feeCalculationRules/ExtraDistanceSurCharge/ExtraDistanceSurCharge'
import { ExtraItemsSurCharge } from '../feeCalculationRules/ExtraItemsSurCharge/ExtraItemsSurCharge'
import { FreeDeliveryValue } from '../feeCalculationRules/FreeDeliveryValue/FreeDeliveryValue'
import { MissingValueSurCharge } from '../feeCalculationRules/MissingValueSurCharge/MissingValueSurCharge'
import { DayInWeek, RushHourSchedule } from '../types/type'
import { DeliveryFeeCalculator } from '../useCases/DeliveryFeeCalculator/DeliveryFeeCalculator'

const createDefaultFeeCalculator = (): DeliveryFeeCalculator => {
  const rules = [
    new FreeDeliveryValue(),
    new ExtraDistanceSurCharge(),
    new MissingValueSurCharge(),
    new ExtraItemsSurCharge(),
  ]
  const maximumFee = 15
  const rushHours: RushHourSchedule = {
    [DayInWeek.Friday]: {
      start: '15:00',
      end: '19:00',
      multiplier: 1.2,
    },
  }
  return new DeliveryFeeCalculator(rules, maximumFee, rushHours)
}

export default createDefaultFeeCalculator()
