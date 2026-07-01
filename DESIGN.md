# Design

## Theme

Clean, airy, premium. White canvas with purposeful use of a single cyan-to-blue primary gradient as the sole accent — used sparingly on interactive elements only. All other surfaces are white or a barely-there off-white section background. No gradient text except the logo wordmark. No gradient fills on decorative elements.

## Color Palette

| Token | Value | Usage |
|---|---|---|
| `--primary` | `#15C7E8` | Primary CTA borders, icons, active states |
| `--secondary` | `#2E9BFF` | Gradient endpoint, secondary links |
| `--accent` | `#FFD84D` | Discount badges only — used once per view max |
| `--bg` | `#FFFFFF` | Page background |
| `--section-bg` | `#F8FAFC` | Alternating section backgrounds |
| `--text` | `#0F172A` | All headings and body copy |
| `--text-secondary` | `#64748B` | Subtitles, captions, meta |
| `--border` | `#E2E8F0` | Dividers, input borders |

Gradient: `linear-gradient(135deg, #15C7E8, #2E9BFF)` — buttons and logo only.

## Typography

Font: Poppins (Google Fonts)
- Headings: 700, line-height 1.2
- Subheadings: 600
- Body: 400, line-height 1.6
- Labels/caps: 500–600, `letter-spacing: 0.08em`, uppercase

Scale: 12 / 14 / 16 / 18 / 24 / 30 / 36 / 48 / 64px

## Spacing

Base unit: 4px. Generous whitespace — sections use `py-24` to `py-28`. Cards use `p-5` to `p-6`. No cramped layouts.

## Border Radius

- Cards: `24px`
- Buttons: `12px` (md), `16px` (lg)
- Inputs: `12px`
- Badges: `10px`
- Images: `24px–32px`

## Shadows

- Default card: `0 8px 32px rgba(0,0,0,0.07)`
- Hover card: `0 16px 48px rgba(0,0,0,0.10)`
- Button (primary): `0 4px 16px rgba(21,199,232,0.35)`
- Floating/glassmorphism: `0 12px 40px rgba(0,0,0,0.10)`

## Components

### Buttons
- Primary: gradient fill `#15C7E8 → #2E9BFF`, white text, rounded-xl, cyan shadow
- Secondary: white bg, `#0F172A` text, `#E2E8F0` border
- Ghost: transparent, `#64748B` text, hover bg `#F8FAFC`
- All: `whileHover scale(1.01)`, `whileTap scale(0.97)`

### Cards
- White bg, `rounded-[24px]`, subtle shadow
- Image top, info bottom with generous padding
- Hover: `translateY(-6px) scale(1.02)` — smooth 250ms ease
- No gradient overlays on card backgrounds

### Navbar
- Transparent on hero, `bg-white/90 backdrop-blur-xl` on scroll
- Logo: gradient text wordmark + cyan icon
- Links: plain `#64748B` → `#0F172A` on hover/active
- CTA: gradient button

### Section titles
- Small cyan uppercase label (`12–13px`, `tracking-widest`)
- Bold dark `h2` (`36–48px`)
- Muted subtitle paragraph
- No decorative underlines or pill backgrounds on labels

### Inputs
- `bg-[#F8FAFC]` default, `border-[#E2E8F0]`
- Focus: `border-[#15C7E8]` + `ring-2 ring-[#15C7E8]/15`
- Cyan icon prefix

## Layout

- Max width: `1280px` (7xl)
- Horizontal padding: `px-4 sm:px-6 lg:px-8`
- Section rhythm: white → `#F8FAFC` → white alternating

## Motion

- Page enter: `opacity 0→1, y 24→0`, `duration 0.6s ease-out`
- Scroll reveal: `whileInView`, `once: true`, stagger `0.08s`
- Card hover: `y -6, scale 1.02`, `duration 0.25s`
- Floating elements: gentle `y` oscillation, `6–8s` loop
- Reduced motion: respect `prefers-reduced-motion`

## Anti-patterns (never do)

- Gradient text on body copy or prices
- Multiple competing gradient fills on one screen section
- Orange/red urgency colors ("Only 2 left!")
- Badge spam — max 1 accent badge per card
- Full-bleed loud background gradients behind text sections
- Decorative blobs or mesh gradients as section backgrounds
