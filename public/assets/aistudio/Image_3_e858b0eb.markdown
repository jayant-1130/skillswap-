---
name: Peer-to-Peer Learning Exchange
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#464554'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#767586'
  outline-variant: '#c7c4d7'
  surface-tint: '#494bd6'
  primary: '#4648d4'
  on-primary: '#ffffff'
  primary-container: '#6063ee'
  on-primary-container: '#fffbff'
  inverse-primary: '#c0c1ff'
  secondary: '#00687a'
  on-secondary: '#ffffff'
  secondary-container: '#57dffe'
  on-secondary-container: '#006172'
  tertiary: '#006c49'
  on-tertiary: '#ffffff'
  tertiary-container: '#00885d'
  on-tertiary-container: '#000703'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e1e0ff'
  primary-fixed-dim: '#c0c1ff'
  on-primary-fixed: '#07006c'
  on-primary-fixed-variant: '#2f2ebe'
  secondary-fixed: '#acedff'
  secondary-fixed-dim: '#4cd7f6'
  on-secondary-fixed: '#001f26'
  on-secondary-fixed-variant: '#004e5c'
  tertiary-fixed: '#6ffbbe'
  tertiary-fixed-dim: '#4edea3'
  on-tertiary-fixed: '#002113'
  on-tertiary-fixed-variant: '#005236'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
    letterSpacing: -0.015em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: -0.005em
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: -0.005em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system embodies an energetic, modern SaaS aesthetic built specifically for self-directed learners, collegiate peers, and knowledge seekers. Its emotional core blends academic ambition with social approachability—fostering confidence, reciprocity, and shared growth. 

The aesthetic is Modern Clean SaaS:
- High-clarity white and cool slate surfaces keep cognitive load low during complex skill matching.
- Strategic pops of vibrant violet and electric cyan drive engagement without feeling toy-like.
- Friendly, rounded structural geometry pairs with meticulous typographic balance to convey equal parts modern consumer delight and structural institutional credibility.

## Colors
The palette balances vibrant, future-forward interaction accents against calm, slate-neutral foundations.

### Canvas & Surface Hierarchy
- **Base Canvas (`bg-slate-50` / `#F8FAFC`)**: The fundamental background canvas across mobile views and desktop applications.
- **Surface Elevation 0 (`#FFFFFF`)**: Pure crisp white for interactable cards, modals, sheets, and elevated navigation bars.
- **Surface Muted (`#F1F5F9`)**: Subtle fill for input troughs, tag backgrounds, and inert segment bars.

### Primary Spectrum
- **Primary Base (`#6366F1`)**: Interactive default for buttons, brand focal points, and active navigation indicators.
- **Primary Deep (`#4F46E5` / `#4338CA`)**: State changes (hover/press) and high-contrast typographic emphasis.
- **Primary Glow (`#EEF2FF`)**: Ultra-light tinted backgrounds for selected rows, active tabs, and primary badge fills.

### Accents & Semantic Signals
- **Electric Cyan (`#06B6D4`)**: Used for peer discovery states, reciprocal indicators, and active session timers.
- **Emerald Accent (`#10B981`)**: Mutual match confirmations, mastered skills, high-compatibility percentages (90%+), and live status pings.
- **Amber Accent (`#F59E0B`)**: In-progress exchanges, pending swap requests, and intermediate skill tags.
- **Neutral Slate (`#0F172A` to `#94A3B8`)**: Text and iconography. `#0F172A` delivers high-legibility body/headings; `#64748B` handles metadata; `#E2E8F0` defines structural border lines.

## Typography
Typographic pairings distinguish high-level momentum from operational reading efficiency.

- **Plus Jakarta Sans (Headings, Metrics, Labels)**: Chosen for its geometric energy, crisp contemporary aperture, and structural friendliness. Provides modern punch to display metrics, match percentages, user handles, and pill badges.
- **Inter (Body, Longform, Chat Messages, Form Inputs)**: Provides maximum legibility, consistent vertical metrics, and neutral readability across compact mobile viewports and continuous desktop messaging feeds.

### Scaling & Rules
- Headings larger than 24px drop by 4-6px on mobile viewports using the dedicated mobile headline tokens.
- Numbers within compatibility badges, star ratings, and progress metrics always pair with `label-lg` or `label-md` using numeric tabular figures (`tnum`) to eliminate spatial shifting during dynamic calculations.

## Layout & Spacing
The layout follows an 8pt architectural rhythm, optimized first for high-density mobile peer interactions and scaling to a maximum 1280px desktop application container.

### Layout Grid & Breakpoints
- **Mobile (<768px)**: 4-column layout with `1rem` margins and `1rem` gutters. Primary interface relies on a sticky top header (56px tall) for profile and search actions, complemented by a persistent 64px bottom tab bar.
- **Tablet (768px–1023px)**: 8-column fluid layout with `1.5rem` margins and gutters. Transition zone where navigation moves from bottom tabs to a collapsible left navigation rail.
- **Desktop (1024px+)**: 12-column layout capped at 1280px maximum content width. Left navigation fixed at 260px; right-hand auxiliary pane (swap queue, upcoming sessions) at 320px; fluid 2-column card matching grid in the central viewport.

