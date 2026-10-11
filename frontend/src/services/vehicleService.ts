import { api } from './api';
import type { Vehicle, BusyRange, Quote } from '../types';

export const vehicleService = {
  async all(): Promise<Vehicle[]> {
    return (await api.get('/vehicles')).data.data;
  },

  async get(slug: string): Promise<Vehicle> {
    return (await api.get(`/vehicles/${encodeURIComponent(slug)}`)).data.data;
  },

  async availability(slug: string): Promise<BusyRange[]> {
    return (await api.get(`/vehicles/${encodeURIComponent(slug)}/availability`)).data.data;
  },

  async quote(slug: string, from: string, to: string): Promise<Quote> {
    return (await api.get(`/vehicles/${encodeURIComponent(slug)}/quote`, { params: { from, to } }))
      .data.data;
  },
};
