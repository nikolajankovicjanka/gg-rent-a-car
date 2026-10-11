<script setup lang="ts">
import { onMounted } from 'vue';
import { useVehiclesStore } from '../stores/vehicles';
import VehicleCard from '../components/vehicle/VehicleCard.vue';
import BookingForm from '../components/booking/BookingForm.vue';
const store = useVehiclesStore();
onMounted(() => store.load());
</script>
<template>
  <section class="hero">
    <div class="container hero-grid">
      <div>
        <div class="eyebrow">GG RENT · VIP TRANSFER</div>
        <h1>Vaša destinacija.<br /><em>Naša posvećenost.</em></h1>
        <p>
          Premium iskustvo iznajmljivanja vozila. Izaberite automobil, provjerite dostupnost i
          pošaljite upit za nekoliko trenutaka.
        </p>
        <div class="hero-actions">
          <a
            class="btn btn-primary"
            href="#booking"
            >Istraži dostupnost ↗</a
          ><RouterLink
            class="btn btn-outline"
            to="/vozila"
            >Pogledaj vozila</RouterLink
          >
        </div>
        <div class="hero-stats">
          <span><strong>24/7</strong><small>Online upiti</small></span
          ><span><strong>100%</strong><small>Transparentne cijene</small></span
          ><span><strong>VIP</strong><small>Pristup usluzi</small></span>
        </div>
      </div>
      <div class="hero-visual">
        <img
          v-if="store.items[0]?.images[0]"
          :src="store.items[0].images[0].url"
          alt="GG Rent vozilo"
        /><img
          v-else
          src="/images/original-2.jpg"
          alt="GG Rent automobil"
        /><span class="hero-overlay">YOUR JOURNEY, ELEVATED.</span>
      </div>
    </div>
  </section>
  <section class="section container">
    <div class="section-heading">
      <div>
        <div class="eyebrow">NAŠA FLOTA</div>
        <h2>Odaberite vozilo po svojoj mjeri.</h2>
      </div>
      <RouterLink
        to="/vozila"
        class="text-link"
        >Sva vozila ↗</RouterLink
      >
    </div>
    <p
      v-if="store.error"
      class="alert error"
    >
      {{ store.error }}
    </p>
    <div class="vehicle-grid">
      <VehicleCard
        v-for="v in store.items.slice(0, 3)"
        :key="v.id"
        :vehicle="v"
      />
    </div>
  </section>
  <section
    class="section booking-section"
    id="booking"
  >
    <div class="container booking-layout">
      <div>
        <div class="eyebrow">JEDNOSTAVNA REZERVACIJA</div>
        <h2>Vi birate termin.<br /><em>Mi brinemo o ostalom.</em></h2>
        <p class="muted">
          Odaberite vozilo i slobodne datume. Nakon što pošaljete upit, administrator provjerava i
          potvrđuje rezervaciju emailom.
        </p>
        <div class="steps">
          <div><b>01</b><span>Izaberite vozilo</span></div>
          <div><b>02</b><span>Provjerite kalendar</span></div>
          <div><b>03</b><span>Pošaljite upit</span></div>
          <div><b>04</b><span>Dobijte potvrdu</span></div>
        </div>
      </div>
      <BookingForm />
    </div>
  </section>
  <section class="section container">
    <div class="eyebrow">PITANJA I ODGOVORI</div>
    <h2>Dobro je znati.</h2>
    <div class="faq">
      <details>
        <summary>Da li moram napraviti korisnički nalog?</summary>
        <p>Ne. Izaberite vozilo, unesite termine i pošaljite upit bez registracije.</p>
      </details>
      <details>
        <summary>Da li je upit automatski potvrđena rezervacija?</summary>
        <p>
          Ne. Rezervacija se potvrđuje tek nakon što je administrator odobri. Potvrdu šaljemo
          emailom.
        </p>
      </details>
      <details>
        <summary>Mogu li rezervisati putem WhatsAppa?</summary>
        <p>Da. Odaberite vozilo i termin, zatim kliknite na WhatsApp dugme.</p>
      </details>
    </div>
  </section>
</template>
