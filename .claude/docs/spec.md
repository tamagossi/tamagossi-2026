# Tamagossi Portfolio — Full Build Specification

> Paste this entire document as your prompt into v0.dev, Bolt.new, or Cursor.  
> Stack: **Next.js 15 · TypeScript · Tailwind CSS v4 · shadcn/ui · Motion (framer-motion) · GSAP**

---

## 0. IDENTITY

| Key           | Value                                                        |
| ------------- | ------------------------------------------------------------ |
| Brand name    | **Tamagossi**                                                |
| Nickname      | Tama                                                         |
| Title         | Chapter Lead Product Engineer                                |
| Tagline       | "I build products. I lead teams. I ship things that matter." |
| Availability  | Open to remote · EU / US                                     |
| Location note | Based in Jakarta · UTC+7 · Async-friendly                    |
| Stack         | Next.js, React, Vue, Nuxt, Go, Go Fiber                      |
| Email         | hello@tamagossi.dev _(placeholder)_                          |
| GitHub        | github.com/tamagossi _(placeholder)_                         |
| LinkedIn      | linkedin.com/in/tamagossi _(placeholder)_                    |

---

## 1. DESIGN TOKENS

```css
:root {
	--bg: #222831;
	--surface: #393e46;
	--accent: #ffd369;
	--text: #eeeeee;
	--muted: rgba(238, 238, 238, 0.45);
	--accent-glow: rgba(255, 211, 105, 0.07);
}
```

**Fonts** — load via `next/font` from Google Fonts:

| Role                              | Font               | Weight / Style      |
| --------------------------------- | ------------------ | ------------------- |
| Headings, hero name               | Cormorant Garamond | 600–700, **italic** |
| Body, descriptions                | DM Sans            | 300–400             |
| Labels, tags, dates, badges, code | DM Mono            | 400–500             |

**Global rules:**

- `::selection { background: #FFD369; color: #222831; }`
- `html { scroll-behavior: smooth; }`
- Body background: `#222831`, text: `#EEEEEE`

---

## 2. DEPENDENCIES

```bash
npm install framer-motion gsap lucide-react
npx shadcn@latest init        # if not already done
npx shadcn@latest add drawer  # for nav drawer
```

---

## 3. PROJECT STRUCTURE

```
/app
  layout.tsx
  page.tsx              ← assembles all sections
/components
  /ui                   ← shadcn + custom components
    timeline.tsx        ← from Section 5
    dynamic-text.tsx    ← splash screen text
    orbiting-skills.tsx ← from Section 7
  SplashScreen.tsx
  FloatingNav.tsx
  HeroSection.tsx
  ExperienceSection.tsx
  ProjectsSection.tsx
  SkillsSection.tsx
  BlogTeaser.tsx
  Footer.tsx
```

---

## 4. PAGE ASSEMBLY ORDER

```
<SplashScreen />         ← full-screen, runs once, then unmounts
<HeroSection />          ← Section A
<ExperienceSection />    ← Section B
<ProjectsSection />      ← Section C  (scrollytelling)
<SkillsSection />        ← Section D  (orbiting skills — AFTER projects)
<BlogTeaser />           ← Section E
<Footer />               ← Section F
<FloatingNav />          ← fixed, always on top
```

> **Skills placement rationale:** Skills/tech stack after Projects lets the projects speak first
> (outcomes), then the tools that made them possible. This order reads better to recruiters:
> _what I built → with what → what I write about._

---

## 5. SECTION 0 — SPLASH SCREEN

**Behavior:**

- Renders above everything on first load, `position: fixed`, full screen, `z-index: 9999`
- Background: `#222831`
- Center of screen: one word at a time, cycling through greetings in different languages
- Words: `"Annyeong"` · `"Hello"` · `"Bonjour"` · `"Hallo"` · `"Shamburasun"` · `"Tamagossi"`
- Each word: Cormorant Garamond italic, ~5–7rem, color `#EEEEEE`
- Animation per word:
    - Fade in: `opacity 0 → 1`, `y: 20px → 0`, duration `0.4s`
    - Hold: `0.6s`
    - Fade out: `opacity 1 → 0`, duration `0.3s`
