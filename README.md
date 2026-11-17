# ✨ Two People, One Wavelength

> A thoughtful, slightly romantic, and humorous invitation website. Built with clean HTML5, modern CSS3, and vanilla JavaScript. 100% static, fast, mobile-first, and ready for free hosting on GitHub Pages.

---

## 🌟 Concept & Features

- **Concept**: *"Two people, one wavelength, and maybe something worth exploring."*  
  A personal, warm, and natural digital invitation communicating matching vibes, effortless humor, and a genuine interest in taking things offline for a date.
- **Mobile-First Experience**: Designed primarily for smartphones (320px–430px+) while looking elegant on tablets and desktop monitors. Zero horizontal scroll.
- **Curated Memes as Comic Relief**: A few select, relatable internet-style cat memes placed naturally between storytelling sections rather than a full museum.
- **The Vibe-Match Section**:
  - `01 / Wavelength`: The Vibe ("Somehow, things just click.")
  - `02 / Frequency`: The Humour ("The random conversations, the jokes, and moments when we just get each other.")
  - `03 / Bonus Points`: The Little Things ("Shared appreciation for cat memes is a pretty solid bonus.")
- **The Personal Message**: A sincere, low-pressure letter section asking genuinely for a real-life hangout without cheesy romantic clichés.
- **National Princess Day Reference (Nov 18)**: A subtle, sweet nod with an interactive button.
- **Interactive Invitation (Yes / No)**:
  - Playful "No" button that dodges the cursor / tap 4 times with witty changing tooltips ("Wait, really? 👀", "One tiny reconsideration?", "The plot could be interesting.", "Okay, that's a bold choice.").
  - The "Yes" button grows subtly with each dodge (capped so it never covers "No").
  - After 4 attempts, the "No" button unlocks and can be clicked normally.
  - Keyboard accessible (Tab navigation allows selecting either button cleanly).
- **Celebration & Gentle Screens**:
  - **Yes**: "NEW ACHIEVEMENT UNLOCKED — Guess we're making plans! ✨" with subtle celebratory confetti and a one-tap summary copy button.
  - **No**: "All good. No pressure at all. I'm still glad I made this little thing. :)"
- **Zero Dependencies**: Pure HTML, CSS, and Vanilla JS. No build steps, no npm, no backend, no trackers, completely private.

---

## 📁 Project Structure

```text
.
├── index.html              # Main HTML markup and semantic sections
├── style.css               # Mobile-first stylesheet with design tokens
├── script.js               # Clean vanilla JS (dodge logic, confetti, easter eggs)
├── assets/
│   ├── memes/              # Curated local image assets
│   │   ├── cat-hero.jpg
│   │   ├── cat-01.jpg
│   │   ├── cat-04.jpg
│   │   ├── cat-06.jpg
│   │   ├── cat-celebrate.jpg
│   │   └── cat-gentle.jpg
│   ├── icons/              # Scalable SVG icons
│   ├── favicon.svg         # Custom SVG favicon
│   └── og-preview.jpg      # Social share preview image
└── README.md               # Documentation and hosting guide
```

---

## 🚀 How to Host for Free on GitHub Pages

You do **not** need to buy a domain or pay for web hosting. GitHub Pages provides free hosting with HTTPS.

### Step 1: Create a GitHub Repository
1. Go to [GitHub](https://github.com/) and log in (or create a free account).
2. Click the **+** (plus icon) in the top-right corner and select **New repository**.
3. Name your repository (e.g. `one-wavelength` or `a-tiny-invitation`).
4. Set visibility to **Public** (required for free GitHub Pages).
5. Leave "Add a README file" **unchecked**.
6. Click **Create repository**.

### Step 2: Upload the Files
In your terminal, navigate to this workspace folder and run:

```bash
git init
git add .
git commit -m "Initial commit: Two people, one wavelength"
git branch -M main
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git push -u origin main
```

*(Alternatively, drag and drop all files and the `assets` folder directly onto the GitHub repository page using the "Upload files" button).*

### Step 3: Enable GitHub Pages
1. In your GitHub repository, click on the **Settings** tab at the top.
2. In the left sidebar, click on **Pages** (under "Code and automation").
3. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
4. Click **Save**.

### Step 4: Get Your Live Link
- Wait ~60 seconds for GitHub to build and deploy.
- Refresh the Pages settings page to find your live URL:
  > **`https://<YOUR-USERNAME>.github.io/<YOUR-REPO-NAME>/`**
- Send the link to her!

---

## 🎨 Customizing Text & Colors

### 1. Editing Invitation Text
Open `index.html` and look for:
- Hero heading: `<h1 class="hero-title">`
- Vibe cards: `<div class="vibe-card">`
- Personal letter: `<section id="message">`
- Final question: `<section id="invitation">`

### 2. Changing Colors
Open `style.css` and tweak the CSS variables at the top:
```css
:root {
  --bg-main: #FAF7F2;          /* Warm cream background */
  --accent-lavender: #8B7EC8;  /* Soft lavender */
  --accent-pink: #E26D82;      /* Muted rose */
  --accent-yellow: #E5A62D;    /* Subtle butter yellow */
  --text-primary: #23201E;     /* Dark charcoal */
}
```

---

*Two people, one wavelength ✦ Made with genuine intentions.*
