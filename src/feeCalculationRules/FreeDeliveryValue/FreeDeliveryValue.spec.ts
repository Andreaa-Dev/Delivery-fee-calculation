import { DeliveryInformation } from "../../types/type";
import { FreeDeliveryValue } from "./FreeDeliveryValue";

describe("ExtraDistanceSurCharge", () => {
  let freeDeliveryValue: FreeDeliveryValue;

  beforeEach(() => {
    freeDeliveryValue = new FreeDeliveryValue();
  });

  it("returns free delivery when cart value is 201 euros", () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 201,
      deliveryDistanceKilometer: 0.5,
      numberOfItems: 4,
      time: new Date(),
    };

    const surcharge = freeDeliveryValue.calculate({ deliveryInformation });

    expect(surcharge).toEqual({
      surCharge: 0,
      isFreeDelivery: true,
    });
  });

  it("returns free delivery when cart value is 200 euros", () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 200,
      deliveryDistanceKilometer: 0.5,
      numberOfItems: 4,
      time: new Date(),
    };

    const surcharge = freeDeliveryValue.calculate({ deliveryInformation });

    expect(surcharge).toEqual({
      surCharge: 0,
      isFreeDelivery: true,
    });
  });

  it("returns not free delivery when cart value is under 200 euros", () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 199,
      deliveryDistanceKilometer: 0.5,
      numberOfItems: 4,
      time: new Date(),
    };

    const surcharge = freeDeliveryValue.calculate({ deliveryInformation });

    expect(surcharge).toEqual({
      surCharge: 0,
      isFreeDelivery: false,
    });
  });
});
