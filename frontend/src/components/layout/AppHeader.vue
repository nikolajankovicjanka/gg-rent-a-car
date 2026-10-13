<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { setLocale, type AppLocale } from '../../i18n';

const route = useRoute();
const { t, locale } = useI18n();

const menuOpen = ref(false);
const scrolled = ref(false);
const scrollProgress = ref(0);
let scrollFrame = 0;

const currentLocale = computed(() => locale.value as AppLocale);

const languages: { code: AppLocale; label: string }[] = [
  { code: 'sr', label: 'SR' },
  { code: 'en', label: 'EN' },
  { code: 'de', label: 'DE' },
];

const navItems = computed(() => [
  { to: '/', label: t('nav.home') },
  { to: '/vozila', label: t('nav.vehicles') },
  { to: '/prati-rezervaciju', label: t('nav.tracking') },
]);

function changeLanguage(event: Event) {
  const target = event.target as HTMLSelectElement;
  setLocale(target.value as AppLocale);
}

function closeMenu() {
  menuOpen.value = false;
}

function updateScroll() {
  scrolled.value = window.scrollY > 20;

  // Koristimo requestAnimationFrame da ne ažuriramo Vue na svaki scroll event.
  if (scrollFrame) return;

  scrollFrame = window.requestAnimationFrame(() => {
    const maxScroll = Math.max(
        0,
        document.documentElement.scrollHeight - window.innerHeight,
    );

    scrollProgress.value = maxScroll > 0
        ? Math.min(1, Math.max(0, window.scrollY / maxScroll))
        : 0;

    scrollFrame = 0;
  });
}

onMounted(() => {
  updateScroll();
  window.addEventListener('scroll', updateScroll, { passive: true });
  window.addEventListener('resize', updateScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll);
  window.removeEventListener('resize', updateScroll);
  if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
});
</script>

<template>
  <header class="premium-header" :class="{ 'is-scrolled': scrolled }">
    <div class="premium-header__inner">
      <RouterLink to="/" class="premium-brand" @click="closeMenu">
        <img
            src="/images/gg-group-logo-white.png"
            alt="G Group"
            class="premium-brand__logo"
        />

        <span class="premium-brand__copy">
          <strong>GG RENT</strong>
          <small>VIP TRANSFER</small>
        </span>
      </RouterLink>

      <nav class="premium-nav" aria-label="Main navigation">
        <RouterLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            :class="{ 'is-active': route.path === item.to }"
        >
          {{ item.label }}
        </RouterLink>
      </nav>

      <div class="premium-actions">
        <div class="premium-language">
          <svg
              viewBox="0 0 24 24"
              width="17"
              height="17"
              fill="none"
              stroke="currentColor"
              stroke-width="1.7"
              aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" />
            <path d="M3 12h18M12 3c-5 5-5 13 0 18M12 3c5 5 5 13 0 18" />
          </svg>

          <select
              :value="currentLocale"
              aria-label="Select language"
              @change="changeLanguage"
          >
            <option
                v-for="language in languages"
                :key="language.code"
                :value="language.code"
            >
              {{ language.label }}
            </option>
          </select>
        </div>

        <RouterLink to="/vozila" class="premium-cta">
          {{ t('nav.booking') }}
          <span aria-hidden="true">↗</span>
        </RouterLink>

        <button
            type="button"
            class="premium-menu-toggle"
            :aria-expanded="menuOpen"
            aria-label="Toggle navigation"
            @click="menuOpen = !menuOpen"
        >
          <span :class="{ active: menuOpen }"></span>
          <span :class="{ active: menuOpen }"></span>
          <span :class="{ active: menuOpen }"></span>
        </button>
      </div>
    </div>

    <nav
        v-if="menuOpen"
        class="premium-mobile-nav"
        aria-label="Mobile navigation"
    >
      <RouterLink
          v-for="item in navItems"
          :key="item.to"
          :to="item.to"
          @click="closeMenu"
      >
        {{ item.label }}
      </RouterLink>

      <RouterLink
          to="/vozila"
          class="premium-mobile-cta"
          @click="closeMenu"
      >
        {{ t('nav.booking') }} ↗
      </RouterLink>
    </nav>

    <div class="premium-road" aria-hidden="true">
      <div class="premium-road__line"></div>

      <div
          class="premium-road__car"
          :style="{ left: `calc((100% - 82px) * ${1 - scrollProgress})` }"
      >
        <svg
            viewBox="0 0 124 42"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
        >
          <path
              d="M7 27L17 24L32 10Q36 7 43 7H76Q83 7 89 13L101 23L114 26Q119 27 119 32V35H6V31Q6 28 7 27Z"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linejoin="round"
          />

          <path
              d="M34 11H76Q81 11 85 15L94 23H23L34 11Z"
              stroke="currentColor"
              stroke-width="1.4"
          />

          <path
              d="M58 11V23M16 28H24M102 28H115"
              stroke="currentColor"
              stroke-width="1.4"
          />

          <circle cx="30" cy="35" r="6" fill="#101820" stroke="currentColor" stroke-width="2"/>
          <circle cx="96" cy="35" r="6" fill="#101820" stroke="currentColor" stroke-width="2"/>

          <path
              d="M120 29H124"
              stroke="#FFF1CF"
              stroke-width="2"
              stroke-linecap="round"
          />
        </svg>
      </div>
    </div>
  </header>
