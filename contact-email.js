(function () {
  'use strict';

  const form = document.querySelector('[data-emailjs-contact-form]');

  if (!form) return;

  const submitButton = form.querySelector('[type="submit"]');
  const status = form.querySelector('[data-contact-form-status]');
  const defaultButtonMarkup = submitButton.innerHTML;
  let isSubmitting = false;

  function showStatus(message, isError, whatsappUrl) {
    status.replaceChildren();
    status.classList.toggle('contact-form-status-error', Boolean(isError));
    status.append(document.createTextNode(message));

    if (whatsappUrl) {
      const link = document.createElement('a');
      link.href = whatsappUrl;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = ' Continue on WhatsApp';
      status.append(link);
    }
  }

  form.addEventListener('submit', async function (event) {
    event.preventDefault();
    if (isSubmitting) return;

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (!window.RJPhotographyEmailJS) {
      showStatus('Unable to send your enquiry. Please try again or contact us via WhatsApp.', true);
      console.error('EmailJS failed to load.');
      return;
    }

    const formData = {
      name: form.elements.name.value.trim(),
      phone: form.elements.phone.value.trim(),
      email: form.elements.email.value.trim(),
      eventType: form.elements.event_type.value,
      eventDate: form.elements.event_date.value,
      location: form.elements.location.value.trim(),
      message: form.elements.message.value.trim()
    };

    const templateParams = {
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      event_type: formData.eventType,
      event_date: formData.eventDate,
      location: formData.location,
      message: formData.message
    };

    isSubmitting = true;
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    showStatus('', false);

    try {
      await window.RJPhotographyEmailJS.send(templateParams);

      const whatsappNumber = window.RJPhotographyContact && window.RJPhotographyContact.whatsappNumber;
      const whatsappMessage = [
        'Hi RJ Photography,',
        '',
        'I have submitted a photography enquiry.',
        '',
        'Name: ' + formData.name,
        'Phone: ' + formData.phone,
        'Email: ' + formData.email,
        'Event Type: ' + formData.eventType,
        'Event Date: ' + formData.eventDate,
        'Location: ' + formData.location,
        'Message: ' + formData.message
      ].join('\n');
      const whatsappUrl = whatsappNumber ? 'https://wa.me/' + whatsappNumber + '?text=' + encodeURIComponent(whatsappMessage) : '';

      form.reset();
      showStatus('Thank you! Your enquiry has been sent successfully.', false, whatsappUrl);

      if (whatsappUrl) {
        window.open(whatsappUrl, '_blank', 'noopener');
      }
    } catch (error) {
      console.error('EmailJS submission error:', error);
      showStatus('Unable to send your enquiry. Please try again or contact us via WhatsApp.', true);
    } finally {
      isSubmitting = false;
      submitButton.disabled = false;
      submitButton.innerHTML = defaultButtonMarkup;
    }
  });
})();
