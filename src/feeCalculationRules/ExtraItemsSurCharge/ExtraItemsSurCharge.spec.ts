import { DeliveryInformation } from '../../types/type'
import { meters } from '../ExtraDistanceSurCharge/ExtraDistanceSurCharge'
import { ExtraItemsSurCharge } from './ExtraItemsSurCharge'

describe('ExtraDistanceSurCharge', () => {
  let extraItemsSurCharge: ExtraItemsSurCharge

  beforeEach(() => {
    extraItemsSurCharge = new ExtraItemsSurCharge()
  })

  it('returns no surcharge when number of items is 4', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 50,
      deliveryDistance: 500 * meters,
      numberOfItems: 4,
      time: new Date(),
    }

    const surcharge = extraItemsSurCharge.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 0,
      isFreeDelivery: false,
    })
  })

  it('returns 0.5 euros surcharge when number of items is 5', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 50,
      deliveryDistance: 500 * meters,
      numberOfItems: 5,
      time: new Date(),
    }

    const surcharge = extraItemsSurCharge.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 0.5,
      isFreeDelivery: false,
    })
  })

  it('returns 3 euros surcharge when number of items is 10', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 50,
      deliveryDistance: 500 * meters,
      numberOfItems: 10,
      time: new Date(),
    }

    const surcharge = extraItemsSurCharge.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 3,
      isFreeDelivery: false,
    })
  })

  it('returns 5.7 euros surcharge when number of items is 13', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 50,
      deliveryDistance: 500 * meters,
      numberOfItems: 13,
      time: new Date(),
    }

    const surcharge = extraItemsSurCharge.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 5.7,
      isFreeDelivery: false,
    })
  })

  it('returns 6.2 euros surcharge when number of items is 14', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 50,
      deliveryDistance: 500 * meters,
      numberOfItems: 14,
      time: new Date(),
    }

    const surcharge = extraItemsSurCharge.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 6.2,
      isFreeDelivery: false,
    })
  })
})
