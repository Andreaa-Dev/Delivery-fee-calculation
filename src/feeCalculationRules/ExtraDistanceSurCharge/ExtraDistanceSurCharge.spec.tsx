import { ExtraDistanceSurCharge, meters } from './ExtraDistanceSurCharge'
import { DeliveryInformation } from '../../types/type'

describe('ExtraDistanceSurCharge', () => {
  let extraDistanceSurCharge: ExtraDistanceSurCharge

  beforeEach(() => {
    extraDistanceSurCharge = new ExtraDistanceSurCharge()
  })

  it('returns 2 euros for surcharge when delivery distance is less than 1km', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 50,
      deliveryDistance: 500 * meters,
      numberOfItems: 3,
      time: new Date(),
    }

    const surcharge = extraDistanceSurCharge.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 2,
      isFreeDelivery: false,
    })
  })

  it('returns 2 + 1 euros for surcharge when delivery distance is 1500m', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 50,
      deliveryDistance: 1500 * meters,
      numberOfItems: 3,
      time: new Date(),
    }

    const surcharge = extraDistanceSurCharge.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 3,
      isFreeDelivery: false,
    })
  })

  it('returns 2 + 2 euros for surcharge when delivery distance is 1501m', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 50,
      deliveryDistance: 1501 * meters,
      numberOfItems: 3,
      time: new Date(),
    }

    const surcharge = extraDistanceSurCharge.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 4,
      isFreeDelivery: false,
    })
  })
})