- **Final word is "Tamagossi"** — instead of fading out normally:
    - Scale up aggressively: `scale: 1 → 8`, `opacity: 1 → 0`, duration `0.7s`, ease `easeIn`
    - Simulates the text rushing toward the camera (zoom-into-face effect)
- After sequence ends: splash div fades out (`opacity: 0`, `0.4s`), then `display: none` / unmounts
- Hero section is visible beneath but `pointer-events: none` until splash is gone
- Use `AnimatePresence` from Motion for clean unmount
- Run only once per session — use `sessionStorage` flag `"splashShown"` to skip on reload

**Implementation note:** Model this on the KokonutUI Dynamic Text pattern —
a React state array of words cycled with `useEffect` + index increment on a timer,
each rendered inside a Motion `<AnimatePresence>` block with `key={word}` so exit/enter
animations fire correctly.

```tsx
// Pseudocode structure
const words = ['Annyeong', 'Hello', 'Bonjour', 'Hallo', 'Shamburasun', 'Tamagossi'];
// cycle index every ~1.3s
// when index === words.length - 1, trigger zoom-out finale
// after finale, call onComplete() → parent sets splashDone = true
```

---

## 6. FLOATING NAVIGATION

**Position:** Bottom-right corner, `position: fixed`, `bottom: 2rem`, `right: 2rem`, `z-index: 1000`

**Trigger button:**

- Small circular pill: ~48×48px
- Background: `#FFD369`, icon color: `#222831`
- Icon: GSAP-animated `+` / `×` toggle (use the SVG from the sterling-gate component below)
- Subtle drop shadow + `backdrop-filter: blur(8px)`
- On hover: slight scale up `1.08`, smooth transition
- Label "Menu" / "Close" hidden visually, shown as tooltip on hover for accessibility

**On click — opens full-screen drawer:**

Use the **Sterling Gate Kinetic Navigation** component (Document 2 in references) adapted as follows:

- Import `gsap` and `CustomEase` — register plugins safely (check `typeof window !== "undefined"`)
- The nav overlay covers full screen (`position: fixed, inset: 0`)
- Background panels animate in from right (`xPercent: 101 → 0`, staggered `0.12s`, 3 panels)
- Panel colors (backdrop layers): `#222831` · `#2a2f38` · `#393E46` — staggered depth effect
- Overlay click area: closes menu (`setIsMenuOpen(false)`)
- Escape key: closes menu

**Nav links (inside drawer):**

```
Work          → /#projects
Writing       → /#blog
About         → /about
Contact       → mailto:hello@tamagossi.dev
```

- Link font: Cormorant Garamond italic, `4–6rem`, color `#EEEEEE`
- On hover: color shifts to `#FFD369`, smooth `0.2s`
- Each link animates in: `yPercent: 140 → 0, rotate: 10 → 0`, staggered `0.05s`

**Abstract shapes on nav hover:** Keep the shape hover from the original sterling-gate component.
Adapt shape colors to use `rgba(255, 211, 105, 0.12)` and `rgba(57, 62, 70, 0.4)` instead of indigo/rose.

**Bottom of drawer:**

- DM Mono small: `hello@tamagossi.dev` | `GitHub` | `LinkedIn`
- Color: `--muted`, hover: `#FFD369`

---

## 7. SECTION A — HERO

Base this on the **HeroGeometric / ElegantShape** component (Document 3 in references),
adapted to Tamagossi's palette.

**Background:** `#222831` (not `#030303`)

**Floating shapes — replace indigo/rose gradients with:**

```
Shape 1: from-[rgba(255,211,105,0.12)]   ← accent yellow
Shape 2: from-[rgba(57,62,70,0.6)]       ← surface
Shape 3: from-[rgba(255,211,105,0.07)]   ← accent faint
Shape 4: from-[rgba(57,62,70,0.4)]       ← surface mid
Shape 5: from-[rgba(255,211,105,0.05)]   ← accent very faint
```

