import { useState } from "react";
import { DeliveryInformation } from "../types/type";
import feeCalculator from "../util/feeCalculator";

export const useCalculate = () => {
  const [fee, setFee] = useState(0);

  const calculateFee = (deliveryInformation: DeliveryInformation) => {
    const fee = feeCalculator.execute(deliveryInformation);
    setFee(fee);
  };

  return { fee, calculateFee };
};
