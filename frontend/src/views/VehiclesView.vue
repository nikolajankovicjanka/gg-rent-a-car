
<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVehiclesStore } from '../stores/vehicles';
import VehicleCard from '../components/vehicle/VehicleCard.vue';

const store = useVehiclesStore();
const { t } = useI18n();

onMounted(() => store.load());
</script>

<template>
  <section class="page-hero container">
    <div class="eyebrow">GG RENT FLEET</div>

    <h1>
      {{ t('vehicles.title') }}<span class="accent">.</span>
    </h1>

    <p class="muted">
      {{ t('vehicles.description') }}
    </p>
  </section>

  <section class="container section">
    <p v-if="store.loading">
      {{ t('vehicles.loading') }}
    </p>

    <p v-if="store.error" class="alert error">
      {{ store.error }}
    </p>

    <div class="vehicle-grid">
      <VehicleCard
          v-for="vehicle in store.items"
          :key="vehicle.id"
          :vehicle="vehicle"
      />
    </div>
  </section>
</template>