</template>

<style scoped>
.premium-header {
  --gold: #ddba80;
  --navy: #101820;

  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  color: #f4f5f7;
  background: rgba(16, 24, 32, 0.96);
  border-bottom: 1px solid rgba(221, 186, 128, 0.15);
  transition:
      background 0.3s ease,
      box-shadow 0.3s ease;
}

.premium-header.is-scrolled {
  background: rgba(16, 24, 32, 0.91);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  box-shadow: 0 10px 35px rgba(0, 0, 0, 0.22);
}

.premium-header__inner {
  width: min(100% - 48px, 1380px);
  min-height: 86px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.premium-brand {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  color: inherit;
  flex-shrink: 0;
}

.premium-brand__logo {
  width: 46px;
  height: 52px;
  object-fit: contain;
}

.premium-brand__copy {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.premium-brand__copy strong {
  font-size: 19px;
  font-weight: 750;
  letter-spacing: 0.13em;
  line-height: 1;
  color: var(--gold);
}

.premium-brand__copy small {
  font-size: 9px;
  letter-spacing: 0.3em;
  color: #aeb6c1;
}

.premium-nav {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px;
  background: rgba(255, 255, 255, 0.045);
  border: 1px solid rgba(255, 255, 255, 0.065);
  border-radius: 100px;
}

.premium-nav a {
  position: relative;
  padding: 11px 19px;
  color: #c7cbd1;
  font-size: 13px;
  font-weight: 500;
  text-decoration: none;
  border-radius: 100px;
  transition: 0.2s ease;
}

.premium-nav a:hover,
.premium-nav a.is-active {
  color: var(--gold);
  background: rgba(221, 186, 128, 0.09);
}

.premium-actions {
  display: flex;
  align-items: center;
  gap: 14px;
}

.premium-language {
  display: flex;
  align-items: center;
  gap: 7px;
  padding: 10px 12px;
  border-radius: 100px;
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: var(--gold);
}

.premium-language select {
  width: 44px;
  padding: 0;
  background: transparent;
  border: none;
  outline: none;
  color: #f5f5f5;
  font: inherit;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.premium-language option {
  color: #101820;
  background: white;
}

.premium-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 13px 19px;
  border-radius: 100px;
  background: var(--gold);
  color: #101820;
  text-decoration: none;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
  transition: 0.25s ease;
}

.premium-cta:hover {
  background: #f0d4a4;
  transform: translateY(-2px);
}

.premium-menu-toggle {
  display: none;
  width: 42px;
  height: 42px;
  padding: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 12px;
  background: transparent;
  cursor: pointer;
}

.premium-menu-toggle span {
  width: 19px;
  height: 2px;
  background: var(--gold);
  transition: 0.2s ease;
}

.premium-menu-toggle span:first-child.active {
  transform: translateY(7px) rotate(45deg);
}

.premium-menu-toggle span:nth-child(2).active {
  opacity: 0;
}

.premium-menu-toggle span:last-child.active {
  transform: translateY(-7px) rotate(-45deg);
}

.premium-mobile-nav {
  display: none;
}

/* Animirana linija i automobil */
.premium-road {
  position: relative;
  height: 35px;
  overflow: hidden;
  pointer-events: none;
}

.premium-road__line {
  position: absolute;
  bottom: 3px;
  width: 100%;
  height: 1px;
  background: linear-gradient(
      90deg,
      transparent,
      rgba(221, 186, 128, 0.5),
      transparent
  );
}

.premium-road__car {
  position: absolute;
  bottom: 3px;
  left: 0;
  width: 82px;
  color: var(--gold);
  filter: drop-shadow(0 0 4px rgba(221, 186, 128, 0.3));
  transition: left 0.09s linear;
}

.premium-road__car svg {
  display: block;
  width: 100%;
  transform: scaleX(-1);
}

@media (max-width: 1100px) {
  .premium-nav {
    gap: 0;
  }

  .premium-nav a {
    padding: 10px 12px;
  }

  .premium-header__inner {
    width: min(100% - 32px, 1380px);
    gap: 12px;
  }
}

@media (max-width: 900px) {
  .premium-header__inner {
    min-height: 74px;
  }

  .premium-nav,
  .premium-cta,
  .premium-road {
    display: none;
  }

  .premium-menu-toggle {
    display: flex;
  }

  .premium-mobile-nav {
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px 20px 24px;
    background: #101820;
    border-top: 1px solid rgba(255, 255, 255, 0.07);
  }

  .premium-mobile-nav a {
    padding: 13px 15px;
    color: #f5f5f5;
    text-decoration: none;
    border-radius: 10px;
  }

  .premium-mobile-nav a.router-link-active {
    color: var(--gold);
    background: rgba(221, 186, 128, 0.08);
  }

  .premium-mobile-nav .premium-mobile-cta {
    margin-top: 6px;
    background: var(--gold);
    color: #101820;
    font-weight: 700;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .premium-header__inner {
    width: calc(100% - 24px);
  }

  .premium-brand__logo {
    width: 36px;
    height: 44px;
  }

  .premium-brand__copy strong {
    font-size: 15px;
  }

  .premium-brand__copy small {
    font-size: 8px;
  }

  .premium-actions {
    gap: 8px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .premium-road__car {
    transition: none;
  }
}
</style>
