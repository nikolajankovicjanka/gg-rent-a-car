<script setup lang="ts">
import { computed, ref } from 'vue'

// Sve fotografije se nalaze u frontend/public/images/.
// Promijeni samo putanje ako želiš drugi redoslijed prikaza.
const PHONE = '+38766028308'
const WHATSAPP = '38766028308'
const LOGO = '/images/gg-group-logo-white.png'

const vehicle = {
  name: 'Škoda Octavia',
  description: 'Udobnost, elegancija i sigurnost za svaki put. Izaberite termin i pošaljite nam upit za dostupnost.',
  pricePerDay: 150,
  transmission: 'Automatik',
  fuel_type: 'Dizel',
  year: 2026,
  heroImage: '/images/original-3.png',
  gallery: [
    '/images/original-3.png',
    '/images/original-5.png',
    '/images/original-6.png',
    '/images/original-7.png',
    '/images/original-8.png',
  ],
}

const title = vehicle.name
const price = vehicle.pricePerDay
const photos = [vehicle.heroImage, ...vehicle.gallery]
const galleryPhotos = vehicle.gallery
const selectedImage = ref(0)
const pickup = ref('')
const dropoff = ref('')
const serviceType = ref('short')
const pickupLocation = ref('')
const note = ref('')
const showExtras = ref(false)
const lightbox = ref(false)
const faqOpen = ref<number | null>(null)
const currentImage = computed(() => photos[selectedImage.value] || photos[0])
const minDateTime = localDateTime(new Date())

const faqs = [
  { q: 'Kako da rezervišem automobil?', a: 'Izaberite datume i pošaljite upit putem WhatsAppa. Potvrdićemo dostupnost i detalje rezervacije.' },
  { q: 'Da li je prikazana cijena konačna?', a: 'Prikazana cijena je okvirna. Konačna ponuda zavisi od termina, trajanja i dogovorenih uslova.' },
  { q: 'Mogu li dobiti vozilo sa vozačem?', a: 'Pošaljite upit putem WhatsAppa ili nas pozovite kako bismo dogovorili odgovarajuću uslugu.' },
  { q: 'Kako dogovaramo mjesto preuzimanja?', a: 'Mjesto preuzimanja navedite u upitu ili ga dogovorite sa nama direktno.' },
]

const days = computed(() => {
  if (!pickup.value || !dropoff.value) return 0
  const diff = new Date(dropoff.value).getTime() - new Date(pickup.value).getTime()
  return Number.isFinite(diff) && diff > 0 ? Math.ceil(diff / 86_400_000) : 0
})
const estimate = computed(() => days.value ? price * days.value : null)
const canSend = computed(() => {
  if (!pickup.value || !dropoff.value || days.value <= 0) return false
  return new Date(pickup.value).getTime() >= Date.now() - 60_000
})

