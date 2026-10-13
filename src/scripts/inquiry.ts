// Inquiry forms: checks the entries and sends them to the address set in site.ts.
// Nothing is sent, and the visitor is told so, while that address is empty.

const forms = Array.from(document.querySelectorAll<HTMLFormElement>('[data-form]'));

for (const form of forms) {
  const status = form.querySelector<HTMLElement>('[data-status]')!;
  const send = form.querySelector<HTMLButtonElement>('[data-send]')!;
  const label = send.textContent ?? '';
  const say = (message: string, tone: 'ok' | 'error' | '' = '') => {
    status.textContent = message;
    status.dataset.tone = tone;
  };

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const required = Array.from(form.querySelectorAll<HTMLInputElement>('[required]'));
    let ok = true;
    for (const el of required) {
      const bad = !el.value.trim() || (el.type === 'email' && !el.validity.valid && !/^\S+@\S+\.\S+$/.test(el.value));
      el.toggleAttribute('aria-invalid', bad);
      if (bad) ok = false;
    }
    if (!ok) {
      say(form.dataset.msgInvalid ?? '', 'error');
      form.querySelector<HTMLElement>('[aria-invalid]')?.focus();
      return;
    }

    const data = new FormData(form);
    // A filled hidden field means an automatic form-filler: pretend it worked.
    if (String(data.get('_website') ?? '').trim()) {
      say(form.dataset.msgSent ?? '', 'ok');
      return;
    }

    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      say(form.dataset.msgNotConnected ?? '', 'error');
      return;
    }

    send.disabled = true;
    send.textContent = form.dataset.msgSending ?? label;
    say('');
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) throw new Error(String(response.status));
      form.reset();
      say(form.dataset.msgSent ?? '', 'ok');
    } catch {
      say(form.dataset.msgError ?? '', 'error');
    } finally {
      send.disabled = false;
      send.textContent = label;
    }
  });
}
