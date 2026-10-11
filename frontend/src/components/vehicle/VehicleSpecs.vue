<script setup lang="ts">
import type { Vehicle } from '../../types';
defineProps<{ vehicle: Vehicle }>();
</script>
<template>
  <div class="specs">
    <div>
      <small>Motor</small><strong>{{ vehicle.engine }}</strong>
    </div>
    <div>
      <small>Gorivo</small><strong>{{ vehicle.fuel }}</strong>
    </div>
    <div>
      <small>Mjenjač</small><strong>{{ vehicle.transmission }}</strong>
    </div>
    <div>
      <small>Godište</small><strong>{{ vehicle.year }}</strong>
    </div>
    <div>
      <small>Kilometraža</small
      ><strong>{{ Number(vehicle.mileage).toLocaleString('de-DE') }} km</strong>
    </div>
    <div>
      <small>Sjedišta</small><strong>{{ vehicle.seats }}</strong>
    </div>
  </div>
</template>
