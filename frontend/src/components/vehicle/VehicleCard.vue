
<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import type { Vehicle } from '../../types';

defineProps<{ vehicle: Vehicle }>();

const { t } = useI18n();
</script>

<template>
  <RouterLink
      :to="`/vozila/${vehicle.slug}`"
      class="vehicle-card"
  >
    <div class="vehicle-photo">
      <img
          v-if="vehicle.images?.[0]"
          :src="vehicle.images[0].url"
          :alt="vehicle.name"
      />

      <span v-else class="image-placeholder">
        GG RENT
      </span>

      <span class="photo-label">
        {{ t('vehicles.availableOnRequest') }}
      </span>
    </div>

    <div class="vehicle-card-body">
      <div class="eyebrow">
        {{ vehicle.brand }} · {{ vehicle.type }}
      </div>

      <h3>{{ vehicle.name }}</h3>

      <div class="vehicle-meta">
        <span>{{ vehicle.engine }}</span>
        <span>{{ vehicle.transmission }}</span>
        <span>
          {{ vehicle.seats }} {{ t('vehicles.seats') }}
        </span>
      </div>

      <div class="vehicle-bottom">
        <div>
          <strong>
            {{ Number(vehicle.price_per_day).toFixed(0) }} KM
          </strong>
          <small> / {{ t('vehicles.perDay') }}</small>
        </div>

        <span class="arrow">↗</span>
      </div>
    </div>
  </RouterLink>
</template>
