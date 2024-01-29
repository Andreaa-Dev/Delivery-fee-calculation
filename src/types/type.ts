export type DeliveryInformation = {
  cartValue: number
  deliveryDistance: number
  numberOfItems: number
  time: Date
}

export enum DayInWeek {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
}

export type RushHourSchedule = {
  [day in DayInWeek]?: {
    start: string
    end: string
    multiplier: number
  }
}
