import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Vehicle } from '../types';
import { vehicleService } from '../services/vehicleService';
export const useVehiclesStore = defineStore('vehicles', () => {
  const items = ref<Vehicle[]>([]),
    loading = ref(false),
    error = ref('');
  async function load() {
    loading.value = true;
    error.value = '';
    try {
      items.value = await vehicleService.all();
    } catch {
      error.value = 'Nije moguće učitati vozila. Provjerite da li je backend pokrenut.';
    } finally {
      loading.value = false;
    }
  }
  return { items, loading, error, load };
});
