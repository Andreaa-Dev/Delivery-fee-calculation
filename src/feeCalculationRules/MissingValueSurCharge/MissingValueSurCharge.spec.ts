import { DeliveryInformation } from '../../types/type'
import { meters } from '../ExtraDistanceSurCharge/ExtraDistanceSurCharge'
import { MissingValueSurCharge } from './MissingValueSurCharge'

describe('ExtraDistanceSurCharge', () => {
  let missingValueSurCharge: MissingValueSurCharge

  beforeEach(() => {
    missingValueSurCharge = new MissingValueSurCharge()
  })

  it('returns 1.1 euros surcharge when cart value is 8.9 euros', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 8.9,
      deliveryDistance: 500 * meters,
      numberOfItems: 4,
      time: new Date(),
    }

    const surcharge = missingValueSurCharge.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 1.1,
      isFreeDelivery: false,
    })
  })

  it('returns 0 euros surcharge when cart value is 10 euros', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 10,
      deliveryDistance: 500 * meters,
      numberOfItems: 4,
      time: new Date(),
    }

    const surcharge = missingValueSurCharge.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 0,
      isFreeDelivery: false,
    })
  })

  it('returns 5.2 euros surcharge when cart value is 4.8 euros', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 4.8,
      deliveryDistance: 500 * meters,
      numberOfItems: 4,
      time: new Date(),
    }

    const surcharge = missingValueSurCharge.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 5.2,
      isFreeDelivery: false,
    })
  })
})
