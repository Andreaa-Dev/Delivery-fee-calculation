import { meters } from '../../feeCalculationRules/ExtraDistanceSurCharge/ExtraDistanceSurCharge'
import { CalculationRule } from '../../feeCalculationRules/types'
import { DayInWeek } from '../../types/type'
import { DeliveryFeeCalculator } from './DeliveryFeeCalculator'

describe('DeliveryFeeCalculator', () => {
  describe('free delivery', () => {
    it('returns 0 when one of the calculation rule indicates free delivery', () => {
      const rules: CalculationRule[] = [
        {
          calculate: () => ({
            isFreeDelivery: true,
            surCharge: 0,
          }),
        },
        {
          calculate: () => ({
            isFreeDelivery: false,
            surCharge: 10,
          }),
        },
      ]
      const deliveryInfo = {
        cartValue: 100,
        deliveryDistance: 200 * meters,
        numberOfItems: 5,
        time: new Date(),
      }
      const maximumFee = 20
      const rushHours = {}
      const deliveryFeeCalculator = new DeliveryFeeCalculator(
        rules,
        maximumFee,
        rushHours
      )

      const fee = deliveryFeeCalculator.execute(deliveryInfo)
      expect(fee).toEqual(0)
    })

    it('returns 0 when in rush hours but rule indicates free delivery', () => {
      // Monday
      const testDate = new Date('2024-01-29')
      testDate.setHours(10)
      testDate.setMinutes(30)

      jest.useFakeTimers().setSystemTime(testDate)

      const rules: CalculationRule[] = [
        {
          calculate: () => ({
            isFreeDelivery: true,
            surCharge: 10,
          }),
        },
      ]
      const deliveryInfo = {
        cartValue: 100,
        deliveryDistance: 200 * meters,
        numberOfItems: 5,
        time: new Date(),
      }
      const maximumFee = 20
      const rushHours = {
        [DayInWeek.Monday]: {
          start: '10:00',
          end: '11:00',
          multiplier: 2,
        },
      }
      const deliveryFeeCalculator = new DeliveryFeeCalculator(
        rules,
        maximumFee,
        rushHours
      )

      const fee = deliveryFeeCalculator.execute(deliveryInfo)
      expect(fee).toEqual(0)
    })
  })

  describe('returns delivery fee', () => {
    it('returns 0 with no calculation rule and no rush hours', () => {
      const rules: CalculationRule[] = []
      const deliveryInfo = {
        cartValue: 100,
        deliveryDistance: 200 * meters,
        numberOfItems: 5,
        time: new Date(),
      }
      const maximumFee = 20
      const rushHours = {}
      const deliveryFeeCalculator = new DeliveryFeeCalculator(
        rules,
        maximumFee,
        rushHours
      )

      const fee = deliveryFeeCalculator.execute(deliveryInfo)
      expect(fee).toEqual(0)
    })

    it('returns 10 when not rush hours and not free delivery', () => {
      const rules: CalculationRule[] = [
        {
          calculate: () => ({
            isFreeDelivery: false,
            surCharge: 10,
          }),
        },
      ]
      const deliveryInfo = {
        cartValue: 100,
        deliveryDistance: 200 * meters,
        numberOfItems: 5,
        time: new Date(),
      }
      const maximumFee = 20
      const rushHours = {}
      const deliveryFeeCalculator = new DeliveryFeeCalculator(
        rules,
        maximumFee,
        rushHours
      )

      const fee = deliveryFeeCalculator.execute(deliveryInfo)
      expect(fee).toEqual(10)
    })

    it('returns 15 when not rush hours and not free delivery', () => {
      const rules: CalculationRule[] = [
        {
          calculate: () => ({
            isFreeDelivery: false,
            surCharge: 10,
          }),
        },
        {
          calculate: () => ({
            isFreeDelivery: false,
            surCharge: 5,
          }),
        },
      ]
      const deliveryInfo = {
        cartValue: 100,
        deliveryDistance: 200 * meters,
        numberOfItems: 5,
        time: new Date(),
      }
      const maximumFee = 20
      const rushHours = {}
      const deliveryFeeCalculator = new DeliveryFeeCalculator(
        rules,
        maximumFee,
        rushHours
      )

      const fee = deliveryFeeCalculator.execute(deliveryInfo)
      expect(fee).toEqual(15)
    })
  })

  describe('rush hours', () => {
    it('returns 20 when in rush hours and not free delivery', () => {
      // Monday
      const testDate = new Date('2024-01-29')
      testDate.setHours(10)
      testDate.setMinutes(30)

      jest.useFakeTimers().setSystemTime(testDate)

      const rules: CalculationRule[] = [
        {
          calculate: () => ({
            isFreeDelivery: false,
            surCharge: 10,
          }),
        },
      ]
      const deliveryInfo = {
        cartValue: 100,
        deliveryDistance: 200 * meters,
        numberOfItems: 5,
        time: new Date(),
      }
      const maximumFee = 20
      const rushHours = {
        [DayInWeek.Monday]: {
          start: '10:00',
          end: '11:00',
          multiplier: 2,
        },
      }
      const deliveryFeeCalculator = new DeliveryFeeCalculator(
        rules,
        maximumFee,
        rushHours
      )

      const fee = deliveryFeeCalculator.execute(deliveryInfo)
      expect(fee).toEqual(20)
    })
  })

  describe('maximum fee', () => {
    it('returns 20 when fee is greater than maximum fee', () => {
      const rules: CalculationRule[] = [
        {
          calculate: () => ({
            isFreeDelivery: false,
            surCharge: 10,
          }),
        },
        {
          calculate: () => ({
            isFreeDelivery: false,
            surCharge: 15,
          }),
        },
      ]
      const deliveryInfo = {
        cartValue: 100,
        deliveryDistance: 200 * meters,
        numberOfItems: 5,
        time: new Date(),
      }
      const maximumFee = 20
      const rushHours = {}
      const deliveryFeeCalculator = new DeliveryFeeCalculator(
        rules,
        maximumFee,
        rushHours
      )

      const fee = deliveryFeeCalculator.execute(deliveryInfo)
      expect(fee).toEqual(20)
    })
  })
})
