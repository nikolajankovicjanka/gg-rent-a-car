<script setup lang="ts">
import { ref, computed } from 'vue';
import type { Vehicle } from '../../types';
const props = defineProps<{ vehicle: Vehicle }>();
const index = ref(0);
const active = computed(() => props.vehicle.images?.[index.value]);
</script>
<template>
  <div class="gallery">
    <div class="gallery-main">
      <img
        v-if="active"
        :src="active.url"
        :alt="vehicle.name"
      />
      <div
        v-else
        class="image-placeholder"
      >
        GG RENT · {{ vehicle.name }}
      </div>
      <div
        class="gallery-controls"
        v-if="vehicle.images.length > 1"
      >
        <button @click="index = (index - 1 + vehicle.images.length) % vehicle.images.length">
          ←</button
        ><span>{{ index + 1 }} / {{ vehicle.images.length }}</span
        ><button @click="index = (index + 1) % vehicle.images.length">→</button>
      </div>
    </div>
    <div
      class="gallery-thumbs"
      v-if="vehicle.images.length > 1"
    >
      <button
        v-for="(img, i) in vehicle.images"
        :key="img.id"
        :class="{ active: i === index }"
        @click="index = i"
      >
        <img
          :src="img.url"
          :alt="vehicle.name"
        />
      </button>
    </div>
  </div>
</template>
