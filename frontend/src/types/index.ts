export interface Vehicle {
  id: number;
  slug: string;
  name: string;
  type: string;
  brand: string;
  model: string;
  engine: string;
  year: number;
  fuel: string;
  transmission: string;
  seats: number;
  mileage: number;
  description: string;
  price_per_day: number;
  images: { id: number; url: string; is_primary: boolean }[];
  price_rules: {
    id: number;
    min_days: number;
    max_days: number | null;
    discount_percent: number;
  }[];
}
export interface BusyRange {
  start: string;
  end: string;
  type: string;
}
export interface Quote {
  days: number;
  price_per_day: number;
  discount_percent: number;
  daily_discounted: number;
  total: number;
}
export interface BookingPayload {
  vehicle_id: number;
  pickup_date: string;
  return_date: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  notes: string;
}
