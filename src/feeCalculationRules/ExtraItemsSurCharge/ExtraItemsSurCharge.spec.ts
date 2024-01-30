import { DeliveryInformation } from "../../types/type";
import { ExtraItemsSurCharge } from "./ExtraItemsSurCharge";

describe("ExtraDistanceSurCharge", () => {
  let extraItemsSurCharge: ExtraItemsSurCharge;

  beforeEach(() => {
    extraItemsSurCharge = new ExtraItemsSurCharge();
  });

  it("returns no surcharge when number of items is 4", () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 50,
      deliveryDistanceKilometer: 0.5,
      numberOfItems: 4,
      time: new Date(),
    };

    const surcharge = extraItemsSurCharge.calculate({ deliveryInformation });

    expect(surcharge).toEqual({
      surCharge: 0,
      isFreeDelivery: false,
    });
  });

  it("returns 0.5 euros surcharge when number of items is 5", () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 50,
      deliveryDistanceKilometer: 0.5,
      numberOfItems: 5,
      time: new Date(),
    };

    const surcharge = extraItemsSurCharge.calculate({ deliveryInformation });

    expect(surcharge).toEqual({
      surCharge: 0.5,
      isFreeDelivery: false,
    });
  });

  it("returns 3 euros surcharge when number of items is 10", () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 50,
      deliveryDistanceKilometer: 0.5,
      numberOfItems: 10,
      time: new Date(),
    };

    const surcharge = extraItemsSurCharge.calculate({ deliveryInformation });

    expect(surcharge).toEqual({
      surCharge: 3,
      isFreeDelivery: false,
    });
  });

  it("returns 5.7 euros surcharge when number of items is 13", () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 50,
      deliveryDistanceKilometer: 0.5,
      numberOfItems: 13,
      time: new Date(),
    };

    const surcharge = extraItemsSurCharge.calculate({ deliveryInformation });

    expect(surcharge).toEqual({
      surCharge: 5.7,
      isFreeDelivery: false,
    });
  });

  it("returns 6.2 euros surcharge when number of items is 14", () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 50,
      deliveryDistanceKilometer: 0.5,
      numberOfItems: 14,
      time: new Date(),
    };

    const surcharge = extraItemsSurCharge.calculate({ deliveryInformation });

    expect(surcharge).toEqual({
      surCharge: 6.2,
      isFreeDelivery: false,
    });
  });
});
