<script setup lang="ts">
import { computed, ref } from 'vue';
import type { BusyRange } from '../../types';

const props = defineProps<{
  busy: BusyRange[];
  start: string;
  end: string;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  select: [value: string];
}>();

const cursor = ref(new Date(new Date().getFullYear(), new Date().getMonth(), 1));

const year = computed(() => cursor.value.getFullYear());
const month = computed(() => cursor.value.getMonth());

const label = computed(() =>
  cursor.value.toLocaleDateString('bs-BA', {
    month: 'long',
    year: 'numeric',
  }),
);

const today = () => {
  const now = new Date();

  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
};

const currentMonth = () => {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1);
};

const isPreviousMonthDisabled = computed(() => cursor.value.getTime() <= currentMonth().getTime());

const cells = computed<(number | null)[]>(() => {
  const firstDay = new Date(year.value, month.value, 1);

  const offset = (firstDay.getDay() + 6) % 7;

  const daysInMonth = new Date(year.value, month.value + 1, 0).getDate();

  return [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
});

function iso(day: number): string {
  return `${year.value}-${String(month.value + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function occupied(day: number): boolean {
  const date = iso(day);

  return props.busy.some((range) => date >= range.start && date < range.end);
}

function past(day: number): boolean {
  return iso(day) < today();
}

function selected(day: number): boolean {
  const date = iso(day);

  return props.start === date || props.end === date;
}

function inRange(day: number): boolean {
  const date = iso(day);

  return Boolean(props.start && props.end && date > props.start && date < props.end);
}

function isDisabled(day: number): boolean {
  return Boolean(props.disabled || occupied(day) || past(day));
}

function move(direction: number) {
  const next = new Date(year.value, month.value + direction, 1);

  if (next < currentMonth()) return;

  cursor.value = next;
}
</script>

<template>
  <div class="calendar">
    <div class="calendar-top">
      <button
        type="button"
        :disabled="isPreviousMonthDisabled"
        aria-label="Prethodni mjesec"
        @click="move(-1)"
      >
        ←
      </button>

      <strong>{{ label }}</strong>

      <button
        type="button"
        aria-label="Sljedeći mjesec"
        @click="move(1)"
      >
        →
      </button>
    </div>

    <div class="calendar-grid">
      <span
        v-for="day in ['Po', 'Ut', 'Sr', 'Če', 'Pe', 'Su', 'Ne']"
        :key="day"
        class="weekday"
      >
        {{ day }}
      </span>

      <template
        v-for="(day, index) in cells"
        :key="index"
      >
        <span v-if="day === null"></span>

        <button
          v-else
          type="button"
          :disabled="isDisabled(day)"
          :class="{
            busy: occupied(day),
            selected: selected(day),
            range: inRange(day),
          }"
          :title="occupied(day) ? 'Zauzeto' : past(day) ? 'Datum je prošao' : 'Slobodno'"
          :aria-label="`${iso(day)} - ${occupied(day) ? 'Zauzeto' : 'Slobodno'}`"
          @click="emit('select', iso(day))"
        >
          {{ day }}
        </button>
      </template>
    </div>

    <div class="calendar-legend">
      <span>
        <i class="legend-free"></i>
        Slobodno
      </span>

      <span>
        <i class="legend-busy"></i>
        Zauzeto
      </span>

      <span>
        <i class="legend-selected"></i>
        Odabrano
      </span>
    </div>
  </div>
</template>