## Elevation & Depth
Depth relies on crisp borders combined with low-opacity, colored ambient drop-shadows rather than heavy dark drop-offs. Surfaces sit on distinct structural planes:

- **Flat Layer (Canvas)**: `#F8FAFC` base layer with zero elevation.
- **Card Rest Level**: Pure `#FFFFFF` surface framed by a 1px border (`#F1F5F9` or `#E2E8F0`). Shadow utilizes a subtle dual-layer: `0 1px 3px 0 rgba(15, 23, 42, 0.04), 0 1px 2px -1px rgba(15, 23, 42, 0.02)`.
- **Card Hover / Active Level**: Elevated card lift with smooth 200ms transition. The border shifts slightly toward `#CBD5E1`, with an expanded ambient shadow: `0 10px 25px -5px rgba(99, 102, 241, 0.08), 0 8px 10px -6px rgba(15, 23, 42, 0.04)`.
- **Floating Modals & Drawers**: Mobile bottom sheets and desktop dialogue windows sit at `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)` over an ultra-soft slate backdrop blur (`backdrop-blur-sm bg-slate-900/20`).
- **Glassmorphism**: Restricted strictly to sticky headers and mobile navigation bars (`bg-white/85 backdrop-blur-md border-b border-slate-200/60`).

## Shapes
The structural system uses smooth, contemporary curvature to reinforce warmth and peer friendliness while preserving content density.

- **Cards & Match Panels**: Standardized on `rounded-2xl` (1rem / 16px) for outer perimeters, creating clean, cohesive groupings for peer profiles and swap requests.
- **Controls & Form Elements**: Buttons, text inputs, and search bars use `rounded-xl` (0.75rem / 12px) to match the internal radius of parent cards.
- **Status Badges, Compatibility Scores, & Avatar Wrappers**: Full pill treatment (`rounded-full` / 9999px) to immediately signal distinct semantic meta-tags.

## Components

### Buttons & Interactive Triggers
- **Primary Button**: Solid `#6366F1` background, `#FFFFFF` text (`label-lg`), `rounded-xl`, padding `10px 20px`. Hover transitions to `#4F46E5` with a subtle `rgba(99, 102, 241, 0.25)` drop glow.
- **Secondary Button**: Solid white `#FFFFFF` surface with a 1px `#E2E8F0` border and `#0F172A` text. Hover shifts to `#F8FAFC` background and `#CBD5E1` border.
- **Ghost/Tertiary Button**: No border, `#64748B` text, shifting to `#EEF2FF` fill and `#4F46E5` text on focus/hover.

### Skill Level & Match Compatibility Pills
- **Skill Level Tags**: Compact height (24px), `label-sm`, `rounded-full`, horizontal padding 10px.
  - *Beginner*: `#F1F5F9` background with `#475569` text.
  - *Intermediate*: `#FEF3C7` background with `#B45309` text.
  - *Expert*: `#EEF2FF` background with `#4338CA` text.
- **Match Compatibility Badges**:
  - *Mutual Match (90%+) Rating*: Gradient wash from `#10B981/15` to `#06B6D4/15`, 1px border `#10B981/30`, `#065F46` text with a 6px pulsing emerald indicator dot.
  - *One-Way Match*: `#F8FAFC` background, 1px `#E2E8F0` border, `#64748B` text.

### Peer Cards & Swap Request Units
- **Base Container**: Pure white background, `rounded-2xl`, 1px `#F1F5F9` border, `1.25rem` internal padding.
- **Card Header**: Student avatar (48px with dynamic online ring) paired with display name, university/program tag, and mutual match score pinned top-right.
- **Swap Body Matrix**: Two-column visual divider displaying "Teaches" (indigo pill stack) alongside "Wants to Learn" (cyan pill stack).
- **Card Footer**: Direct action row containing primary "Request Swap" and secondary "Preview Syllabus".

### Peer Rating & Review Units
- Surface tier `#F8FAFC`, `rounded-xl`, `1rem` padding.
- Metric display featuring star rating iconography tinted in `#F59E0B`, validated peer badge (`#EEF2FF`), and brief verified review copy in `body-sm`.

### Inputs & Discovery Search Bars
- Background `#FFFFFF` with an inset 1px `#CBD5E1` border, 44px minimum touch height on mobile, `rounded-xl`.
- Active focus state: 1px `#6366F1` border with a 3px outer `#6366F1/15` focus ring. Leading search icon tinted in `#94A3B8`.

### Progress Bars
- 6px track height, `rounded-full`, track fill `#F1F5F9`.
- Active fill: Solid `#6366F1` or emerald gradient (`#10B981` to `#06B6D4`) with smooth CSS width interpolation.