Shape borders: `border-[rgba(255,211,105,0.15)]`
Shape shadows: `shadow-[0_8px_32px_0_rgba(255,211,105,0.08)]`

**Top-right badge** (inside hero, top-right corner, `position: absolute`):

```
● Open to remote · EU / US
```

- DM Mono, small, `#FFD369`
- Dot: green `#4ade80`, `animation: pulse 2s infinite`
- Slides in from right on load: `initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}`
- `transition={{ delay: 1.4 }}`

**Center content:**

```
[badge pill]   "Chapter Lead Product Engineer"   ← DM Mono, small, surface bg, muted text

[h1 line 1]    Tamagossi                         ← Cormorant Garamond italic 700, huge
[h1 line 2]    I build products.                 ← Cormorant Garamond italic 600
[h1 line 3]    I lead teams.                     ← Cormorant Garamond italic 600
[h1 line 4]    I ship things that matter.        ← Cormorant Garamond italic 600, accent color

[body]         Full-stack engineer and chapter lead based in Jakarta.
               Available for remote opportunities in EU and US.     ← DM Sans 300, --muted

[scroll hint]  "scroll" + bouncing chevron      ← DM Mono, --muted, bottom center
```

**Text animations** (use `fadeUpVariants` pattern from HeroGeometric):

- Each line: `hidden: { opacity: 0, y: 30 }` → `visible: { opacity: 1, y: 0 }`
- Stagger delay: `i * 0.15`, starting at `delay: 0.3` (after splash)
- Ease: `[0.25, 0.4, 0.25, 1]`

**Cursor glow:**

- `useMotionValue` for mouseX/mouseY
- `useSpring(mouseX, { stiffness: 80, damping: 20 })`
- Fixed div behind content: `background: radial-gradient(500px circle at {x}px {y}px, rgba(255,211,105,0.07), transparent)`

**Bottom gradient fade:** `bg-gradient-to-t from-[#222831] via-transparent to-[#222831]/80`

---

## 8. SECTION B — WORK EXPERIENCE (Aceternity Timeline)

Use the **Aceternity Timeline** component (Document 1 in references), adapted to Tamagossi's palette.

**Color adaptations:**

```
bg-white / dark:bg-neutral-950    →  bg-[#222831]
dark:text-white                   →  text-[#EEEEEE]
dark:text-neutral-300             →  text-[rgba(238,238,238,0.45)]
dark:bg-neutral-800               →  bg-[#393E46]
dark:border-neutral-700           →  border-[rgba(255,211,105,0.15)]
dark:via-neutral-700              →  via-[#393E46]
bg-gradient purple/blue line      →  bg-gradient-to-t from-[#FFD369] via-[rgba(255,211,105,0.5)] to-transparent
```

**Section header (replace default text):**

```
heading:  "Where I've worked"     ← Cormorant Garamond italic, large
subtext:  "~8 years building products across startups, scale-ups, and tech companies."
          ← DM Sans 300, --muted
```

**Timeline data (4 entries):**

```tsx
const data = [
	{
		title: '2022 — Now',
		content: (
			<>
				<p className="role">Chapter Lead Product Engineer</p>
				<p className="company">Current Company · Jakarta</p>
				<p className="desc">
					Leading a chapter of engineers across product squads. Define engineering
					standards, conduct technical reviews, and ship core platform features in Next.js
					and Go Fiber.
				</p>
				<div className="tags">
					<Tag>Next.js</Tag>
					<Tag>Go Fiber</Tag>
					<Tag>System Design</Tag>
					<Tag>Tech Leadership</Tag>
				</div>
			</>
		),
	},
	{
		title: '2020 — 2022',
		content: (
			<>
				<p className="role">Senior Full-Stack Engineer</p>
				<p className="company">Previous Company · Jakarta</p>
				<p className="desc">
					Built and maintained high-traffic consumer products. Owned full delivery from
					API design to frontend implementation with focus on performance and DX.
				</p>
				<div className="tags">
					<Tag>React</Tag>
					<Tag>Node.js</Tag>
					<Tag>PostgreSQL</Tag>
				</div>
			</>
		),
	},
	{
		title: '2018 — 2020',
		content: (
			<>
				<p className="role">Full-Stack Engineer</p>
				<p className="company">Startup · Jakarta</p>
				<p className="desc">
					Early engineer on a B2B SaaS product. Shaped the frontend architecture from
					scratch and integrated third-party APIs for payments and logistics.
				</p>
				<div className="tags">
					<Tag>Vue.js</Tag>
					<Tag>Laravel</Tag>
					<Tag>MySQL</Tag>
				</div>
			</>
		),
	},
	{
		title: '2016 — 2018',
		content: (
			<>
				<p className="role">Frontend Developer</p>
				<p className="company">Digital Agency · Jakarta</p>
				<p className="desc">
					Delivered client projects for e-commerce and media brands. First real exposure
					to performance optimization and cross-browser compatibility at scale.
				</p>
				<div className="tags">
					<Tag>HTML/CSS</Tag>
					<Tag>JavaScript</Tag>
					<Tag>jQuery</Tag>
				</div>
			</>
		),
	},
];
```

