<script setup lang="ts">
import { onMounted } from 'vue';
import { useVehiclesStore } from '../stores/vehicles';
import VehicleCard from '../components/vehicle/VehicleCard.vue';
const store = useVehiclesStore();
onMounted(() => store.load());
</script>
<template>
  <section class="page-hero container">
    <div class="eyebrow">GG RENT FLEET</div>
    <h1>Naša vozila<span class="accent">.</span></h1>
    <p class="muted">Pronađite idealno vozilo za svoje putovanje.</p>
  </section>
  <section class="container section">
    <p v-if="store.loading">Učitavanje vozila...</p>
    <p
      v-if="store.error"
      class="alert error"
    >
      {{ store.error }}
    </p>
    <div class="vehicle-grid">
      <VehicleCard
        v-for="v in store.items"
        :key="v.id"
        :vehicle="v"
      />
    </div>
  </section>
</template>
