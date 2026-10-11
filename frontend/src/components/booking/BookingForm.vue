<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue';
import { useVehiclesStore } from '../../stores/vehicles';
import { vehicleService } from '../../services/vehicleService';
import { bookingService } from '../../services/bookingService';
import BookingCalendar from './BookingCalendar.vue';
import type { BusyRange, Quote } from '../../types';

const props = defineProps<{ initialVehicleId?: number }>();

const store = useVehiclesStore();

const vehicleId = ref<number | null>(props.initialVehicleId ?? null);
const busy = ref<BusyRange[]>([]);
const start = ref('');
const end = ref('');
const quote = ref<Quote | null>(null);

const loading = ref(false);
const availabilityLoaded = ref(false);
const submitting = ref(false);

const error = ref('');
const success = ref('');

const name = ref('');
const email = ref('');
const phone = ref('');
const notes = ref('');

const vehicle = computed(() => store.items.find((v) => v.id === vehicleId.value));

const whatsAppNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '38765000000';

const whatsAppUrl = computed(() => {
  const message = `Pozdrav, želim upit za ${
    vehicle.value?.name || 'vozilo'
  }${start.value ? `, od ${start.value}` : ''}${
    end.value ? ` do ${end.value}` : ''
  }. Da li je dostupno?`;

  return `https://wa.me/${whatsAppNumber}?text=${encodeURIComponent(message)}`;
});

// Svaki zahtjev dobija svoj ID.
// Stariji odgovor ne smije prepisati noviji.
let availabilityRequestId = 0;
let quoteRequestId = 0;

async function loadAvailability() {
  const requestId = ++availabilityRequestId;
  const selectedSlug = vehicle.value?.slug;

  ++quoteRequestId;

  busy.value = [];
  start.value = '';
  end.value = '';
  quote.value = null;
  error.value = '';
  availabilityLoaded.value = false;

  loading.value = Boolean(selectedSlug);

  if (!selectedSlug) return;

  try {
    const ranges = await vehicleService.availability(selectedSlug);

    if (requestId !== availabilityRequestId) return;

    if (vehicle.value?.slug !== selectedSlug) return;

    busy.value = ranges;
    availabilityLoaded.value = true;
  } catch {
    if (requestId !== availabilityRequestId) return;

    error.value = 'Dostupnost nije moguće učitati.';
    availabilityLoaded.value = false;
  } finally {
    if (requestId === availabilityRequestId) {
      loading.value = false;
    }
  }
}

// Reaguje na prvo učitavanje, promjenu vozila
// i asinhrono popunjavanje Pinia store-a.
watch(
  () => vehicle.value?.slug,
  () => {
    void loadAvailability();
  },
  { immediate: true },
);

// Ako roditeljska komponenta promijeni vozilo,
// sinhronizuj izbor bez potrebe za refreshom.
watch(
  () => props.initialVehicleId,
  (newId) => {
    vehicleId.value = newId ?? null;
  },
);

// Učitaj vozila ako još nisu u store-u.
onMounted(async () => {
  if (!store.items.length) {
    try {
      await store.load();
    } catch {
      error.value = 'Vozila nije moguće učitati.';
    }
  }
});

function overlapsBusy(from: string, to: string): boolean {
  return busy.value.some((range) => range.start < to && range.end > from);
}

function pick(day: string) {
  if (loading.value || !availabilityLoaded.value || submitting.value) {
    return;
  }

  error.value = '';
  success.value = '';
  quote.value = null;

  // Poništi prethodni zahtjev za obračun cijene.
  ++quoteRequestId;

  // Dodatna zaštita ako se klik ipak desi
  // na zauzet datum.
  if (busy.value.some((range) => day >= range.start && day < range.end)) {
    error.value = 'Odabrani datum je zauzet.';
    return;
  }

  if (!start.value || end.value || day <= start.value) {
    start.value = day;
    end.value = '';
    return;
  }

  if (overlapsBusy(start.value, day)) {
    error.value = 'Izabrani period presijeca zauzete datume.';
    return;
  }

  end.value = day;
  void getQuote();
}

