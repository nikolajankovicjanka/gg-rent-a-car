// @ts-nocheck
export function initClientHome() {
// Module: date-time.js
    /** Local time helpers shared by the picker and reservation validation. */
    const MINUTE_STEPS = Object.freeze([0, 15, 30, 45]);
    const QUARTER_MS = 15 * 60 * 1000;

    const pad = value => String(value).padStart(2, '0');
    const isValidDate = value => value instanceof Date && Number.isFinite(value.getTime());

    function nextQuarter(now = new Date()) {
        return new Date((Math.floor(now.getTime() / QUARTER_MS) + 1) * QUARTER_MS);
    }

    function dateValue(date) {
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    }

    function localValue(date) {
        return `${dateValue(date)}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }

    function formatDate(date, separator = ' u ') {
        return `${pad(date.getDate())}.${pad(date.getMonth() + 1)}.${date.getFullYear()}.${separator}${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }

    function minimumTime(kind, pickup, now = new Date()) {
        const upcoming = nextQuarter(now);
        if (kind !== 'dropoff' || !isValidDate(pickup)) return upcoming;
        return new Date(Math.max(upcoming.getTime(), pickup.getTime() + QUARTER_MS));
    }

    function bookingErrors(pickup, dropoff, now = new Date()) {
        const errors = { pickup: '', dropoff: '' };
        const validStart = isValidDate(pickup);
        const validEnd = isValidDate(dropoff);
        if (!validStart) errors.pickup = 'Ovo polje je obavezno.';
        if (!validEnd) errors.dropoff = 'Ovo polje je obavezno.';
        if (validStart && pickup < nextQuarter(now)) errors.pickup = 'Izaberite budući termin preuzimanja.';
        if (validStart && pickup.getMinutes() % 15 !== 0) errors.pickup = 'Izaberite minute 00, 15, 30 ili 45.';
        if (validEnd && dropoff < nextQuarter(now)) errors.dropoff = 'Izaberite budući termin vraćanja.';
        if (validEnd && dropoff.getMinutes() % 15 !== 0) errors.dropoff = 'Izaberite minute 00, 15, 30 ili 45.';
        if (validStart && validEnd && dropoff <= pickup) errors.dropoff = 'Vraćanje mora biti nakon preuzimanja.';
        return errors;
    }

// Module: pricing.js

    const DAILY_RATE = 150;
    const SERVICE_OPTIONS = Object.freeze({
        rental: 'Kratkoročni najam',
        driver: 'Najam sa vozačem',
        business: 'Najam za kompaniju',
        longterm: 'Dugoročni najam',
    });
    const DAY_MS = 24 * 60 * 60 * 1000;

    /** Presets are exact 24-hour periods, including across daylight-saving changes. */
    function addRentalDays(start, days) {
        return new Date(start.getTime() + days * DAY_MS);
    }

    function rentalEstimate(start, end, service = 'rental') {
        if (!isValidDate(start) || !isValidDate(end) || end <= start) return null;
        const minutes = Math.round((end.getTime() - start.getTime()) / 60000);
        const days = Math.ceil(minutes / 1440);
        return { minutes, days, amount: service === 'rental' ? days * DAILY_RATE : null };
    }

    function durationLabel(minutes) {
        const days = Math.floor(minutes / 1440);
        const hours = Math.floor(minutes % 1440 / 60);
        const rest = minutes % 60;
        return [days ? `${days} ${days === 1 ? 'dan' : 'dana'}` : '', hours ? `${hours} h` : '', rest ? `${rest} min` : ''].filter(Boolean).join(' · ');
    }

    function money(amount) {
        return new Intl.NumberFormat('bs-BA', { maximumFractionDigits: 0 }).format(amount) + ' KM';
    }

    function reservationMessage(pickup, dropoff, note = '', options = {}) {
        const service = SERVICE_OPTIONS[options.service] || SERVICE_OPTIONS.rental;
        const location = options.location?.trim();
        const additionalNote = note.trim();
        return `Dobar dan,\n\nJavljam se sa zahtjevom da rezervišem automobil Škoda Octavia od ${formatDate(pickup)} do ${formatDate(dropoff)}.\n\nUsluga: ${service}.${location ? `\nŽeljeno mjesto preuzimanja: ${location}` : ''}${additionalNote ? `\nDodatna napomena: ${additionalNote}` : ''}\n\nDa li možete da mi pošaljete ponudu?\n\nPozdrav`;
    }

// Module: calendar.js

    const MONTHS = ['Januar', 'Februar', 'Mart', 'April', 'Maj', 'Juni', 'Juli', 'August', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'];
    const WEEKDAYS = ['Pon', 'Uto', 'Sri', 'Čet', 'Pet', 'Sub', 'Ned'];

    /** Keyboard-friendly month calendar; the hidden date input remains the data source. */
    function initCalendar(input) {
        const grid = document.querySelector('#calendar-days');
        const heading = document.querySelector('#calendar-month');
        const previous = document.querySelector('#calendar-previous');
        const next = document.querySelector('#calendar-next');
        const weekdays = document.querySelector('#calendar-weekdays');
        let view = new Date();
        let focusedValue = '';
        const parse = value => {
            const [year, month, day] = value.split('-').map(Number);
            return new Date(year, month - 1, day, 12);
        };

        weekdays.replaceChildren(...WEEKDAYS.map(day => {
            const label = document.createElement('span');
            label.textContent = day;
            return label;
        }));

        function render(focus = false) {
            heading.textContent = `${MONTHS[view.getMonth()]} ${view.getFullYear()}`;
            const first = new Date(view.getFullYear(), view.getMonth(), 1, 12);
            const offset = (first.getDay() + 6) % 7;
            const length = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
            const min = parse(input.min);
            previous.disabled = first <= new Date(min.getFullYear(), min.getMonth(), 1, 12);
            const visibleValues = Array.from({ length }, (_, i) => dateValue(new Date(view.getFullYear(), view.getMonth(), i + 1, 12)));
            const focusValue = visibleValues.includes(focusedValue) && focusedValue >= input.min
                ? focusedValue : visibleValues.includes(input.value) && input.value >= input.min
                    ? input.value : visibleValues.find(value => value >= input.min);
            const cells = Array.from({ length: offset }, () => {
                const cell = document.createElement('span');
                cell.setAttribute('aria-hidden', 'true');
                return cell;
            });
            visibleValues.forEach((value, i) => {
                const button = document.createElement('button');
                button.type = 'button';
                button.textContent = String(i + 1);
                button.dataset.date = value;
                button.disabled = value < input.min;
                button.tabIndex = value === focusValue ? 0 : -1;
                button.setAttribute('aria-label', `${i + 1}. ${MONTHS[view.getMonth()].toLowerCase()} ${view.getFullYear()}.`);
                button.setAttribute('aria-pressed', String(value === input.value));
                if (value === dateValue(new Date())) button.setAttribute('aria-current', 'date');
                button.addEventListener('click', () => select(value));
                cells.push(button);
            });
            grid.replaceChildren(...cells);
            if (focus) grid.querySelector('button[tabindex="0"]')?.focus();
        }

        function select(value) {
            focusedValue = value;
            input.value = value;
            input.dispatchEvent(new Event('change', { bubbles: true }));
            render(true);
        }

        function changeMonth(direction) {
            view = new Date(view.getFullYear(), view.getMonth() + direction, 1, 12);
            focusedValue = '';
            render();
        }
        previous.addEventListener('click', () => changeMonth(-1));
        next.addEventListener('click', () => changeMonth(1));
        grid.addEventListener('keydown', event => {
            const value = event.target.dataset.date;
            if (!value) return;
            const date = parse(value);
            const day = (date.getDay() + 6) % 7;
            const offsets = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7, Home: -day, End: 6 - day };
            if (event.key in offsets) date.setDate(date.getDate() + offsets[event.key]);
            else if (event.key === 'PageUp' || event.key === 'PageDown') {
                const targetMonth = date.getMonth() + (event.key === 'PageUp' ? -1 : 1);
                const last = new Date(date.getFullYear(), targetMonth + 1, 0).getDate();
                date.setDate(Math.min(date.getDate(), last));
                date.setMonth(targetMonth);
            } else return;
            event.preventDefault();
            focusedValue = dateValue(date) < input.min ? input.min : dateValue(date);
            const target = parse(focusedValue);
            view = new Date(target.getFullYear(), target.getMonth(), 1, 12);
            render(true);
        });

        return {
            refresh() {
                const selected = parse(input.value || input.min);
                view = new Date(selected.getFullYear(), selected.getMonth(), 1, 12);
                focusedValue = input.value;
                render();
            },
        };
    }

// Module: ui.js
    function initPageUI() {
        const bar = document.querySelector('.mobile-booking');
        const form = document.querySelector('#reservation');
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver(([entry]) => {
                bar.hidden = entry.isIntersecting && entry.intersectionRatio >= 0.15;
            }, { threshold: [0, 0.15] });
            observer.observe(form);
        } else bar.hidden = false;
    }

// Module: booking.js

    function initBooking() {
        const form = document.querySelector('#reservation');
        const fields = { pickup: document.querySelector('#pickup'), dropoff: document.querySelector('#dropoff') };
        const dialog = document.querySelector('#booking-dialog');
        const date = document.querySelector('#picker-date');
        const hour = document.querySelector('#picker-hour');
        const minute = document.querySelector('#picker-minute');
        const error = document.querySelector('#booking-error');
        const service = form.elements.service;
        const presets = [...form.querySelectorAll('[data-days]')];
        const calendar = initCalendar(date);
        const fieldErrors = {
            pickup: document.querySelector('#pickup-error'),
            dropoff: document.querySelector('#dropoff-error'),
        };
        const summary = {
            label: document.querySelector('#estimate-label'),
            price: document.querySelector('#estimate-price'),
            description: document.querySelector('#estimate-duration'),
            disclaimer: document.querySelector('#estimate-disclaimer'),
            hint: document.querySelector('#estimate-hint'),
            mobilePrice: document.querySelector('#mobile-estimate'),
            mobileAction: document.querySelector('#mobile-action-label'),
        };
        const dialogTitle = document.querySelector('#booking-title');
        let activeKind = 'pickup';
        let pendingDays = null;
        let validationAttempted = false;

        function selected(kind) {
            const value = fields[kind].dataset.value;
            const result = value ? new Date(value) : null;
            return isValidDate(result) ? result : null;
        }

        function setFieldError(kind, message = '') {
            const input = fields[kind];
            const messageElement = fieldErrors[kind];
            messageElement.textContent = message;
            messageElement.hidden = !message;
            input.setAttribute('aria-invalid', message ? 'true' : 'false');
        }

        function writeValue(kind, choice) {
            fields[kind].dataset.value = localValue(choice);
            fields[kind].value = formatDate(choice, ' · ');
            setFieldError(kind);
        }

        function message() {
            return reservationMessage(selected('pickup'), selected('dropoff'), form.elements.note.value, {
                service: service.value, location: form.elements.location.value,
            });
        }

        function refreshSummary() {
            const pickup = selected('pickup');
            const dropoff = selected('dropoff');
            const errors = bookingErrors(pickup, dropoff);
            const valid = !errors.pickup && !errors.dropoff;
            const estimate = valid ? rentalEstimate(pickup, dropoff, service.value) : null;
            const rental = service.value === 'rental';
            const { price, description, disclaimer, hint } = summary;
            const rentalPrice = estimate ? `od ${money(estimate.amount)}` : 'od 150 KM / dan';
            summary.label.textContent = rental ? '* Okvirna cijena najma' : '* Ponuda za izabranu uslugu';
            price.textContent = rental ? rentalPrice : 'Na upit';
            description.textContent = estimate
                ? `${durationLabel(estimate.minutes)}${rental ? ` · ${estimate.days} × od 150 KM` : ' · individualna ponuda'}`
                : '';
            description.hidden = !estimate;
            hint.hidden = valid;
            hint.textContent = rental
                ? '* Izaberite oba termina za procjenu ukupne cijene.'
                : '* Izaberite oba termina za zahtjev za ponudu.';
            disclaimer.hidden = !estimate || !rental;
            summary.mobilePrice.textContent = rental ? rentalPrice : 'Ponuda na upit';
            summary.mobileAction.textContent = valid ? 'Pošaljite upit' : 'Izaberite termin';

            presets.forEach(button => {
                const matches = estimate && estimate.minutes === Number(button.dataset.days) * 1440;
                button.setAttribute('aria-pressed', String(Boolean(matches)));
            });
            if (validationAttempted) Object.entries(errors).forEach(([kind, text]) => setFieldError(kind, text));
        }

        function setOptions(select, values, preferred) {
            select.replaceChildren(...values.map(value => new Option(pad(value), pad(value))));
            if (values.includes(Number(preferred))) select.value = pad(preferred);
        }

        function dateAt(hours, minutes) {
            if (!date.value) return null;
            const [year, month, day] = date.value.split('-').map(Number);
            return new Date(year, month - 1, day, hours, minutes);
        }

        function updateTimeChoices(preferred) {
            const min = minimumTime(activeKind, selected('pickup'));
            date.min = dateValue(min);
            if (!date.value) {
                hour.replaceChildren();
                minute.replaceChildren();
                return;
            }
            if (date.value < date.min) date.value = date.min;
            const preferredHour = preferred?.getHours() ?? Number(hour.value);
            const preferredMinute = preferred?.getMinutes() ?? Number(minute.value);
            const hours = Array.from({ length: 24 }, (_, value) => value)
                .filter(value => MINUTE_STEPS.some(step => dateAt(value, step) >= min));
            setOptions(hour, hours, preferredHour);
            const minutes = MINUTE_STEPS.filter(step => dateAt(Number(hour.value), step) >= min);
            setOptions(minute, minutes, preferredMinute);
        }

        function openPicker(kind, days = null) {
            activeKind = kind;
            pendingDays = days;
            const min = minimumTime(kind, selected('pickup'));
            const existing = selected(kind);
            const preferred = existing && existing >= min ? existing : min;
            dialogTitle.textContent = kind === 'pickup' ? 'Datum preuzimanja' : 'Datum vraćanja';
            error.hidden = true;
            date.value = dateValue(preferred);
            updateTimeChoices(preferred);
            calendar.refresh();
            dialog.showModal();
            document.querySelector('#calendar-days [tabindex="0"]')?.focus();
        }

        Object.entries(fields).forEach(([kind, input]) => {
            input.addEventListener('click', () => openPicker(kind));
            input.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    openPicker(kind);
                }
            });
        });

        presets.forEach(button => button.addEventListener('click', () => {
            const days = Number(button.dataset.days);
            const pickup = selected('pickup');
            if (!pickup || pickup < minimumTime('pickup')) { openPicker('pickup', days); return; }
            writeValue('dropoff', addRentalDays(pickup, days));
            refreshSummary();
        }));

        date.addEventListener('change', () => { updateTimeChoices(); error.hidden = true; });
        hour.addEventListener('change', () => { updateTimeChoices(); error.hidden = true; });
        minute.addEventListener('change', () => { error.hidden = true; });
        ['#booking-cancel', '#booking-close'].forEach(selector => {
            document.querySelector(selector).addEventListener('click', () => dialog.close());
        });
        dialog.addEventListener('close', () => { pendingDays = null; });

        document.querySelector('#booking-confirm').addEventListener('click', () => {
            const choice = date.value && hour.value !== '' && minute.value !== ''
                ? dateAt(Number(hour.value), Number(minute.value)) : null;
            const min = minimumTime(activeKind, selected('pickup'));
            if (!isValidDate(choice) || choice < min || !MINUTE_STEPS.includes(choice.getMinutes())) {
                error.textContent = 'Izaberite budući termin u koracima od 15 minuta.';
                error.hidden = false;
                updateTimeChoices();
                calendar.refresh();
                return;
            }
            writeValue(activeKind, choice);
            if (activeKind === 'pickup') {
                if (pendingDays) writeValue('dropoff', addRentalDays(choice, pendingDays));
                else if (selected('dropoff') && selected('dropoff') <= choice) {
                    fields.dropoff.value = '';
                    delete fields.dropoff.dataset.value;
                    setFieldError('dropoff', 'Izaberite novi datum vraćanja.');
                }
            }
            refreshSummary();
            dialog.close();
            fields[activeKind].focus();
        });

        service.addEventListener('change', refreshSummary);
        document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshSummary(); });

        form.addEventListener('submit', event => {
            event.preventDefault();
            validationAttempted = true;
            refreshSummary();
            const errors = bookingErrors(selected('pickup'), selected('dropoff'));
            const firstInvalid = Object.keys(errors).find(kind => errors[kind]);
            if (firstInvalid) { fields[firstInvalid].focus(); return; }
            window.location.href = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(message())}`;
        });
        refreshSummary();
    }

// Module: gallery.js
    function initGallery() {
        const carousel = document.querySelector('.carousel');
        const slides = [...carousel.querySelectorAll('.slide')];
        const dots = [...carousel.querySelectorAll('.carousel-dots button')];
        const dialog = document.querySelector('.lightbox');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const progress = document.createElement('span');
        progress.className = 'gallery-progress';
        progress.setAttribute('aria-hidden', 'true');
        carousel.querySelector('.carousel-stage').append(progress);
        let active = 0;
        let timer;
        let animation;
        let hovered = false;
        let paused = reducedMotion.matches;
        let ignoreClickUntil = 0;
        let opener;

        const thumbnails = slides.map((slide, index) => {
            const button = document.createElement('button');
            const image = slide.querySelector('img').cloneNode();
            image.alt = '';
            const title = document.createElement('span');
            title.textContent = slide.dataset.caption;
            button.type = 'button';
            button.setAttribute('aria-label', `Prikaži fotografiju: ${slide.dataset.caption}`);
            button.append(image, title);
            button.addEventListener('click', () => navigate(index));
            return button;
        });
        carousel.querySelector('.gallery-thumbnails').replaceChildren(...thumbnails);

        function showSlide(index) {
            active = (index + slides.length) % slides.length;
            slides.forEach((slide, i) => {
                slide.classList.toggle('is-active', i === active);
                slide.setAttribute('aria-hidden', String(i !== active));
                slide.tabIndex = i === active ? 0 : -1;
            });
            [...dots, ...thumbnails].forEach((button, i) => button.setAttribute('aria-current', String(i % slides.length === active)));
            document.querySelector('#slide-count').textContent = `${String(active + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
            document.querySelector('#slide-caption').textContent = slides[active].dataset.caption;
            if (dialog.open) updateLightbox();
        }

        function updateLightbox() {
            const source = slides[active].querySelector('img');
            const image = dialog.querySelector('img');
            image.src = source.src;
            image.alt = source.alt;
            dialog.querySelector('.lightbox-caption').textContent = `${active + 1} / ${slides.length} — ${slides[active].dataset.caption}`;
        }

        function restart() {
            clearInterval(timer);
            animation?.cancel();
            if (document.hidden || paused || hovered || dialog.open || carousel.contains(document.activeElement)) return;
            animation = progress.animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: 5000, iterations: Infinity });
            timer = setInterval(() => showSlide(active + 1), 5000);
        }

        function navigate(index) { showSlide(index); restart(); }
        function openLightbox(index, trigger) {
            if (Date.now() < ignoreClickUntil) return;
            opener = trigger;
            showSlide(index);
            updateLightbox();
            dialog.showModal();
            restart();
        }

        dots.forEach((dot, index) => dot.addEventListener('click', () => navigate(index)));
        carousel.querySelector('.previous').addEventListener('click', () => navigate(active - 1));
        carousel.querySelector('.next').addEventListener('click', () => navigate(active + 1));
        carousel.addEventListener('keydown', event => {
            if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
            event.preventDefault();
            const slideFocused = slides.includes(document.activeElement);
            navigate(active + (event.key === 'ArrowRight' ? 1 : -1));
            if (slideFocused) slides[active].focus();
        });
        carousel.addEventListener('mouseenter', () => { hovered = true; restart(); });
        carousel.addEventListener('mouseleave', () => { hovered = false; restart(); });
        carousel.addEventListener('focusin', restart);
        carousel.addEventListener('focusout', () => queueMicrotask(restart));
        document.addEventListener('visibilitychange', restart);
        reducedMotion.addEventListener('change', () => { paused = reducedMotion.matches; restart(); });

        function enableSwipe(surface) {
            let origin = null;
            surface.addEventListener('touchstart', event => {
                origin = { x: event.changedTouches[0].screenX, y: event.changedTouches[0].screenY };
                clearInterval(timer);
                animation?.cancel();
            }, { passive: true });
            surface.addEventListener('touchend', event => {
                if (!origin) return;
                const dx = event.changedTouches[0].screenX - origin.x;
                const dy = event.changedTouches[0].screenY - origin.y;
                if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
                    ignoreClickUntil = Date.now() + 500;
                    showSlide(active + (dx < 0 ? 1 : -1));
                }
                origin = null;
                restart();
            }, { passive: true });
            surface.addEventListener('touchcancel', () => { origin = null; restart(); }, { passive: true });
        }
        enableSwipe(carousel.querySelector('.carousel-stage'));
        enableSwipe(dialog.querySelector('.lightbox-stage'));
        slides.forEach((slide, index) => slide.addEventListener('click', () => openLightbox(index, slide)));
        const heroButton = document.querySelector('.hero-expand');
        heroButton.addEventListener('click', () => openLightbox(1, heroButton));
        dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
        dialog.querySelector('#lightbox-previous').addEventListener('click', () => navigate(active - 1));
        dialog.querySelector('#lightbox-next').addEventListener('click', () => navigate(active + 1));
        dialog.addEventListener('keydown', event => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                event.preventDefault();
                navigate(active + (event.key === 'ArrowRight' ? 1 : -1));
            }
        });
        dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
        dialog.addEventListener('close', () => {
            if (opener === heroButton) heroButton.focus();
            else thumbnails[active].focus();
            restart();
        });
        showSlide(0);
        restart();
    }

// Module: services.js
    const SERVICES = Object.freeze([
        'Iznajmljivanje automobila sa šoferom',
        'Kratkoročno izdavanje',
        'Dugoročno izdavanje',
        'Najam automobila kompanijama',
    ]);

    function initServices() {
        const text = document.querySelector('#service-text');
        const strip = document.querySelector('.services');
        let index = 0;
        let timer;
        let hovered = false;

        function restart() {
            clearInterval(timer);
            if (document.hidden || hovered) return;
            timer = setInterval(() => {
                index = (index + 1) % SERVICES.length;
                text.textContent = SERVICES[index];
            }, 5000);
        }

        strip.addEventListener('mouseenter', () => { hovered = true; restart(); });
        strip.addEventListener('mouseleave', () => { hovered = false; restart(); });
        document.addEventListener('visibilitychange', restart);
        restart();
    }

// Module: app.js

    initBooking();
    initGallery();
    initServices();
    initPageUI();

}