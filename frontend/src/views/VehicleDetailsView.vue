
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

import { vehicleService } from '../services/vehicleService';
import VehicleGallery from '../components/vehicle/VehicleGallery.vue';
import VehicleSpecs from '../components/vehicle/VehicleSpecs.vue';
import BookingForm from '../components/booking/BookingForm.vue';

import type { Vehicle } from '../types';

const route = useRoute();

const vehicle = ref<Vehicle | null>(null);
const error = ref('');
const loading = ref(false);

let requestId = 0;

async function load() {
  const currentRequest = ++requestId;

  loading.value = true;
  error.value = '';
  vehicle.value = null;

  try {
    const result = await vehicleService.get(
        String(route.params.slug)
    );

    if (currentRequest !== requestId) return;

    vehicle.value = result;
  } catch {
    if (currentRequest !== requestId) return;

    error.value = 'Vozilo nije pronađeno.';
  } finally {
    if (currentRequest === requestId) {
      loading.value = false;
    }
  }
}

watch(
    () => route.params.slug,
    load,
    { immediate: true }
);
</script>

<template>
  <div class="vehicle-details-page">
    <section class="page-hero container vehicle-details-hero">
      <RouterLink
          to="/vozila"
          class="text-link vehicle-back-link"
      >
        ← Sva vozila
      </RouterLink>

      <template v-if="vehicle">
        <div class="eyebrow vehicle-details-eyebrow">
          {{ vehicle.brand }} / {{ vehicle.type }}
        </div>

        <h1 class="vehicle-details-title">
          {{ vehicle.name }}
        </h1>

        <p class="muted vehicle-details-description">
          {{ vehicle.description }}
        </p>
      </template>
    </section>

    <section
        v-if="vehicle"
        class="container details-layout section vehicle-details-layout"
    >
      <div class="vehicle-details-main">
        <div class="vehicle-gallery-wrapper">
          <VehicleGallery :vehicle="vehicle" />
        </div>

        <div class="vehicle-details-information">
          <h2>Detalji vozila</h2>

          <VehicleSpecs :vehicle="vehicle" />

          <p class="muted">
            {{ vehicle.description }}
          </p>
        </div>
      </div>

      <div class="vehicle-booking-wrapper">
        <BookingForm :initial-vehicle-id="vehicle.id" />
      </div>
    </section>

    <div
        v-else-if="loading"
        class="container vehicle-details-state"
    >
      <p class="muted">Učitavanje vozila...</p>
    </div>

    <div
        v-else-if="error"
        class="container vehicle-details-state"
    >
      <p class="alert error">
        {{ error }}
      </p>
    </div>
  </div>
</template>

<style scoped>
.vehicle-details-page {
  width: 100%;
  min-width: 0;
}

.vehicle-details-hero {
  min-width: 0;
}

.vehicle-back-link {
  display: inline-flex;
  align-items: center;
  max-width: 100%;
}

.vehicle-details-title {
  max-width: 100%;
  overflow-wrap: anywhere;
}

.vehicle-details-description {
  max-width: 720px;
  overflow-wrap: anywhere;
}

.vehicle-details-layout {
  min-width: 0;
}

.vehicle-details-main,
.vehicle-booking-wrapper,
.vehicle-gallery-wrapper,
.vehicle-details-information {
  min-width: 0;
  max-width: 100%;
}

.vehicle-gallery-wrapper {
  width: 100%;
}

.vehicle-details-state {
  padding-top: 24px;
  padding-bottom: 48px;
}

@media (max-width: 768px) {
  .vehicle-details-hero {
    padding-top: 30px;
    padding-bottom: 0;
  }

  .vehicle-back-link {
    margin-bottom: 20px;
    font-size: 13px;
  }

  .vehicle-details-eyebrow {
    margin-bottom: 10px;
  }

  .vehicle-details-title {
    margin-top: 0;
    margin-bottom: 14px;
    font-size: clamp(28px, 8vw, 38px);
    line-height: 1.12;
    letter-spacing: -0.04em;
  }

  .vehicle-details-description {
    margin-top: 0;
    margin-bottom: 0;
    font-size: 14px;
    line-height: 1.7;
  }

  .vehicle-details-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr);
    gap: 28px;
    padding-top: 24px;
    padding-bottom: 48px;
  }

  .vehicle-details-main {
    width: 100%;
  }

  .vehicle-gallery-wrapper {
    width: 100%;
  }

  .vehicle-details-information {
    margin-top: 28px;
  }

  .vehicle-details-information h2 {
    margin-top: 0;
    margin-bottom: 18px;
    font-size: 24px;
    line-height: 1.2;
  }

  .vehicle-booking-wrapper {
    width: 100%;
  }
}

@media (max-width: 380px) {
  .vehicle-details-title {
    font-size: 28px;
  }

  .vehicle-details-layout {
    gap: 22px;
  }
}
</style>