**Tag component style:**

```tsx
// DM Mono, small, border 1px solid rgba(255,211,105,0.3), color #FFD369,
// background transparent, border-radius 999px, padding: 2px 10px
```

---

## 9. SECTION C — PROJECTS (Scrollytelling / Pinned Scroll)

**Outer container:** `position: relative`, `height: 900vh` (3 projects × 300vh each)

**Inner sticky container:** `position: sticky`, `top: 0`, `height: 100vh`, `overflow: hidden`

**Scroll binding:** `useScroll` on outer ref, map `scrollYProgress` across 3 segments.

**Per project, as it becomes active (`scrollYProgress` in `[i/3, (i+1)/3]`):**

1. **Background color transition** (smooth, `useTransform` + `interpolate`):
    - Project 0: `#222831`
    - Project 1: `#1a2230` (cool blue-shift)
    - Project 2: `#231f1a` (warm brown-shift)

2. **Project number** — DM Mono, `8rem`, top-left, `--muted`, `opacity: 0.12`

3. **Project title** — Cormorant Garamond italic, `~5rem`
    - `whileInView={{ y: 0, opacity: 1 }}`, `initial={{ y: 60, opacity: 0 }}`

4. **Subtitle** — DM Sans 300, `--muted`

5. **Description** — DM Sans 300, `max-width: 520px`

6. **Tech tags** — same pill style as Experience section

7. **Right side placeholder image** — `aspect-ratio: 16/9`, background `#393E46`,
   `border-radius: 12px`, `width: 45%`. Parallaxes slower than scroll:

    ```ts
    const imgY = useTransform(scrollYProgress, [i / 3, (i + 1) / 3], ['5%', '-5%']);
    ```

8. **"View case study →"** — DM Sans, `#FFD369`, `text-decoration: underline` on hover
   → links to `/work/[slug]`

**Projects data (3 entries):**

```ts
const projects = [
	{
		id: '01',
		slug: 'project-alpha',
		title: 'Project Alpha',
		subtitle: 'Internal tooling platform',
		desc: 'A developer-facing tooling platform built to reduce onboarding time for new engineers. Reduced setup from 2 days to under 2 hours.',
		tags: ['Next.js', 'Go', 'Docker'],
	},
	{
		id: '02',
		slug: 'project-beta',
		title: 'Project Beta',
		subtitle: 'Consumer mobile web app',
		desc: 'High-traffic mobile web experience serving 500k+ monthly users. Focused on Core Web Vitals and offline capability via service workers.',
		tags: ['React', 'PWA', 'Redis'],
	},
	{
		id: '03',
		slug: 'project-gamma',
		title: 'Project Gamma',
		subtitle: 'Real-time analytics dashboard',
		desc: 'Live analytics dashboard for ops teams. Replaced spreadsheet-based reporting with real-time charts and automated alerting.',
		tags: ['Vue.js', 'Go Fiber', 'WebSocket'],
	},
];
```

---

## 10. SECTION D — SKILLS & TECH STACK (Orbiting Skills)

