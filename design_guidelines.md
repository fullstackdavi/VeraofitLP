# Design Guidelines: Desafio Verão 30D

## Design Approach

**Reference-Based Approach**: Drawing inspiration from wellness apps (Headspace, Calm) combined with lifestyle platforms (Airbnb cards, Instagram's visual energy). The design balances energetic summer vibes with trustworthy fitness guidance.

## Core Design Principles

1. **Energetic Minimalism**: Clean layouts with strategic bursts of summer energy
2. **App-Native Feel**: Mobile-first design that feels like a native fitness application
3. **Progress Motivation**: Visual feedback celebrating user achievements
4. **Approachable Premium**: Accessible pricing with high-quality aesthetic

## Typography System

**Primary Font**: Poppins (Google Fonts)
- Hero Title: 700 weight, 3.5rem desktop / 2.5rem mobile
- Section Headers: 600 weight, 2rem desktop / 1.5rem mobile
- Body Text: 400 weight, 1rem with 1.6 line-height
- Card Titles: 600 weight, 1.125rem
- Buttons/CTA: 500 weight, uppercase, 0.05em letter-spacing

**Secondary Font**: Inter (Google Fonts) - for body content and UI elements

## Layout System

**Spacing Units**: Tailwind primitives - 2, 4, 6, 8, 12, 16, 20, 24 (focus on 4, 8, 16, 24 for consistency)

**Container Structure**:
- Max-width: 1280px for main content
- Section padding: py-16 desktop / py-12 mobile
- Card grid gaps: gap-6 desktop / gap-4 mobile

## Component Library

### Hero Section
- Full-width with subtle gradient overlay on background image
- Height: 85vh minimum
- Centered content with max-width of 800px
- Primary CTA button with backdrop-blur effect when over imagery
- Sub-headline explaining value proposition
- Trust indicator below CTA ("Mais de 500 pessoas já começaram")

### 30-Day Calendar Grid
- Grid layout: 5 columns desktop (grid-cols-5), 3 columns tablet, 2 columns mobile
- Cards: Rounded corners (rounded-xl), subtle shadow (shadow-md)
- Card states: Default (semi-transparent white bg), Active (accent color), Completed (success green tint)
- Hover: lift effect (translate-y-1, shadow-lg transition)
- Each card shows large day number + icon indicator for completion status

### Progress Bar
- Fixed or sticky position at top when scrolling through calendar
- Full-width with container max-width
- Animated fill with transition duration-500
- Display: "X/30 dias completos" with percentage
- Gradient fill matching summer theme

### Day Detail Modal
- Centered overlay with backdrop blur
- Max-width: 600px
- Sections: Dica do Dia (icon + text), Receita (ingredients list + steps), Checkpoint button
- Close button (X) top-right
- Smooth entrance animation (fade + scale)

### Payment Section
- Two-column layout desktop: benefit list + payment card
- Payment card: Elevated (shadow-xl), white background, centered
- Price display: Large (text-4xl), emphasized with accent color
- Benefits list: Checkmark icons + clear value statements
- Mock testimonial or satisfaction guarantee

### Footer
- Simple, centered
- Links: Termos, Privacidade, Contato
- Social media icons (if applicable)
- Copyright notice

## Color Strategy (Implementation Later)
Note: Colors defined in implementation phase will use:
- Summer blue (ocean/sky tones)
- Vibrant orange (sunset/energy)
- Clean white/off-white backgrounds
- Success green for completed states
- Gradient overlays for depth

## Interaction Patterns

**Card Interactions**:
- Hover: Subtle lift + shadow increase
- Click: Modal opens with smooth animation
- Completion: Checkmark animation + confetti effect (brief, celebratory)

**Progress Updates**:
- Animate progress bar fill when checkpoint marked
- Subtle celebration when milestones reached (10, 20, 30 days)

**Responsive Behavior**:
- Mobile: Stack everything single-column, larger touch targets (min 44px)
- Tablet: 2-3 column grids
- Desktop: Full multi-column layouts with generous whitespace

## Images

**Large Hero Image**: Yes - essential for summer theme
- Description: Vibrant summer beach or fitness setting - people exercising outdoors, beach/pool backdrop, bright natural lighting, energetic and aspirational mood
- Placement: Full-width hero section background with gradient overlay
- Treatment: Subtle blur or darkening to ensure text readability

**Optional Supporting Images**:
- Before/after transformation photos in testimonial/results section
- Food photography for recipe preview cards (if detailed view allows)

## Animations

Use sparingly and purposefully:
- Card hover effects: Simple transform + shadow
- Modal entrance/exit: Fade + scale (duration-300)
- Progress bar fill: Smooth transition when updated
- Checkpoint completion: Brief checkmark animation + optional subtle confetti
- Scroll-triggered: Fade-in for sections (subtle, once)

**Avoid**: Continuous animations, distracting parallax, excessive motion

## Accessibility

- Minimum contrast ratio 4.5:1 for body text
- Focus states visible on all interactive elements
- Modal traps focus appropriately
- Semantic HTML structure (headings hierarchy)
- ARIA labels for icon-only buttons
- Keyboard navigation fully supported

## Mobile-First Considerations

- Touch targets: Minimum 44x44px
- Cards optimized for vertical scrolling
- Sticky progress bar for constant motivation feedback
- Modal fills most of viewport on mobile
- CTA buttons easily thumb-reachable
- Form fields with appropriate input types and large tap areas