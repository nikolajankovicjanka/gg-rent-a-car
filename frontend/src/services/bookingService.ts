import { api } from './api';
import type { BookingPayload } from '../types';
export const bookingService = {
  async create(payload: BookingPayload) {
    return (await api.post('/bookings', payload)).data.data;
  },
  async track(booking_number: string, phone: string) {
    return (await api.post('/bookings/track', { booking_number, phone })).data.data;
  },
};