> **Placement: AFTER projects.** Rationale: projects demonstrate outcomes first,
> then tools reinforce the "how." More compelling to recruiters than listing tools upfront.

> **Recommendation: COMBINE skills and tech stack in one section.**
> The orbiting visualization IS the tech stack. Add a static text column beside it
> listing grouped skills (Languages, Frontend, Backend, DevOps) so it serves both
> visual appeal AND keyword scannability for ATS systems.

Use the **OrbitingSkills** component (Document 4 in references), adapted as follows:

**Color adaptations:**

- `bg-gray-800/90` → `bg-[#393E46]/90`
- Central icon gradient: `#FFD369 → #393E46` (instead of cyan → purple)
- Orbit glow colors:
    - Inner orbit: `rgba(255, 211, 105, 0.4)` (accent yellow)
    - Outer orbit: `rgba(57, 62, 70, 0.8)` (surface)
- Hover icon glow: use each icon's natural brand color (keep as-is — looks great)

**Replace icon set with Tamagossi's actual stack:**

```ts
// Inner orbit (core languages)
{ id: 'typescript', orbitRadius: 100, iconType: 'typescript', label: 'TypeScript', speed: 1 }
{ id: 'go',        orbitRadius: 100, iconType: 'go',         label: 'Go',         speed: 1, phaseShift: 2π/3 }
{ id: 'javascript',orbitRadius: 100, iconType: 'javascript', label: 'JavaScript', speed: 1, phaseShift: 4π/3 }

// Outer orbit (frameworks & tools)
{ id: 'nextjs',    orbitRadius: 180, iconType: 'nextjs',    label: 'Next.js',    speed: -0.6 }
{ id: 'react',     orbitRadius: 180, iconType: 'react',     label: 'React',      speed: -0.6, phaseShift: 2π/3 }
{ id: 'vue',       orbitRadius: 180, iconType: 'vue',       label: 'Vue / Nuxt', speed: -0.6, phaseShift: 4π/3 }
{ id: 'gofiber',   orbitRadius: 180, iconType: 'gofiber',   label: 'Go Fiber',   speed: -0.6, phaseShift: π }
```

Add SVG icons for TypeScript, Go, Next.js, Vue, Go Fiber (use their official brand SVGs —
source from simple-icons.org paths).

**Section layout (two columns):**

```
[Left col — 40%]               [Right col — 60%]
Section heading:                Orbiting Skills component
"What I work with"             (centered in column)
Cormorant Garamond italic

Grouped skill list:
Languages:    TypeScript, Go, JavaScript
Frontend:     Next.js, React, Vue, Nuxt, Tailwind
Backend:      Go Fiber, Node.js, REST, WebSocket
Infra:        Docker, PostgreSQL, Redis, Git

Each group label: DM Mono small, #FFD369
Each item: DM Sans 300, --text
```

**Section background:** `#222831` (same as page, no contrast shift needed)

---

## 11. SECTION E — BLOG TEASER

**Section heading:** `"Writing"` — Cormorant Garamond italic, large

**3 post rows:**

```ts
const posts = [
	{ title: 'Why I stopped writing unit tests first', date: 'Feb 2025', readTime: '6 min' },
	{ title: 'Designing Go Fiber middleware the right way', date: 'Jan 2025', readTime: '8 min' },
	{ title: "What 'Chapter Lead' actually means day to day", date: 'Dec 2024', readTime: '5 min' },
];
```

**Row design:**

- Title: DM Sans 400, `--text`
- Date + read time: DM Mono small, `--muted`, right-aligned
- Divider: `1px solid rgba(238,238,238,0.08)`
- Hover: row background `rgba(255,211,105,0.04)`, title color `→ #FFD369`, transition `0.2s`
- `padding: 1.25rem 0`

**Row entrance animation:**

```ts
whileInView={{ opacity: 1, x: 0 }}
initial={{ opacity: 0, x: -20 }}
transition={{ delay: index * 0.1 }}
viewport={{ once: true }}
```

**Footer of section:** `"All posts →"` — DM Mono, `#FFD369`, links to `/blog`

---

## 12. SECTION F — FOOTER