async function getQuote() {
  const slug = vehicle.value?.slug;

  if (!slug || !start.value || !end.value || !availabilityLoaded.value) {
    return;
  }

  const requestId = ++quoteRequestId;
  const from = start.value;
  const to = end.value;

  try {
    const result = await vehicleService.quote(slug, from, to);

    if (requestId !== quoteRequestId) return;

    if (vehicle.value?.slug === slug && start.value === from && end.value === to) {
      quote.value = result;
    }
  } catch {
    if (requestId !== quoteRequestId) return;

    error.value = 'Nije moguće izračunati cijenu.';
  }
}

async function submit() {
  if (
    !vehicleId.value ||
    !start.value ||
    !end.value ||
    !quote.value ||
    !availabilityLoaded.value ||
    loading.value ||
    submitting.value
  ) {
    return;
  }

  submitting.value = true;
  error.value = '';
  success.value = '';

  try {
    const booking = await bookingService.create({
      vehicle_id: vehicleId.value,
      pickup_date: start.value,
      return_date: end.value,
      customer_name: name.value,
      customer_email: email.value,
      customer_phone: phone.value,
      notes: notes.value,
    });

    await loadAvailability();

    success.value = `Upit je zaprimljen. Broj rezervacije: ${booking.booking_number}. Administrator će potvrditi termin.`;

    name.value = '';
    email.value = '';
    phone.value = '';
    notes.value = '';
  } catch (e: any) {
    error.value = e?.response?.data?.message || 'Slanje upita nije uspjelo.';
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <section
    class="booking-panel"
    id="rezervacija"
  >
    <div class="eyebrow">ONLINE UPIT</div>

    <h2>Rezervišite svoje vozilo.</h2>

    <p class="muted">
      Bez registracije. Odaberite vozilo i termin, a naš tim potvrđuje rezervaciju.
    </p>

    <label class="field">
      Odaberite vozilo

      <select v-model.number="vehicleId">
        <option :value="null">Izaberite vozilo...</option>

        <option
          v-for="v in store.items"
          :key="v.id"
          :value="v.id"
        >
          {{ v.name }} — {{ v.price_per_day }} KM/dan
        </option>
      </select>
    </label>

    <template v-if="vehicleId">
      <p
        v-if="loading"
        class="muted"
      >
        Učitavanje dostupnosti...
      </p>

      <template v-else>
        <BookingCalendar
          :busy="busy"
          :start="start"
          :end="end"
          :disabled="!availabilityLoaded || submitting"
          @select="pick"
        />

        <div class="dates">
          <div>
            <small>Preuzimanje</small>
            <strong>{{ start || 'Odaberite datum' }}</strong>
          </div>

          <div>
            <small>Vraćanje</small>
            <strong>{{ end || 'Odaberite datum' }}</strong>
          </div>
        </div>

        <div
          v-if="quote"
          class="quote"
        >
          <div>{{ quote.days }} dana × {{ quote.price_per_day }} KM</div>

          <div v-if="quote.discount_percent">Popust {{ quote.discount_percent }}%</div>

          <strong> Ukupno: {{ quote.total.toFixed(2) }} KM </strong>
        </div>

        <form
          v-if="start && end && quote && availabilityLoaded"
          class="booking-fields"
          @submit.prevent="submit"
        >
          <label class="field">
            Ime i prezime
            <input
              v-model="name"
              required
              maxlength="150"
              placeholder="Ime i prezime"
            />
          </label>

          <label class="field">
            Telefon
            <input
              v-model="phone"
              required
              maxlength="30"
              placeholder="+387..."
            />
          </label>

          <label class="field">
            Email
            <input
              v-model="email"
              type="email"
              required
              placeholder="email@primjer.com"
            />
          </label>

          <label class="field">
            Napomena
            <textarea
              v-model="notes"
              rows="3"
              placeholder="Dodatne informacije (opcionalno)"
            ></textarea>
          </label>

          <button
            class="btn btn-primary full"
            :disabled="submitting || !availabilityLoaded"
          >
            {{ submitting ? 'Šaljemo...' : 'Pošalji upit za rezervaciju →' }}
          </button>
        </form>

        <a
          :href="whatsAppUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-outline full whatsapp"
        >
          Zakaži putem WhatsAppa ↗
        </a>
      </template>
    </template>

    <p
      v-else
      class="muted hint"
    >
      Izaberite vozilo da biste vidjeli slobodne i zauzete datume.
    </p>

    <p
      v-if="error"
      class="alert error"
    >
      {{ error }}
    </p>

    <p
      v-if="success"
      class="alert success"
    >
      {{ success }}
    </p>
  </section>
</template>
