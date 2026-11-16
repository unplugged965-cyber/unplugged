# Unplugged website

Four plain pages, no build step:

| Page | What it's for |
|---|---|
| `index.html` | Home page: what Unplugged does, screenshots, "Add to Chrome" button |
| `privacy.html` | Privacy policy: link it in the Chrome and Edge store listings |
| `feedback.html` | Feedback choices that open an email; linked from the extension's settings |
| `goodbye.html` | Opens when someone removes the extension; asks why (optional) |

## Before it goes online

The support address (unplugged965@gmail.com) is already in every page.

## Putting it online for free with GitHub Pages

1. Make a free account at github.com if you don't have one.
2. Click **New repository**, name it `unplugged`, set it to **Public**, and create it.
3. Click **uploading an existing file** and drag in everything inside this
   `website` folder (the four `.html` files, `styles.css` and the `images` folder).
   Then click **Commit changes**.
4. Open the repository's **Settings → Pages**. Under **Branch**, choose `main`
   and `/ (root)`, then **Save**.
5. After a minute or two the site is live at
   `https://<your-github-username>.github.io/unplugged/`.

## Then connect it to the extension

In `desktop-extension/settings.js`, fill in `LINKS`:

```js
website:   'https://<username>.github.io/unplugged/',
feedback:  'https://<username>.github.io/unplugged/feedback.html',
uninstall: 'https://<username>.github.io/unplugged/goodbye.html',
```

Bump the version in `manifest.json`, run `chrome-store/package.ps1`, and upload
the new zip. Also put the website and `privacy.html` links in the Chrome and
Edge store listings.
