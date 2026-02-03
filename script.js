document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if(hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            if(window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Header Color Change on Scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if(window.scrollY > 50) {
            header.style.background = 'rgba(26, 26, 26, 1)';
            header.style.padding = '10px 0';
        } else {
            header.style.background = 'rgba(26, 26, 26, 0.95)';
            header.style.padding = '15px 0';
        }
    });

    // Pricing Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const pricingContents = document.querySelectorAll('.pricing-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            pricingContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked button
            btn.classList.add('active');

            // Show corresponding content
            const target = btn.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });

    // Booking Form Wizard
    const nextBtns = document.querySelectorAll('.next-step');
    const prevBtns = document.querySelectorAll('.prev-step');
    const formSteps = document.querySelectorAll('.form-step');
    const progressSteps = document.querySelectorAll('.step');
    const bookingForm = document.getElementById('booking-form');
    const successMsg = document.getElementById('booking-success');
    let currentStep = 0;

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Basic validation
            const currentStepEl = formSteps[currentStep];
            const inputs = currentStepEl.querySelectorAll('input, select');
            let valid = true;

            inputs.forEach(input => {
                if(input.hasAttribute('required') && !input.value) {
                    valid = false;
                    input.style.borderColor = 'red';
                } else {
                    input.style.borderColor = ''; // Reset
                }
            });

            if(valid) {
                currentStep++;
                updateFormSteps();
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateFormSteps();
        });
    });

    function updateFormSteps() {
        // Show/Hide Steps
        formSteps.forEach((step, index) => {
            if(index === currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });

        // Update Progress Bar
        progressSteps.forEach((step, index) => {
            if(index <= currentStep) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
    }

    // Handle Form Submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Emulate sending data
        const formData = new FormData(bookingForm);
        const data = Object.fromEntries(formData);
        console.log('Rezervace odeslána:', data);

        // Hide form, show success
        bookingForm.style.display = 'none';
        document.querySelector('.booking-steps').style.display = 'none';
        successMsg.classList.remove('hidden');

        // Reset logic if needed
    });

    document.getElementById('reset-booking').addEventListener('click', () => {
        // Reset form
        bookingForm.reset();
        currentStep = 0;
        updateFormSteps();
        
        bookingForm.style.display = 'block';
        document.querySelector('.booking-steps').style.display = 'flex';
        successMsg.classList.add('hidden');
    });

    // Set today's date as min for date picker
    const dateInput = document.getElementById('date');
    if(dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.setAttribute('min', today);
    }
});
