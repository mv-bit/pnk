# Refactoring Plan - Styles and Files Unification
**Created:** 2025-08-28
**Status:** In Progress

## Objective
Refactor design.html and properties.html to create a unified CSS system with centralized color control and consistent styling across both files.

## Initial State Analysis

### Current Architecture
- **HTML Files:** design.html, properties.html
- **CSS Organization:** Inline styles and style tags within HTML files
- **Framework:** Tailwind CSS with custom configuration
- **Font System:** Multiple font families (Inter, Montserrat, Open Sans)
- **Color Scheme:** Mix of hardcoded colors and Tailwind custom colors

### Problem Areas
1. **Duplicated Styles:** Both HTML files contain identical style blocks
2. **Inconsistent Color Usage:** Colors defined in multiple places
3. **No Central CSS File:** All styles embedded in HTML
4. **Mixed Color Systems:** Tailwind colors mixed with hex values
5. **Redundant Scrollbar Hiding:** Defined multiple times

### Dependencies
- Tailwind CSS (CDN)
- Font Awesome (CDN)
- Google Fonts (Inter, Montserrat, Open Sans)

## Refactoring Tasks

### Phase 1: Setup and Analysis ✅
- [x] Check for existing refactor session
- [x] Analyze current styles in both HTML files
- [x] Identify common and unique styles
- [x] Document color usage patterns

### Phase 2: Create Unified CSS System
- [ ] Create css/variables.css with CSS custom properties
- [ ] Create css/base.css with base styles
- [ ] Create css/components.css for reusable components
- [ ] Create css/pages.css for page-specific styles
- [ ] Create css/main.css to import all CSS modules

### Phase 3: Extract and Consolidate Styles
- [ ] Extract common styles from both HTML files
- [ ] Extract design.html specific styles
- [ ] Convert hardcoded colors to CSS variables
- [ ] Organize styles by component/section

### Phase 4: Update HTML Files
- [ ] Update design.html to use centralized CSS
- [ ] Update properties.html to use centralized CSS
- [ ] Remove inline style tags
- [ ] Ensure Tailwind integration works with new CSS

### Phase 5: Validation
- [ ] Verify all colors are controlled from variables
- [ ] Test both pages for visual consistency
- [ ] Check responsive behavior
- [ ] Validate no broken styles

## Color Palette Mapping

| Current Usage | Variable Name | Value | Description |
|--------------|---------------|-------|-------------|
| gray-850 | --color-primary-dark | #2D2D2D | Primary dark gray |
| gray-750 | --color-secondary-dark | #3A3A3A | Secondary dark gray |
| soft-gray | --color-border | #D3D3D3 | Border and divider color |
| #3F20FB | --color-highlight | #3F20FB | Highlight/selection color |
| rgba(63, 32, 251, 0.1) | --color-highlight-bg | rgba(63, 32, 251, 0.1) | Highlight background |
| gray-50 | --color-bg-light | #F9FAFB | Light background |
| gray-100 | --color-bg-section | #F3F4F6 | Section background |
| gray-200 | --color-bg-hero | #E5E7EB | Hero section background |
| gray-600 | --color-text-secondary | #4B5563 | Secondary text |
| gray-700 | --color-text-primary | #374151 | Primary text |
| gray-800 | --color-text-dark | #1F2937 | Dark text |
| white | --color-white | #FFFFFF | White |
| black | --color-black | #000000 | Black |

## CSS Architecture

```
css/
├── variables.css    # CSS custom properties for colors and spacing
├── base.css        # Reset, typography, base styles
├── components.css  # Reusable component styles
├── pages.css       # Page-specific styles
└── main.css        # Main file that imports all others
```

## Validation Checklist
- [ ] All colors use CSS variables
- [ ] No duplicate style definitions
- [ ] Consistent naming conventions
- [ ] Both pages render correctly
- [ ] Tailwind utilities still work
- [ ] Font Awesome icons display properly
- [ ] Google Maps functionality intact
- [ ] Photo modal works on design.html
- [ ] Gallery scrolling works
- [ ] Contact form toggles properly
- [ ] All hover states work
- [ ] Responsive design maintained

## Risk Assessment
- **Low Risk:** Color variable extraction
- **Medium Risk:** Tailwind integration with custom CSS
- **Low Risk:** Moving styles to external files

## Rollback Strategy
- Git commits at each phase
- Original HTML files preserved
- Can revert CSS changes independently