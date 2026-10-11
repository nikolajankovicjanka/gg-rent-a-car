<script setup lang="ts">
import { ref } from 'vue';
import { bookingService } from '../services/bookingService';
const number = ref(''),
  phone = ref(''),
  result = ref<any>(null),
  error = ref(''),
  loading = ref(false);
async function submit() {
  loading.value = true;
  error.value = '';
  result.value = null;
  try {
    result.value = await bookingService.track(number.value, phone.value);
  } catch {
    error.value = 'Rezervacija nije pronađena za unesene podatke.';
  } finally {
    loading.value = false;
  }
}
</script>
<template>
  <section class="page-hero container">
    <div class="eyebrow">STATUS REZERVACIJE</div>
    <h1>Pratite svoj upit.</h1>
    <p class="muted">Unesite broj rezervacije i telefon korišten prilikom slanja.</p>
  </section>
  <section class="container section">
    <form
      class="booking-panel tracking"
      @submit.prevent="submit"
    >
      <label class="field"
        >Broj rezervacije<input
          v-model="number"
          required
          placeholder="GG-2026-..." /></label
      ><label class="field"
        >Broj telefona<input
          v-model="phone"
          required
          placeholder="+387..." /></label
      ><button
        class="btn btn-primary full"
        :disabled="loading"
      >
        Provjeri status →
      </button>
      <p
        v-if="error"
        class="alert error"
      >
        {{ error }}
      </p>
      <div
        v-if="result"
        class="tracking-result"
      >
        <h2>{{ result.booking_number }}</h2>
        <p>Vozilo: {{ result.vehicle?.name }}</p>
        <p>Termin: {{ result.pickup_date }} — {{ result.return_date }}</p>
        <p>Ukupno: {{ result.total_price }} KM</p>
        <p>
          <strong>Status: {{ result.status }}</strong>
        </p>
      </div>
    </form>
  </section>
</template>
