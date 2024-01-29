import { DeliveryInformation } from '../../types/type'
import { meters } from '../ExtraDistanceSurCharge/ExtraDistanceSurCharge'
import { FreeDeliveryValue } from './FreeDeliveryValue'

describe('ExtraDistanceSurCharge', () => {
  let freeDeliveryValue: FreeDeliveryValue

  beforeEach(() => {
    freeDeliveryValue = new FreeDeliveryValue()
  })

  it('returns free delivery when cart value is 201 euros', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 201,
      deliveryDistance: 500 * meters,
      numberOfItems: 4,
      time: new Date(),
    }

    const surcharge = freeDeliveryValue.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 0,
      isFreeDelivery: true,
    })
  })

  it('returns free delivery when cart value is 200 euros', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 200,
      deliveryDistance: 500 * meters,
      numberOfItems: 4,
      time: new Date(),
    }

    const surcharge = freeDeliveryValue.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 0,
      isFreeDelivery: true,
    })
  })

  it('returns not free delivery when cart value is under 200 euros', () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 199,
      deliveryDistance: 500 * meters,
      numberOfItems: 4,
      time: new Date(),
    }

    const surcharge = freeDeliveryValue.calculate({ deliveryInformation })

    expect(surcharge).toEqual({
      surCharge: 0,
      isFreeDelivery: false,
    })
  })
})
