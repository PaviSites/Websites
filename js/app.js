document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTabs();
    initBookingWizard();
});

/* --- Navigation & Mobile Menu --- */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li a');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('toggle');
    });

    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Smooth scroll for anchor links (polyfill support if needed, mostly pure CSS handles it now)
}

/* --- Pricing Tabs --- */
function initTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.pricing-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;

            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to current
            btn.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
}

/* --- Booking Wizard --- */
function initBookingWizard() {
    let currentStep = 1;
    const totalSteps = 3;
    const form = document.getElementById('booking-form');
    const successMsg = document.getElementById('booking-success');

    const steps = document.querySelectorAll('.step');
    const panes = document.querySelectorAll('.wizard-pane');

    // State to hold booking data
    const bookingData = {
        service: '',
        serviceName: '',
        price: '',
        date: '',
        time: '',
        name: '',
        email: '',
        phone: ''
    };

    // Populate Time Select (Mocking available times)
    const timeSelect = document.getElementById('time-picker');
    const times = ['10:00', '11:00', '13:00', '14:30', '16:00', '17:30'];
    times.forEach(t => {
        const opt = document.createElement('option');
        opt.value = t;
        opt.textContent = t;
        timeSelect.appendChild(opt);
    });

    // Next Buttons
    document.getElementById('btn-next-1').addEventListener('click', () => {
        if (validateStep1()) nextStep();
    });

    document.getElementById('btn-next-2').addEventListener('click', () => {
        if (validateStep2()) nextStep();
    });

    // Prev Buttons
    document.getElementById('btn-prev-2').addEventListener('click', prevStep);
    document.getElementById('btn-prev-3').addEventListener('click', prevStep);

    // Form Submit
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        if (validateStep3()) {
            // Simulate API call
            console.log('Booking Submitted:', bookingData);

            // Show Success
            form.style.display = 'none';
            successMsg.classList.remove('hidden');

            // Allow stepping back doesn't make sense here, so we hide wizard nav
            document.querySelector('.wizard-steps').style.opacity = '0.5';
        }
    });

    document.getElementById('reset-booking').addEventListener('click', () => {
        location.reload(); // Simple reset
    });

    function nextStep() {
        if (currentStep < totalSteps) {
            currentStep++;
            updateUI();
        }
    }

    function prevStep() {
        if (currentStep > 1) {
            currentStep--;
            updateUI();
        }
    }

    function updateUI() {
        // Update Steps Indicator
        steps.forEach(s => {
            const sNum = parseInt(s.dataset.step);
            if (sNum === currentStep) s.classList.add('active');
            else if (sNum < currentStep) s.classList.add('completed');
            else s.classList.remove('active', 'completed');
        });

        // Update Panes
        panes.forEach(p => p.classList.remove('active'));
        document.getElementById(`step-${currentStep}`).classList.add('active');

        // Update Summary if on Step 3
        if (currentStep === 3) updateSummary();
    }

    /* Validation & Data Collection Helpers */

    function validateStep1() {
        const selectedRadio = document.querySelector('input[name="service"]:checked');
        if (!selectedRadio) {
            alert('Prosím vyberte službu.');
            return false;
        }
        bookingData.service = selectedRadio.value;

        // Extract name and price for summary
        const card = selectedRadio.nextElementSibling; // span.service-card
        bookingData.serviceName = card.querySelector('.s-name').textContent;
        bookingData.price = card.querySelector('.s-price').textContent;
        return true;
    }

    function validateStep2() {
        const date = document.getElementById('date-picker').value;
        const time = document.getElementById('time-picker').value;

        if (!date || !time) {
            alert('Prosím vyberte datum a čas.');
            return false;
        }
        bookingData.date = date;
        bookingData.time = time;
        return true;
    }

    function validateStep3() {
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        if (!name || !phone || !email) return false; // Native required check handles alert usually, but extra safety

        bookingData.name = name;
        bookingData.phone = phone;
        bookingData.email = email;
        bookingData.note = document.getElementById('note').value;
        return true;
    }

    function updateSummary() {
        const summary = document.getElementById('summary-text');
        summary.innerHTML = `
            <strong>Služba:</strong> ${bookingData.serviceName} (${bookingData.price})<br>
            <strong>Termín:</strong> ${formatDate(bookingData.date)} v ${bookingData.time}<br>
            <strong>Jméno:</strong> ${document.getElementById('name').value} <!-- Live update if needed, but usually filled after next click -->
        `;
    }

    function formatDate(dateStr) {
        // Simple formatter
        if (!dateStr) return '';
        const d = new Date(dateStr);
        return d.toLocaleDateString('cs-CZ');
    }
}
