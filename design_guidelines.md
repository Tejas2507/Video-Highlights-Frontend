# Design Guidelines: Video Highlight Generator

## Design Approach
**Selected Approach:** Design System + Reference Hybrid
- **Primary Reference:** Linear (dark UI, workflow clarity, professional aesthetic)
- **Secondary Influences:** Notion (embedded content), Modern video editing tools (processing states)
- **Rationale:** Utility-focused productivity tool requiring clear workflow visualization with embedded content integration

## Core Design Principles
1. **Workflow Clarity:** Each stage visually distinct and progression obvious
2. **Dark-First Design:** Professional dark interface reducing eye strain during video editing
3. **Embedded Integration:** Seamless iframe integration feeling native to the app
4. **Processing Feedback:** Clear loading states and progress indicators
5. **Single-Purpose Focus:** Each screen serves one clear function in the workflow

## Color Palette

### Dark Mode (Primary)
- **Background Levels:**
  - Base: 220 15% 8% (main background)
  - Elevated: 220 15% 12% (cards, panels)
  - Overlay: 220 15% 16% (modals, dropdowns)
  
- **Primary Brand:**
  - Primary: 210 100% 60% (bright blue for CTAs)
  - Primary Hover: 210 100% 55%
  
- **Accent Colors:**
  - Success: 142 70% 50% (processing complete)
  - Warning: 38 92% 50% (processing states)
  - Error: 0 72% 55% (error states)
  
- **Text Hierarchy:**
  - Primary: 0 0% 95% (headings, important text)
  - Secondary: 0 0% 65% (body text, descriptions)
  - Tertiary: 0 0% 45% (hints, placeholders)

- **Borders & Dividers:**
  - Default: 220 15% 20%
  - Hover: 220 15% 30%
  - Focus: 210 100% 60% (interactive elements)

## Typography

**Font Stack:**
- **Primary:** 'Inter', system-ui, sans-serif (via Google Fonts CDN)
- **Monospace:** 'JetBrains Mono', monospace (for file names, technical info)

**Scale & Hierarchy:**
- **Hero/Stage Headers:** text-4xl font-bold (36px)
- **Section Headers:** text-2xl font-semibold (24px)
- **Body Large:** text-lg font-medium (18px)
- **Body Default:** text-base (16px)
- **Body Small:** text-sm (14px)
- **Captions:** text-xs font-medium (12px, uppercase tracking-wide)

**Line Heights:**
- Headings: leading-tight (1.25)
- Body: leading-relaxed (1.625)

## Layout System

**Spacing Primitives:**
- **Core Units:** Use Tailwind units of 4, 6, 8, 12, 16 (e.g., p-4, gap-6, mb-8, py-12, mt-16)
- **Micro Spacing:** 2, 3 for tight element grouping
- **Macro Spacing:** 20, 24 for section separation

**Container Strategy:**
- **Max Width:** max-w-7xl (1280px) for main content
- **Upload/Processing Area:** max-w-4xl (896px) centered
- **Embedded Spreadsheet:** Full width within max-w-7xl container
- **Padding:** px-6 on mobile, px-8 on desktop

**Grid System:**
- Single column workflow (mobile-first)
- Sidebar + Main on desktop for status/actions (if needed)

## Component Library

### File Upload Component
- **Visual Style:** Dashed border (border-dashed) with hover state
- **Drag Zone:** Large touch target (min-h-64), centered content
- **States:**
  - Default: Dashed border (220 15% 30%), icon + text centered
  - Hover: Solid border with primary color glow
  - Active Drag: Background shift to 220 15% 16%, scale transform
  - File Selected: Preview thumbnail + file info card

### Processing States
- **Loading Indicators:** 
  - Spinner with primary color (210 100% 60%)
  - Progress bar: h-2 with animated gradient
  - Stage indicator: Numbered circles with connecting lines
  
- **Status Cards:**
  - Background: Elevated (220 15% 12%)
  - Border: Subtle (220 15% 20%)
  - Rounded: rounded-xl
  - Padding: p-6

### Embedded Spreadsheet
- **Container:**
  - Full width within max-w-7xl
  - Aspect ratio maintained via iframe wrapper
  - Border: 1px solid (220 15% 20%)
  - Rounded corners: rounded-lg
  - Minimum height: min-h-[600px]
  
- **Integration Feel:**
  - Shadow: shadow-xl for depth
  - Background behind iframe: 220 15% 8% (seamless blend)

### Buttons & CTAs
- **Primary:** bg-[210 100% 60%] text-white, px-8 py-3, rounded-lg, font-medium
- **Secondary:** border border-[220 15% 30%] text-[0 0% 95%], hover:bg-[220 15% 16%]
- **Disabled:** opacity-50, cursor-not-allowed
- **Loading State:** Spinner replacing text/icon

### Workflow Progress
- **Stage Indicators:**
  - Horizontal stepper on desktop
  - Vertical on mobile
  - Completed: Success color fill
  - Current: Primary color with pulse animation
  - Upcoming: Tertiary border only

### Error States
- **Error Cards:**
  - Border-l-4 with error color (0 72% 55%)
  - Background: 0 72% 10% (subtle red tint)
  - Icon + message + retry action

## Animations

**Minimal & Purposeful:**
- **Transitions:** transition-all duration-200 ease-in-out (standard)
- **File Upload:** Scale transform on drag (scale-105)
- **Stage Progression:** Fade in/out (opacity + translate)
- **Loading:** Spinner rotation, pulse on active elements
- **Success:** Single checkmark scale animation

**No:**
- Page transitions
- Decorative animations
- Parallax effects

## Workflow-Specific Layouts

### Stage 1: Upload
- Centered large drop zone
- Supported formats listed below
- File requirements as caption text

### Stage 2: Processing
- Processing card with animated progress
- Current operation text
- Cancel option (if applicable)

### Stage 3: Embedded Editing
- Full-width spreadsheet iframe
- "Continue" CTA fixed/sticky at bottom
- Instructions card above iframe

### Stage 4: Generating
- Similar to processing with different messaging
- Preview thumbnail if available

### Stage 5: Complete
- Success message with checkmark
- Download button (primary, large)
- "Start New" secondary button

## Icons
**Library:** Heroicons (via CDN)
- Upload: CloudArrowUpIcon
- Processing: CogIcon (spinning)
- Success: CheckCircleIcon
- Error: ExclamationTriangleIcon
- Download: ArrowDownTrayIcon

## Accessibility
- All interactive elements: min touch target 44x44px
- Focus rings: ring-2 ring-offset-2 ring-[210 100% 60%]
- Color contrast: WCAG AAA for all text
- Keyboard navigation: Logical tab order through workflow stages
- Loading states: Announce to screen readers