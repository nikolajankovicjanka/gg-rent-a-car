<template>
  <footer class="footer">
    <div class="container footer-grid">
      <div>
        <h2>GG RENT <span class="accent">VIP TRANSFER</span></h2>
        <p>Vaše putovanje. Naša briga.</p>
      </div>
      <div>
        <strong>Brzi linkovi</strong>
        <p><RouterLink to="/vozila">Naša vozila</RouterLink></p>
        <p><RouterLink to="/prati-rezervaciju">Provjera rezervacije</RouterLink></p>
      </div>
      <div>
        <strong>Kontakt</strong>
        <p>Rezervacije putem web forme ili WhatsAppa.</p>
      </div>
    </div>
    <div class="container copyright">
      © {{ new Date().getFullYear() }} GG Rent. Sva prava zadržana.
    </div>
  </footer>
</template>
