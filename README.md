# Delivery Fee Calculator

The application is a calculation form where the user can enter information of the order and get the delivery fee.

[Deploy link](https://delivery-fee-calculation.vercel.app/)

![screenshot](./src/images/Screenshot.png)

## Run project and testing

- Install dependencies: `yarn` or `npm install`
- Start projects: `yarn start` or `npm run start`
- Run test: `yarn test` or `npm run test`

## Rules for calculating a delivery fee

1. If the cart value is less than 10€, a small order surcharge is added to the delivery price. The surcharge is the difference between the cart value and 10€. For example if the cart value is 8.90€, the surcharge will be 1.10€.

2. A delivery fee for the first 1000 meters (=1km) is 2€. If the delivery distance is longer than that, 1€ is added for every additional 500 meters that the courier needs to travel before reaching the destination. Even if the distance would be shorter than 500 meters, the minimum fee is always 1€.

- Example 1: If the delivery distance is 1499 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
- Example 2: If the delivery distance is 1500 meters, the delivery fee is: 2€ base fee + 1€ for the additional 500 m => 3€
- Example 3: If the delivery distance is 1501 meters, the delivery fee is: 2€ base fee + 1€ for the first 500 m + 1€ for the second 500 m => 4€

3. If the number of items is five or more, an additional 50 cent surcharge is added for each item above and including the fifth item. An extra "bulk" fee applies for more than 12 items of 1,20€

- Example 1: If the number of items is 4, no extra surcharge
- Example 2: If the number of items is 5, 50 cents surcharge is added
- Example 3: If the number of items is 10, 3€ surcharge (6 x 50 cents) is added
- Example 4: If the number of items is 13, 5,70€ surcharge is added ((9 \* 50 cents) + 1,20€)

4. The delivery fee can never be more than 15€, including possible surcharges.

5. The delivery is free (0€) when the cart value is equal or more than 100€.

6. During the Friday rush (3 - 7 PM UTC), the delivery fee (the total fee including possible surcharges) will be multiplied by 1.2x. However, the fee still cannot be more than the max (15€).
