import { DeliveryInformation } from "../../types/type";
import { MissingValueSurCharge } from "./MissingValueSurCharge";

describe("ExtraDistanceSurCharge", () => {
  let missingValueSurCharge: MissingValueSurCharge;

  beforeEach(() => {
    missingValueSurCharge = new MissingValueSurCharge();
  });

  it("returns 1.1 euros surcharge when cart value is 8.9 euros", () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 8.9,
      deliveryDistanceKilometer: 0.5,
      numberOfItems: 4,
      time: new Date(),
    };

    const surcharge = missingValueSurCharge.calculate({ deliveryInformation });

    expect(surcharge).toEqual({
      surCharge: 1.1,
      isFreeDelivery: false,
    });
  });

  it("returns 0 euros surcharge when cart value is 10 euros", () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 10,
      deliveryDistanceKilometer: 0.5,
      numberOfItems: 4,
      time: new Date(),
    };

    const surcharge = missingValueSurCharge.calculate({ deliveryInformation });

    expect(surcharge).toEqual({
      surCharge: 0,
      isFreeDelivery: false,
    });
  });

  it("returns 5.2 euros surcharge when cart value is 4.8 euros", () => {
    const deliveryInformation: DeliveryInformation = {
      cartValue: 4.8,
      deliveryDistanceKilometer: 0.5,
      numberOfItems: 4,
      time: new Date(),
    };

    const surcharge = missingValueSurCharge.calculate({ deliveryInformation });

    expect(surcharge).toEqual({
      surCharge: 5.2,
      isFreeDelivery: false,
    });
  });
});