```
[Large heading]  "Let's work together."
                 Cormorant Garamond italic, 3–4rem, --text

[Subline]        "Available for remote full-time or contract."
                 "Based in Jakarta (UTC+7). Async-friendly."
                 DM Sans 300, --muted

[Email]          hello@tamagossi.dev
                 DM Mono, large, #FFD369
                 Hover: underline animates via scaleX 0→1 (left to right)

[Social row]     GitHub · LinkedIn · CV/Resume
                 DM Mono small, --muted, hover → #FFD369, gap: 2rem

[Copyright]      © Tamagossi 2026
                 DM Mono, very small, --muted, centered, border-top: 1px solid rgba(238,238,238,0.08)
```

---

## 13. RESPONSIVE / MOBILE RULES

| Section      | Mobile behavior                                                                                |
| ------------ | ---------------------------------------------------------------------------------------------- |
| Splash       | Same — scales font down to `3rem`                                                              |
| Hero         | Single column, shapes scale down `0.6×`, font `3.5rem`                                         |
| Experience   | Timeline stays vertical — naturally responsive                                                 |
| Projects     | **Disable sticky scroll** — render as stacked cards with `whileInView` fade-in                 |
| Skills       | Stack columns vertically: text list on top, orbit below. Scale orbit down to `300px` container |
| Blog         | Same — rows stay readable                                                                      |
| Footer       | Center-align everything                                                                        |
| Floating nav | Move to `bottom: 1.5rem, right: 1.5rem`. Drawer becomes full screen (already is)               |

**Breakpoints:** use Tailwind's `md:` (768px) and `lg:` (1024px) throughout.

---

## 14. PERFORMANCE GUIDELINES

- `will-change: transform` only on actively animating sticky elements
- All `whileInView` use `viewport={{ once: true, margin: "-80px" }}`
- Splash screen: unmount from DOM after completion (not just hidden)
- Images: use `next/image` with `priority` on hero, lazy on rest
- Fonts: `next/font` with `display: 'swap'`
- GSAP: import only used plugins (`CustomEase`) — tree-shakeable
- `sessionStorage` check on splash so it only runs on first visit

---

## 15. FILE PLACEMENT SUMMARY

```
/components/ui/timeline.tsx              ← Aceternity Timeline (Document 1), adapted
/components/ui/sterling-gate-nav.tsx     ← Sterling Gate Nav (Document 2), adapted
/components/ui/shape-hero.tsx            ← HeroGeometric + ElegantShape (Document 3), adapted
/components/ui/orbiting-skills.tsx       ← OrbitingSkills (Document 4), adapted
/components/SplashScreen.tsx             ← custom, built per Section 5 spec
/components/FloatingNav.tsx              ← wraps sterling-gate-nav, adds floating button
/app/page.tsx                            ← assembles all sections
/app/layout.tsx                          ← fonts, metadata, global styles
/app/globals.css                         ← design tokens as CSS variables
```

---

## 16. SEO / METADATA

```tsx
// app/layout.tsx
export const metadata = {
	title: 'Tamagossi — Chapter Lead Product Engineer',
	description:
		'Full-stack engineer and chapter lead based in Jakarta. ' +
		'Building products with Next.js, React, Go, and Go Fiber. ' +
		'Open to remote opportunities in EU and US.',
	openGraph: {
		title: 'Tamagossi',
		description: 'Chapter Lead Product Engineer · Jakarta · Remote-ready',
		url: 'https://tamagossi.dev',
	},
};
```

---

## 17. NPM INSTALL SUMMARY

```bash
npm install framer-motion gsap lucide-react
npx shadcn@latest init
npx shadcn@latest add drawer
```

If using Tailwind v4, extend `index.css`:

```css
@import 'tailwindcss';

:root {
	--bg: #222831;
	--surface: #393e46;
	--accent: #ffd369;
	--text: #eeeeee;
	--muted: rgba(238, 238, 238, 0.45);
	--accent-glow: rgba(255, 211, 105, 0.07);
}
```

---

_Spec version 1.0 · Prepared for Tamagossi portfolio build · 2026_
