<script setup lang="ts">
import { onMounted } from 'vue';
import '../assets/client-home.css';
import { initClientHome } from '../assets/client-home';
onMounted(() => { initClientHome(); });
</script>

<template>

  <a class="skip-link" href="#main">Pređi na sadržaj</a>
  <svg class="icon-definitions" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <symbol id="icon-arrow" viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></symbol>
    <symbol id="icon-phone" viewBox="0 0 24 24"><path d="m7 3 3 5-2 2a14 14 0 0 0 6 6l2-2 5 3-1 4C11 22 2 13 3 4z"/></symbol>
    <symbol id="icon-calendar" viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18m-13 5h3"/></symbol>
    <symbol id="icon-check" viewBox="0 0 24 24"><path d="m5 12 4 4L19 6"/></symbol>
    <symbol id="icon-transmission" viewBox="0 0 24 24"><path d="M6 4v16M18 4v8H6m6-8v8"/><circle cx="6" cy="4" r="1.5"/><circle cx="12" cy="4" r="1.5"/><circle cx="18" cy="4" r="1.5"/><circle cx="6" cy="20" r="1.5"/></symbol>
    <symbol id="icon-fuel" viewBox="0 0 24 24"><path d="M3 21h12M5 21V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v17M5 10h8m0 3h2a2 2 0 0 1 2 2v3a2 2 0 0 0 4 0V9l-4-4m2 2v4h2"/></symbol>
    <symbol id="icon-expand" viewBox="0 0 24 24"><path d="M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"/></symbol>
    <symbol id="icon-close" viewBox="0 0 24 24"><path d="m6 6 12 12M6 18 18 6"/></symbol>
  </svg>

  <header class="site-header">
    <div class="container header-inner">
      <a class="brand" href="#main" aria-label="G Group VIP Transfer — početak">
        <span class="brand-logo"><img src="/images/original-1.jpg" alt="G Group" width="104" height="104"></span>
        <span class="brand-divider" aria-hidden="true"></span>
        <span class="brand-name">VIP Transfer</span>
      </a>
      <nav class="header-actions" aria-label="Rezervacija">
        <a class="button button-outline" href="tel:+38766028308">
          <svg class="icon" aria-hidden="true"><use href="#icon-phone"/></svg>
          <span>Pozovi za rezervaciju</span>
        </a>
        <a class="button button-header" href="#reservation">
          <span class="wa-logo"><svg class="wa-inline" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 2.2A13.8 13.8 0 0 0 4.1 23l-1.7 6.6 6.8-1.8A13.8 13.8 0 1 0 16 2.2Zm0 25a11.1 11.1 0 0 1-5.6-1.5l-.4-.3-4 1.1 1.1-3.9-.3-.5A11.1 11.1 0 1 1 16 27.2Zm6-8.3c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.4-.2-1.4-.5-2.6-1.7-1-1-1.7-2-1.9-2.3-.2-.4 0-.5.1-.7l.6-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.5c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-1 .5-.4.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.3 3.6 5.7 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2 .1.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.5.2-1.6-.1-.1-.3-.2-.6-.4Z"/></svg></span>
          <span>WhatsApp rezervacija</span>
        </a>
      </nav>
    </div>
  </header>

  <div class="services" aria-label="Naše usluge">
    <div class="container services-inner">
      <span class="services-label">Naše usluge</span>
      <span id="service-text">Iznajmljivanje automobila sa šoferom</span>
    </div>
  </div>

  <main class="container" id="main">
    <section class="vehicle" aria-labelledby="vehicle-title">
      <div class="vehicle-media">
        <figure class="hero-image">
          <button class="hero-expand icon-button" type="button" aria-label="Uvećaj glavnu fotografiju"><svg class="icon" aria-hidden="true"><use href="#icon-expand"/></svg></button>
          <img src="/images/original-3.png" alt="Crna Škoda Octavia ispred modernog objekta, pogled sprijeda i sa strane" width="864" height="1536" fetchpriority="high">
          <figcaption><span>Škoda Octavia</span><span>GG Rent / VIP Transfer</span></figcaption>
        </figure>
        <a class="gallery-link button button-outline" href="#fotografije">
          <span>Pogledaj cijelu galeriju <small>5 fotografija</small></span>
          <svg class="icon" aria-hidden="true"><use href="#icon-arrow"/></svg>
        </a>
        <ul class="vehicle-tags" aria-label="Karakteristike vozila">
          <li><svg class="icon" aria-hidden="true"><use href="#icon-transmission"/></svg>Automatik</li>
          <li><svg class="icon" aria-hidden="true"><use href="#icon-fuel"/></svg>Dizel</li>
          <li><svg class="icon" aria-hidden="true"><use href="#icon-calendar"/></svg>2026 godište</li>
        </ul>
      </div>

      <div class="vehicle-details">
        <div class="vehicle-heading">
          <h1 id="vehicle-title">Škoda Octavia</h1>
          <p class="intro">Prostrana i elegantna limuzina za poslovni put, odmor ili svakodnevne obaveze. Izaberite termin i pošaljite upit za dostupnost.</p>
          <div class="price-row">
            <span>Cijena najma</span>
            <p><span class="price-prefix">od</span> <strong>150 KM</strong> <span class="price-period">/ dan</span></p>
          </div>
        </div>

        <form class="reservation" id="reservation" data-whatsapp="38766028308" novalidate aria-labelledby="reservation-title">
          <div class="form-heading">
            <span class="section-index" aria-hidden="true">01</span>
            <h2 id="reservation-title">Planirajte svoju vožnju</h2>
            <p>Izaberite termin. Ponuda stiže putem WhatsAppa.</p>
          </div>
          <div class="field service-field">
            <label for="rental-service">Vrsta usluge</label>
            <select id="rental-service" name="service">
              <option value="rental">Kratkoročni najam</option>
              <option value="driver">Najam sa vozačem</option>
              <option value="business">Najam za kompaniju</option>
              <option value="longterm">Dugoročni najam</option>
            </select>
          </div>
          <div class="date-fields">
            <div class="field">
              <label for="pickup">Datum preuzimanja <span aria-hidden="true">*</span></label>
              <div class="date-input-wrap">
                <svg class="icon" aria-hidden="true"><use href="#icon-calendar"/></svg>
                <input id="pickup" name="pickup" type="text" placeholder="Izaberite datum i vrijeme" readonly aria-haspopup="dialog" aria-controls="booking-dialog" aria-required="true" aria-describedby="pickup-error">
              </div>
              <p class="field-error" id="pickup-error" hidden></p>
            </div>
            <div class="field">
              <label for="dropoff">Datum vraćanja <span aria-hidden="true">*</span></label>
              <div class="date-input-wrap">
                <svg class="icon" aria-hidden="true"><use href="#icon-calendar"/></svg>
                <input id="dropoff" name="dropoff" type="text" placeholder="Izaberite datum i vrijeme" readonly aria-haspopup="dialog" aria-controls="booking-dialog" aria-required="true" aria-describedby="dropoff-error estimate-hint">
              </div>
              <p class="field-error" id="dropoff-error" hidden></p>
              <p class="field-hint" id="estimate-hint">* Izaberite oba termina za procjenu ukupne cijene.</p>
            </div>
          </div>
          <div class="duration-presets" role="group" aria-label="Brzi izbor trajanja najma">
            <span>Brzi odabir</span>
            <button type="button" data-days="1" aria-pressed="false">1 dan</button>
            <button type="button" data-days="3" aria-pressed="false">3 dana</button>
            <button type="button" data-days="7" aria-pressed="false">7 dana</button>
          </div>
          <div class="booking-estimate" aria-live="polite" aria-atomic="true">
            <div class="estimate-top"><span id="estimate-label">* Okvirna cijena najma</span><strong id="estimate-price">od 150 KM <small>/ dan</small></strong></div>
            <p id="estimate-duration" hidden></p>
            <p class="estimate-disclaimer" id="estimate-disclaimer" hidden>Procjena po početnoj cijeni od 150 KM za započeta 24 h. Konačnu cijenu i uslove potvrđujemo u ponudi.</p>
          </div>
          <details class="additional-details">
            <summary>Mjesto preuzimanja i napomena <span>opciono</span></summary>
            <div class="field">
              <label for="pickup-location">Željeno mjesto preuzimanja</label>
              <input id="pickup-location" name="location" type="text" placeholder="Npr. adresa, hotel ili aerodrom" maxlength="180" autocomplete="off">
            </div>
            <div class="field note-field">
              <label for="additional-note">Dodatna napomena</label>
              <textarea id="additional-note" name="note" placeholder="Npr. destinacija transfera ili dodatni zahtjev…" maxlength="500" rows="2"></textarea>
            </div>
          </details>
          <button class="button button-primary" type="submit">
            <span class="wa-logo"><svg class="wa-inline" viewBox="0 0 32 32" aria-hidden="true"><path fill="currentColor" d="M16 2.2A13.8 13.8 0 0 0 4.1 23l-1.7 6.6 6.8-1.8A13.8 13.8 0 1 0 16 2.2Zm0 25a11.1 11.1 0 0 1-5.6-1.5l-.4-.3-4 1.1 1.1-3.9-.3-.5A11.1 11.1 0 1 1 16 27.2Zm6-8.3c-.3-.2-1.9-1-2.2-1.1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.4-.2-1.4-.5-2.6-1.7-1-1-1.7-2-1.9-2.3-.2-.4 0-.5.1-.7l.6-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.5c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-1 .5-.4.4-1.2 1.2-1.2 2.9s1.2 3.3 1.4 3.6c.2.2 2.3 3.6 5.7 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2 .1.6-.1 1.9-.8 2.2-1.6.3-.8.3-1.5.2-1.6-.1-.1-.3-.2-.6-.4Z"/></svg></span>
            <span>Pošalji upit putem WhatsAppa</span>
            <svg class="icon" aria-hidden="true"><use href="#icon-arrow"/></svg>
          </button>
          <p class="form-note">Upit ne potvrđuje rezervaciju. Dostupnost dogovaramo u poruci.</p>

        </form>
      </div>
    </section>

    <section class="gallery" id="fotografije" aria-labelledby="gallery-title">
      <div class="section-heading">
        <div class="section-title"><span class="section-index" aria-hidden="true">02</span><h2 id="gallery-title">Pogled iz svakog ugla.</h2></div>
        <p>Eksterijer &amp; unutrašnjost</p>
      </div>
      <div class="carousel" role="region" aria-roledescription="karusel" aria-label="Fotografije Škode Octavije" tabindex="0">
        <div class="carousel-stage">
          <button class="slide is-active" type="button" data-caption="Bočni profil" aria-label="Uvećaj fotografiju: bočni profil"><img src="/images/original-5.png" alt="Crna Škoda Octavia, bočni pogled" width="1536" height="1152" loading="lazy"></button>
          <button class="slide" type="button" data-caption="Pogled sprijeda" aria-label="Uvećaj fotografiju: pogled sprijeda" tabindex="-1" aria-hidden="true"><img class="portrait" src="/images/original-6.png" alt="Škoda Octavia, pogled sprijeda i sa strane" width="864" height="1536" loading="lazy"></button>
          <button class="slide" type="button" data-caption="Prednji dio" aria-label="Uvećaj fotografiju: prednji dio" tabindex="-1" aria-hidden="true"><img src="/images/original-7.png" alt="Prednji dio crne Škode Octavije" width="1536" height="1152" loading="lazy"></button>
          <button class="slide" type="button" data-caption="Zadnji dio" aria-label="Uvećaj fotografiju: zadnji dio" tabindex="-1" aria-hidden="true"><img src="/images/original-8.png" alt="Zadnji dio crne Škode Octavije" width="1536" height="1152" loading="lazy"></button>
          <button class="slide" type="button" data-caption="Unutrašnjost" aria-label="Uvećaj fotografiju: unutrašnjost" tabindex="-1" aria-hidden="true"><img src="/images/original-9.jpg" alt="Unutrašnjost Škode Octavije, vozačevo mjesto i instrument tabla" width="1536" height="1152" loading="lazy"></button>
        </div>
        <div class="gallery-toolbar">
          <p class="gallery-caption"><span id="slide-count">01 / 05</span><span id="slide-caption">Bočni profil</span></p>
          <div class="carousel-dots" role="group" aria-label="Izaberite fotografiju">
            <button type="button" aria-label="Fotografija 1: bočni profil" aria-current="true"></button>
            <button type="button" aria-label="Fotografija 2: pogled sprijeda" aria-current="false"></button>
            <button type="button" aria-label="Fotografija 3: prednji dio" aria-current="false"></button>
            <button type="button" aria-label="Fotografija 4: zadnji dio" aria-current="false"></button>
            <button type="button" aria-label="Fotografija 5: unutrašnjost" aria-current="false"></button>
          </div>
          <div class="gallery-arrows">
            <button type="button" class="icon-button previous" aria-label="Prethodna fotografija"><svg class="icon" aria-hidden="true"><use href="#icon-arrow"/></svg></button>
            <button type="button" class="icon-button next" aria-label="Sljedeća fotografija"><svg class="icon" aria-hidden="true"><use href="#icon-arrow"/></svg></button>
          </div>
        </div>
        <div class="gallery-thumbnails" role="group" aria-label="Brzi pregled fotografija"></div>
      </div>
    </section>

    <section class="questions" aria-label="Pitanja i kontakt">
      <div class="questions-heading"><p>Za sve detalje tu smo na <a href="tel:+38766028308">+387 66 028 308</a>.</p></div>
      <div class="faq-list">
        <details><summary>Kako da rezervišem automobil?</summary><p>Odaberite uslugu, datum i vrijeme preuzimanja i vraćanja. Dugme otvara WhatsApp s pripremljenom porukom koju vi šaljete. Dostupnost, konačnu cijenu i uslove dogovaramo u odgovoru.</p></details>
        <details><summary>Da li je prikazana cijena konačna?</summary><p>Cijena najma počinje od 150 KM po danu. Kalkulator daje okvirnu procjenu po započetom periodu od 24 sata. Konačna ponuda zavisi od termina i usluge; potvrđujemo je prije rezervacije.</p></details>
        <details><summary>Mogu li dobiti vozilo sa vozačem?</summary><p>Da. U formi izaberite „Najam sa vozačem“, a u napomeni navedite destinaciju i ostale detalje puta. Za ovu uslugu pripremamo ponudu na upit.</p></details>
        <details><summary>Kako dogovaramo mjesto preuzimanja?</summary><p>Unesite željeno mjesto u polje „Mjesto preuzimanja i napomena“. Tačnu lokaciju i mogućnost preuzimanja dogovaramo putem WhatsAppa ili telefonom.</p></details>
      </div>
    </section>
  </main>

  <footer class="site-footer">
    <div class="container footer-inner"><p><strong>GG Rent</strong><span>VIP Transfer</span></p><div class="footer-contact"><a href="tel:+38766028308">+387 66 028 308 <svg class="icon" aria-hidden="true"><use href="#icon-phone"/></svg></a></div></div>
  </footer>

  <dialog class="booking-dialog" id="booking-dialog" aria-labelledby="booking-title">
    <div class="dialog-heading"><h2 id="booking-title">Datum preuzimanja</h2><button class="icon-button" id="booking-close" type="button" aria-label="Zatvori izbor termina"><svg class="icon" aria-hidden="true"><use href="#icon-close"/></svg></button></div>
    <input id="picker-date" type="date" hidden>
    <div class="calendar" aria-label="Izaberite datum">
      <div class="calendar-navigation">
        <button type="button" class="icon-button previous" id="calendar-previous" aria-label="Prethodni mjesec"><svg class="icon" aria-hidden="true"><use href="#icon-arrow"/></svg></button>
        <h3 id="calendar-month" aria-live="polite"></h3>
        <button type="button" class="icon-button" id="calendar-next" aria-label="Sljedeći mjesec"><svg class="icon" aria-hidden="true"><use href="#icon-arrow"/></svg></button>
      </div>
      <div class="calendar-weekdays" id="calendar-weekdays" aria-hidden="true"></div>
      <div class="calendar-days" id="calendar-days" role="group" aria-labelledby="calendar-month"></div>
    </div>
    <div class="time-fields">
      <div class="field"><label for="picker-hour">Sat</label><select id="picker-hour" required></select></div>
      <span class="time-separator" aria-hidden="true">:</span>
      <div class="field"><label for="picker-minute">Minute</label><select id="picker-minute" required></select></div>
    </div>
    <p class="picker-hint">Vrijeme se bira u koracima od 15 minuta.</p>
    <p class="field-error" id="booking-error" role="alert" hidden></p>
    <div class="dialog-actions"><button class="button button-secondary" id="booking-cancel" type="button">Odustani</button><button class="button button-primary" id="booking-confirm" type="button">Potvrdi termin</button></div>
  </dialog>

  <dialog class="lightbox" aria-label="Uvećana fotografija vozila">
    <button class="icon-button lightbox-close" type="button" aria-label="Zatvori fotografiju"><svg class="icon" aria-hidden="true"><use href="#icon-close"/></svg></button>
    <div class="lightbox-stage"><img alt=""></div>
    <div class="lightbox-toolbar">
      <button class="icon-button previous" id="lightbox-previous" type="button" aria-label="Prethodna uvećana fotografija"><svg class="icon" aria-hidden="true"><use href="#icon-arrow"/></svg></button>
      <p class="lightbox-caption" aria-live="polite"></p>
      <button class="icon-button" id="lightbox-next" type="button" aria-label="Sljedeća uvećana fotografija"><svg class="icon" aria-hidden="true"><use href="#icon-arrow"/></svg></button>
    </div>
  </dialog>
  <aside class="mobile-booking" aria-label="Brza rezervacija" hidden>
    <div><span>Škoda Octavia</span><strong id="mobile-estimate">od 150 KM <small>/ dan</small></strong></div>
    <a class="button button-primary" href="#reservation"><span id="mobile-action-label">Izaberite termin</span> <svg class="icon" aria-hidden="true"><use href="#icon-arrow"/></svg></a>
  </aside>

</template>
