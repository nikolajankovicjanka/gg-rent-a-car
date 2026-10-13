
<script setup lang="ts">
import { onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { useVehiclesStore } from '../stores/vehicles';
import VehicleCard from '../components/vehicle/VehicleCard.vue';
import BookingForm from '../components/booking/BookingForm.vue';

const store = useVehiclesStore();
const { t } = useI18n();

onMounted(() => store.load());
</script>

<template>
  <section class="hero">
    <div class="container hero-grid">
      <div>
        <div class="eyebrow">GG RENT · VIP TRANSFER</div>

        <h1>
          {{ t('home.hero.title') }}<br />
          <em>{{ t('home.hero.highlight') }}</em>
        </h1>

        <p>{{ t('home.hero.description') }}</p>

        <div class="hero-actions">
          <a class="btn btn-primary" href="#booking">
            {{ t('home.hero.checkAvailability') }} ↗
          </a>

          <RouterLink class="btn btn-outline" to="/vozila">
            {{ t('home.hero.viewVehicles') }}
          </RouterLink>
        </div>

        <div class="hero-stats">
          <span>
            <strong>24/7</strong>
            <small>{{ t('home.stats.onlineInquiries') }}</small>
          </span>

          <span>
            <strong>100%</strong>
            <small>{{ t('home.stats.transparentPricing') }}</small>
          </span>

          <span>
            <strong>VIP</strong>
            <small>{{ t('home.stats.premiumService') }}</small>
          </span>
        </div>
      </div>

      <div class="hero-visual">
        <img
            v-if="store.items[0]?.images?.[0]"
            :src="store.items[0].images[0].url"
            :alt="t('home.hero.vehicleAlt')"
        />

        <img
            v-else
            src="/images/original-2.jpg"
            :alt="t('home.hero.vehicleAlt')"
        />

        <span class="hero-overlay">
          {{ t('home.hero.overlay') }}
        </span>
      </div>
    </div>
  </section>

  <section class="section container">
    <div class="section-heading">
      <div>
        <div class="eyebrow">
          {{ t('home.fleet.eyebrow') }}
        </div>

        <h2>{{ t('home.fleet.title') }}</h2>
      </div>

      <RouterLink to="/vozila" class="text-link">
        {{ t('home.fleet.allVehicles') }} ↗
      </RouterLink>
    </div>

    <p v-if="store.error" class="alert error">
      {{ store.error }}
    </p>

    <div class="vehicle-grid">
      <VehicleCard
          v-for="vehicle in store.items.slice(0, 3)"
          :key="vehicle.id"
          :vehicle="vehicle"
      />
    </div>
  </section>

  <section
      id="booking"
      class="section booking-section"
  >
    <div class="container booking-layout">
      <div>
        <div class="eyebrow">
          {{ t('home.booking.eyebrow') }}
        </div>

        <h2>
          {{ t('home.booking.title') }}<br />
          <em>{{ t('home.booking.highlight') }}</em>
        </h2>

        <p class="muted">
          {{ t('home.booking.description') }}
        </p>

        <div class="steps">
          <div>
            <b>01</b>
            <span>
              {{ t('home.booking.steps.vehicle') }}
            </span>
          </div>

          <div>
            <b>02</b>
            <span>
              {{ t('home.booking.steps.calendar') }}
            </span>
          </div>

          <div>
            <b>03</b>
            <span>
              {{ t('home.booking.steps.inquiry') }}
            </span>
          </div>

          <div>
            <b>04</b>
            <span>
              {{ t('home.booking.steps.confirmation') }}
            </span>
          </div>
        </div>
      </div>

      <BookingForm />
    </div>
  </section>

  <section class="section container">
    <div class="eyebrow">
      {{ t('home.faq.eyebrow') }}
    </div>

    <h2>{{ t('home.faq.title') }}</h2>

    <div class="faq">
      <details>
        <summary>
          {{ t('home.faq.account.question') }}
        </summary>

        <p>
          {{ t('home.faq.account.answer') }}
        </p>
      </details>

      <details>
        <summary>
          {{ t('home.faq.confirmation.question') }}
        </summary>

        <p>
          {{ t('home.faq.confirmation.answer') }}
        </p>
      </details>

      <details>
        <summary>
          {{ t('home.faq.whatsapp.question') }}
        </summary>

        <p>
          {{ t('home.faq.whatsapp.answer') }}
        </p>
      </details>
    </div>
  </section>
</template>
