<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { vehicleService } from '../services/vehicleService';
import VehicleGallery from '../components/vehicle/VehicleGallery.vue';
import VehicleSpecs from '../components/vehicle/VehicleSpecs.vue';
import BookingForm from '../components/booking/BookingForm.vue';
import type { Vehicle } from '../types';
const route = useRoute(),
  vehicle = ref<Vehicle | null>(null),
  error = ref('');
async function load() {
  try {
    vehicle.value = await vehicleService.get(String(route.params.slug));
  } catch {
    error.value = 'Vozilo nije pronađeno.';
  }
}
watch(() => route.params.slug, load, { immediate: true });
</script>
<template>
  <section class="page-hero container">
    <RouterLink
      to="/vozila"
      class="text-link"
      >← Sva vozila</RouterLink
    ><template v-if="vehicle"
      ><div class="eyebrow">{{ vehicle.brand }} / {{ vehicle.type }}</div>
      <h1>{{ vehicle.name }}</h1>
      <p class="muted">{{ vehicle.description }}</p></template
    >
  </section>
  <section
    v-if="vehicle"
    class="container details-layout section"
  >
    <div>
      <VehicleGallery :vehicle="vehicle" />
      <h2>Detalji vozila</h2>
      <VehicleSpecs :vehicle="vehicle" />
      <p class="muted">{{ vehicle.description }}</p>
    </div>
    <BookingForm :initial-vehicle-id="vehicle.id" />
  </section>
  <p
    v-else
    class="container alert error"
  >
    {{ error }}
  </p>
</template>