function localDateTime(date: Date): string {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}
function formattedDate(value: string): string {
  return value ? new Date(value).toLocaleString('bs-BA', { dateStyle: 'medium', timeStyle: 'short' }) : 'Nije izabrano'
}
function whatsappUrl(): string {
  const message = [
    'Pozdrav, želim poslati upit za najam vozila.',
    `Vozilo: ${title}`,
    `Usluga: ${serviceType.value === 'short' ? 'Kratkoročni najam' : 'Dugoročni najam'}`,
    `Preuzimanje: ${formattedDate(pickup.value)}`,
    `Vraćanje: ${formattedDate(dropoff.value)}`,
    `Trajanje: ${days.value} dana`,
    estimate.value !== null ? `Okvirna cijena: ${estimate.value.toLocaleString('bs-BA')} KM` : '',
    pickupLocation.value ? `Mjesto preuzimanja: ${pickupLocation.value}` : '',
    note.value ? `Napomena: ${note.value}` : '',
  ].filter(Boolean).join('\n')
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`
}
function sendInquiry(): void {
  if (canSend.value) window.open(whatsappUrl(), '_blank', 'noopener,noreferrer')
}
function scrollToGallery(): void {
  document.getElementById('vehicle-gallery')?.scrollIntoView({ behavior: 'smooth' })
}
function changeImage(delta: number): void {
  selectedImage.value = (selectedImage.value + delta + photos.length) % photos.length
}
function quickDays(count: number): void {
  const now = new Date()
  const selected = pickup.value ? new Date(pickup.value) : now
  const start = selected.getTime() >= now.getTime() ? selected : now
  pickup.value = localDateTime(start)
  const end = new Date(start)
  end.setDate(end.getDate() + count)
  dropoff.value = localDateTime(end)
}
</script>

<template>
  <div class="client-home">
    <header class="topbar">
      <div class="container header-inner">
        <div class="brand"><img :src="LOGO" alt="GG Group" class="brand-logo" /><span class="brand-divider"></span><span class="brand-sub">VIP TRANSFER</span></div>
        <div class="header-actions">
          <a class="outline-button" :href="`tel:${PHONE}`">☎ <span>Pozovi za rezervaciju</span></a>
          <a class="outline-button" :href="`https://wa.me/${WHATSAPP}`" target="_blank" rel="noopener noreferrer"><span class="wa-icon">◉</span> <span>WhatsApp rezervacija</span></a>
        </div>
      </div>
    </header>

    <div class="service-strip"><span>NAŠE USLUGE</span><span class="strip-divider"></span><strong>Kratkoročno izdavanje</strong></div>

    <main class="container">
      <section class="hero-grid">
          <div class="vehicle-column">
            <div class="cover-frame" @click="selectedImage = 0; lightbox = true">
              <img :src="vehicle.heroImage" :alt="title" class="cover-image" />
              <button class="expand-button" type="button" aria-label="Otvori fotografiju" @click.stop="selectedImage = 0; lightbox = true">⛶</button>
              <div class="cover-caption"><strong>{{ title }}</strong><span>GG Rent / VIP Transfer</span></div>
            </div>
            <button class="gallery-link" type="button" @click="scrollToGallery">
              <strong>Pogledaj cijelu galeriju</strong><span>{{ photos.length }} fotografija</span><span class="gallery-arrow">↓</span>
            </button>
            <div class="specs">
              <span v-if="vehicle.transmission">⚙ &nbsp;{{ vehicle.transmission }}</span>
              <span v-if="vehicle.fuel_type">♧ &nbsp;{{ vehicle.fuel_type }}</span>
              <span v-if="vehicle.year">▦ &nbsp;{{ vehicle.year }} godište</span>
            </div>
          </div>

          <div class="details-column">
            <h1>{{ title }}</h1>
            <p class="description">{{ vehicle.description || 'Prostrano i elegantno vozilo za poslovni put, odmor ili svakodnevne obaveze. Izaberite termin i pošaljite upit za dostupnost.' }}</p>
            <div class="price-row"><span>Cijena najma</span><div v-if="price">od <strong>{{ price.toLocaleString('bs-BA') }} KM</strong> / dan</div><div v-else>Na upit</div></div>

            <div class="booking-card">
              <div class="card-heading"><span>01</span><div><h2>Planirajte svoju vožnju</h2><p>Izaberite termin. Ponuda stiže putem WhatsAppa.</p></div></div>
              <label for="service-type">Vrsta usluge</label>
              <select id="service-type" v-model="serviceType"><option value="short">Kratkoročni najam</option><option value="long">Dugoročni najam</option></select>
              <div class="date-grid">
                <div><label for="pickup">Datum preuzimanja *</label><input id="pickup" v-model="pickup" type="datetime-local" :min="minDateTime" /></div>
                <div><label for="dropoff">Datum vraćanja *</label><input id="dropoff" v-model="dropoff" type="datetime-local" :min="minDateTime" /><small>* Izaberite oba termina za procjenu ukupne cijene.</small></div>
              </div>
              <div class="quick-row"><span>Brzi odabir</span><div><button v-for="count in [1,3,7]" :key="count" type="button" @click="quickDays(count)">{{ count }} {{ count === 1 ? 'dan' : 'dana' }}</button></div></div>
              <div class="estimate"><span>* Okvirna cijena najma</span><strong>{{ estimate !== null ? `${estimate.toLocaleString('bs-BA')} KM` : price !== null ? `od ${price.toLocaleString('bs-BA')} KM / dan` : 'Na upit' }}</strong></div>
              <button class="extras-toggle" type="button" @click="showExtras = !showExtras">{{ showExtras ? '▾' : '▸' }} Mjesto preuzimanja i napomena <small>opciono</small></button>
              <div v-if="showExtras" class="extras"><input v-model="pickupLocation" placeholder="Mjesto preuzimanja" /><textarea v-model="note" rows="3" placeholder="Dodatna napomena"></textarea></div>
              <button class="send-button" type="button" :disabled="!canSend" @click="sendInquiry"><span><span class="wa-icon">◉</span> Pošalji upit putem WhatsAppa</span><span>→</span></button>
              <p class="booking-note">Upit ne potvrđuje rezervaciju. Dostupnost dogovaramo u poruci.</p>
            </div>
          </div>
        </section>

        <section id="vehicle-gallery" class="gallery-section">
          <div class="section-heading"><div><span>02</span><h2>Pogled iz svakog ugla.</h2></div><span>Eksterijer &amp; unutrašnjost</span></div>
          <div class="gallery-stage" v-if="photos.length"><img :src="currentImage" :alt="`${title} — fotografija ${selectedImage + 1}`" @click="lightbox = true" /></div>
          <div v-else class="gallery-stage image-placeholder">Fotografije nisu dostupne</div>
          <div class="thumbnail-grid"><button v-for="(photo, i) in galleryPhotos" :key="photo" type="button" :class="{ active: selectedImage === i+1 }" @click="selectedImage = i+1"><img :src="photo" :alt="`${title} — dodatna fotografija ${i+2}`" /><span>Fotografija {{ i+2 }}</span></button></div>
        </section>

        <section class="faq-section"><p>Za sve detalje tu smo na <a :href="`tel:${PHONE}`">+387 66 028 308</a>.</p><div class="faq-list"><div v-for="(faq, i) in faqs" :key="faq.q" class="faq-item"><button type="button" @click="faqOpen = faqOpen === i ? null : i">{{ faq.q }} <span>{{ faqOpen === i ? '−' : '+' }}</span></button><p v-if="faqOpen === i">{{ faq.a }}</p></div></div></section>
    </main>

    <footer class="footer"><div class="container footer-inner"><span><strong>GG Rent</strong> &nbsp; VIP TRANSFER</span><a :href="`tel:${PHONE}`">+387 66 028 308 &nbsp; ☎</a></div></footer>
    <div v-if="lightbox && currentImage" class="lightbox" role="dialog" aria-modal="true" @click.self="lightbox = false"><button type="button" aria-label="Zatvori" @click="lightbox = false">✕</button><img :src="currentImage" :alt="title" /></div>
  </div>
</template>

<style scoped>
.brand-logo{display:block;max-width:150px;max-height:48px;width:auto;height:auto;object-fit:contain}

.client-home{--bg:#0e1612;--panel:#19231e;--muted:#a7b5ad;--border:#34443b;background:var(--bg);color:#f3f5f2;min-height:100vh;font-family:Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}.client-home *{box-sizing:border-box}.container{max-width:1280px;margin:auto;padding-left:24px;padding-right:24px}.topbar{background:#0a110e;border-bottom:1px solid #1c2922}.header-inner{height:86px;display:flex;justify-content:space-between;align-items:center;gap:24px}.brand{display:flex;align-items:center;gap:7px;white-space:nowrap;font-size:15px;font-weight:650;letter-spacing:.03em}.brand-mark{font-family:Georgia,serif;font-size:32px;font-weight:700}.brand-divider{height:24px;width:1px;background:#45544b;margin:0 13px}.brand-sub{letter-spacing:.18em;font-size:13px;font-weight:500}.header-actions{display:flex;gap:10px}.outline-button{display:inline-flex;align-items:center;gap:10px;border:1px solid #445149;border-radius:8px;color:#fff;text-decoration:none;padding:13px 17px;font-size:13px;font-weight:650;white-space:nowrap}.outline-button:hover,.gallery-link:hover,.arrows button:hover{border-color:#9ab7a4}.wa-icon{display:inline-flex;background:#1dd75d;color:white;width:20px;height:20px;border-radius:5px;align-items:center;justify-content:center;font-size:16px}.service-strip{height:48px;background:#19231e;border-bottom:1px solid #34443b;display:flex;align-items:center;justify-content:center;gap:22px;font-size:12px}.service-strip>span:first-child{letter-spacing:.14em;color:var(--muted)}.strip-divider{height:16px;width:1px;background:#425147}.service-strip strong{font-size:13px;font-weight:500}.state{padding:100px 0;text-align:center;color:var(--muted)}.hero-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:56px;padding-top:12px}.cover-frame{height:680px;position:relative;overflow:hidden;border-radius:8px 8px 0 0;background:#121c17;cursor:zoom-in}.cover-image{width:100%;height:100%;object-fit:cover}.image-placeholder{display:grid;place-items:center;color:var(--muted)}.expand-button{position:absolute;top:16px;right:16px;background:#0b120f;border:1px solid #536259;color:white;border-radius:8px;width:44px;height:44px;cursor:pointer;font-size:25px}.cover-caption{position:absolute;bottom:0;left:0;right:0;display:flex;justify-content:space-between;align-items:center;padding:17px 19px;background:rgba(8,17,12,.89);font-size:12px}.cover-caption span{color:var(--muted)}.gallery-link{display:flex;align-items:center;gap:16px;width:100%;margin-top:7px;padding:16px 18px;color:white;background:transparent;border:1px solid #445149;border-radius:8px;text-align:left;cursor:pointer;font-size:13px}.gallery-link span{color:var(--muted);font-size:12px}.gallery-link .gallery-arrow{margin-left:auto;font-size:22px;color:white}.specs{display:flex;gap:8px;margin-top:9px}.specs span{flex:1;text-align:center;padding:12px 8px;border:1px solid var(--border);border-radius:7px;background:var(--panel);font-size:12px;color:var(--muted)}.details-column h1{font-size:clamp(42px,4.4vw,62px);letter-spacing:-.065em;font-weight:550;line-height:1.12;margin:0 0 14px}.description{max-width:440px;color:var(--muted);font-size:15px;line-height:1.75;margin:0 0 12px}.price-row{border-top:1px solid var(--border);display:flex;align-items:center;justify-content:space-between;padding:15px 0 20px;font-size:13px;color:var(--muted)}.price-row div{color:white}.price-row strong{font-size:27px;letter-spacing:-.04em}.booking-card{background:var(--panel);border:1px solid var(--border);border-radius:9px;padding:24px}.card-heading{display:flex;gap:17px;align-items:flex-start;margin-bottom:25px}.card-heading>span{color:var(--muted);font-size:11px;margin-top:6px}.card-heading h2{font-size:17px;margin:0 0 6px;letter-spacing:-.025em}.card-heading p{font-size:12px;color:var(--muted);margin:0}.booking-card label{display:block;font-size:13px;font-weight:650;margin-bottom:8px}.booking-card select,.booking-card input,.booking-card textarea{width:100%;background:#101b15;border:1px solid #536458;border-radius:3px;color:white;padding:14px;font:inherit;font-size:13px;min-width:0}.booking-card select{margin-bottom:20px}.booking-card input::-webkit-calendar-picker-indicator{filter:invert(1)}.date-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}.date-grid small{display:block;color:var(--muted);font-size:11px;line-height:1.5;margin-top:7px}.quick-row{display:flex;justify-content:space-between;align-items:center;margin:14px 0 10px;gap:12px}.quick-row>span{color:var(--muted);font-size:12px}.quick-row>div{display:flex;gap:7px}.quick-row button,.arrows button{background:#0d1511;border:1px solid #4b5a50;border-radius:7px;color:white;padding:9px 12px;cursor:pointer}.estimate{border-top:1px solid var(--border);border-bottom:1px solid var(--border);padding:13px 0;display:flex;justify-content:space-between;gap:8px;align-items:center}.estimate span{color:var(--muted);font-size:12px}.estimate strong{color:#a6cdb1;font-size:19px;font-weight:550}.extras-toggle{background:none;border:none;color:white;cursor:pointer;text-align:left;padding:19px 0;font-size:13px}.extras-toggle small{color:var(--muted);margin-left:8px}.extras{display:grid;gap:10px;margin-bottom:15px}.send-button{width:100%;display:flex;justify-content:space-between;align-items:center;background:#0b120e;color:white;border:1px solid #4b5a50;border-radius:7px;padding:12px 15px;font-size:13px;font-weight:700;cursor:pointer}.send-button:disabled{opacity:.55;cursor:not-allowed}.send-button>span:first-child{display:flex;align-items:center;gap:10px}.send-button>span:last-child{font-size:22px}.booking-note{text-align:center;color:var(--muted);font-size:11px;margin:10px 0 0}.gallery-section{margin-top:68px;border-top:1px solid var(--border);padding-top:25px}.section-heading{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}.section-heading>div{display:flex;align-items:center;gap:22px}.section-heading>div>span{color:var(--muted);font-size:12px}.section-heading h2{font-size:31px;font-weight:500;letter-spacing:-.045em;margin:0}.section-heading>span{color:var(--muted);font-size:13px}.gallery-stage{height:530px;background:#09110d;border-radius:9px;overflow:hidden;display:flex;justify-content:center;align-items:center}.gallery-stage img{height:100%;max-width:100%;object-fit:contain;cursor:zoom-in}.gallery-controls{display:flex;justify-content:space-between;align-items:center;padding:14px 0}.gallery-controls>div:first-child{display:flex;gap:20px;align-items:center;font-size:12px}.gallery-controls>div:first-child span{color:var(--muted)}.gallery-controls strong{font-weight:500}.dots{display:flex;gap:13px}.dots button{width:6px;height:6px;background:#64776a;border:none;border-radius:50%;padding:0;cursor:pointer}.dots button.active{background:white;width:9px;height:9px}.arrows{display:flex;gap:7px}.arrows button{font-size:21px;width:44px;height:44px}.thumbnail-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.thumbnail-grid button{padding:0;position:relative;border:1px solid #4b5a50;border-radius:8px;overflow:hidden;background:#0a120e;cursor:pointer;color:white;text-align:left;height:160px}.thumbnail-grid button.active{border:2px solid white}.thumbnail-grid img{width:100%;height:100%;object-fit:cover}.thumbnail-grid span{position:absolute;bottom:0;left:0;right:0;background:linear-gradient(transparent,#07100d);padding:20px 12px 10px;font-size:12px}.faq-section{border-top:1px solid var(--border);margin-top:48px;padding:20px 0 45px;display:grid;grid-template-columns:1fr 1.2fr;gap:50px}.faq-section>p{font-size:13px;color:var(--muted)}.faq-section>p a{color:#b2d7bb;text-decoration:none}.faq-item{border-bottom:1px solid var(--border)}.faq-item button{width:100%;padding:19px 0;display:flex;justify-content:space-between;gap:15px;background:none;border:0;color:white;text-align:left;font-size:14px;cursor:pointer}.faq-item button span{color:#a4d2ae;font-size:22px}.faq-item p{color:var(--muted);font-size:13px;line-height:1.6;margin:0 0 17px}.footer{background:#0a110e;padding:22px 0}.footer-inner{display:flex;justify-content:space-between;gap:20px;align-items:center;font-size:13px}.footer-inner>span{color:var(--muted);letter-spacing:.06em}.footer-inner strong{font-size:18px;color:white;letter-spacing:-.04em}.footer-inner a{color:white;text-decoration:none}.lightbox{position:fixed;inset:0;z-index:1000;background:rgba(0,0,0,.94);display:flex;justify-content:center;align-items:center;padding:40px}.lightbox img{max-width:100%;max-height:100%;object-fit:contain}.lightbox button{position:absolute;top:20px;right:24px;background:transparent;border:0;color:white;font-size:28px;cursor:pointer}@media(max-width:900px){.hero-grid{grid-template-columns:1fr;gap:25px}.cover-frame{height:580px}.details-column h1{font-size:46px}.faq-section{grid-template-columns:1fr;gap:10px}}@media(max-width:600px){.container{padding-left:16px;padding-right:16px}.header-inner{height:auto;min-height:75px;flex-wrap:wrap;padding-top:12px;padding-bottom:12px;gap:10px}.brand-mark{font-size:27px}.brand{font-size:13px}.brand-sub{font-size:11px}.header-actions{width:100%;display:grid;grid-template-columns:1fr 1fr}.outline-button{padding:10px 8px;font-size:11px;justify-content:center;gap:5px}.service-strip{font-size:10px}.hero-grid{padding-top:12px}.cover-frame{height:440px}.cover-caption{font-size:10px}.details-column h1{font-size:41px}.booking-card{padding:17px}.date-grid{grid-template-columns:1fr}.quick-row{flex-wrap:wrap}.gallery-section{margin-top:42px}.section-heading h2{font-size:24px}.section-heading>span{display:none}.gallery-stage{height:330px}.thumbnail-grid{gap:6px}.thumbnail-grid button{height:110px}.footer-inner{font-size:11px}.footer-inner strong{font-size:15px}}
</style>
