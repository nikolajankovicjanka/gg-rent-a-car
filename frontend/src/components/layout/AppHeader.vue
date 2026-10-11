<template>
  <header class="header">
    <RouterLink
      to="/"
      class="brand"
      ><span class="brand-icon">GG</span
      ><span>GG RENT <small>VIP TRANSFER</small></span></RouterLink
    >
    <nav>
      <RouterLink to="/">Početna</RouterLink><RouterLink to="/vozila">Vozila</RouterLink
      ><RouterLink to="/prati-rezervaciju">Prati upit</RouterLink>
    </nav>
    <RouterLink
      class="btn btn-outline"
      to="/vozila"
      >Rezerviši vozilo ↗</RouterLink
    >
  </header>
</template>
