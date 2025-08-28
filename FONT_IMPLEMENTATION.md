# Font Implementation for PNK Templates

## Font Family: D-DIN Pro

These templates use the exact same font family as pnk.group website: **D-DIN Pro**

### Font Variants Used:
- `d-din-proregular` - Body text (400 weight)
- `d-din-promedium` - Medium emphasis (500 weight)
- `d-din-prosemibold` - Semi-bold text (600 weight)
- `d-din-probold` - Headings and bold text (700 weight)
- `d-din-proextrabold` - Extra bold emphasis (800 weight)

### Implementation Details:

1. **Font Stack** (matching pnk.group exactly):
   ```css
   font-family: 'd-din-proregular', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, serif;
   ```

2. **Font Files Required**:
   When deploying to pnk.group, you'll need to:
   - Use the existing D-DIN Pro font files from pnk.group WordPress
   - OR provide licensed D-DIN Pro font files in WOFF2 and WOFF formats
   - Place them in the `/fonts/` directory or update paths in `css/fonts.css`

3. **File Structure**:
   ```
   css/
   ├── fonts.css       # @font-face declarations for D-DIN Pro
   ├── base.css        # Typography implementation
   └── main.css        # Imports all CSS including fonts
   ```

4. **Usage in HTML**:
   - Body text automatically uses `d-din-proregular`
   - Headings use `d-din-probold`
   - Use `.font-medium`, `.font-semibold`, `.font-bold`, `.font-extrabold` classes for different weights

### Color Update:
- Primary dark color updated to **#54565a** (matching pnk.group brand)
- Applied consistently across all components and both templates

### Integration with pnk.group:
Since these templates will be deployed to pnk.group:
1. The D-DIN Pro fonts should already be available on the WordPress site
2. Update the font URLs in `css/fonts.css` to point to the actual font locations
3. The font family names match exactly what's used on pnk.group

### Fallback Behavior:
If D-DIN Pro fonts are not loaded, the system will fall back to:
1. System fonts (-apple-system, BlinkMacSystemFont)
2. Common fonts (Segoe UI, Roboto, Helvetica Neue, Arial)
3. Generic serif as final fallback