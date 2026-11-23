// Email links only work when the computer has an email app set up, and most
// people use Gmail or Outlook in the browser. So clicking a choice opens a small
// panel: Gmail, Outlook, the email app, or copy the address.
// Without JavaScript the links still work as plain email links.
(() => {
  const links = document.querySelectorAll('.choices a[href^="mailto:"]');
  if (!links.length) return;

  function parse(href) {
    const u = new URL(href);
    return {
      to: decodeURIComponent(u.pathname),
      subject: u.searchParams.get('subject') || '',
      body: u.searchParams.get('body') || '',
    };
  }

  const panel = document.createElement('div');
  panel.className = 'send-panel';
  panel.id = 'send-panel';
  panel.hidden = true;
  panel.innerHTML = `
    <p class="send-title">Send it with:</p>
    <div class="send-buttons">
      <a class="send-gmail" target="_blank" rel="noopener">Gmail</a>
      <a class="send-outlook" target="_blank" rel="noopener">Outlook</a>
      <a class="send-app">My email app</a>
    </div>
    <p class="send-copy">Or write to <strong class="send-address"></strong>
      <button type="button" class="send-copy-button">Copy address</button></p>`;
  const gmail = panel.querySelector('.send-gmail');
  const outlook = panel.querySelector('.send-outlook');
  const app = panel.querySelector('.send-app');
  const address = panel.querySelector('.send-address');
  const copy = panel.querySelector('.send-copy-button');

  let open = null;
  function show(link) {
    const m = parse(link.href);
    const q = (o) => new URLSearchParams(o).toString();
    gmail.href = 'https://mail.google.com/mail/?' + q({ view: 'cm', fs: '1', to: m.to, su: m.subject, body: m.body });
    outlook.href = 'https://outlook.live.com/mail/0/deeplink/compose?' + q({ to: m.to, subject: m.subject, body: m.body });
    app.href = link.href;
    address.textContent = m.to;
    copy.textContent = 'Copy address';
    if (open) open.setAttribute('aria-expanded', 'false');
    link.setAttribute('aria-expanded', 'true');
    link.after(panel);
    panel.hidden = false;
    open = link;
    gmail.focus();
  }

  for (const link of links) {
    link.setAttribute('aria-controls', 'send-panel');
    link.setAttribute('aria-expanded', 'false');
    link.addEventListener('click', (e) => {
      e.preventDefault();
      if (open === link && !panel.hidden) {
        panel.hidden = true;
        link.setAttribute('aria-expanded', 'false');
        open = null;
      } else {
        show(link);
      }
    });
  }

  copy.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(address.textContent);
      copy.textContent = 'Copied';
    } catch (e) {
      // Clipboard blocked: select the address so it can be copied by hand.
      const r = document.createRange();
      r.selectNodeContents(address);
      const s = getSelection();
      s.removeAllRanges();
      s.addRange(r);
      copy.textContent = 'Press Ctrl+C';
    }
  });
})();
