# The Blog

A minimalist, typography-focused blog built with vanilla HTML and CSS. Live at: https://gartblog.xyz

## Technical Stack

- Pure HTML5 and CSS3
- No JavaScript dependencies
- Static site architecture for maximum performance
- Custom CSS reset implementation

## Design Features

- Responsive typography using CSS custom properties (variables)
- Dark mode support via `prefers-color-scheme` media query
- JetBrains Mono as the primary typeface
- Fluid layout with calculated units (ch, rem)
- Mobile-first responsive design
- Dynamic grid system using modern CSS features
- Automatic content hierarchy with calculated spacing

## CSS Architecture

- CSS custom properties for consistent theming
- Modular scale typography
- Content-based unit sizing (ch units for width)
- Minimal specificity approach
- Built-in debug utilities for layout development

## Browser Support

Optimized for modern browsers with support for:
- CSS Grid
- Custom Properties
- Modern CSS selectors
- Media Queries Level 5

## Development

The site uses a flat file structure with:
- Articles stored in `/articles` directory
- Images organized by category in `/images`
- Global styles in `index.css` and `reset.css`

## Image Management

Images are organized in dedicated subdirectories:
- `/images/destiny/` - Game-related images
- `/images/gartcup/` - Event-specific images
- `/images/favicon/` - Site icons
- `/images/tmz/` - Article-specific images

## Performance

- No build step required
- Zero JavaScript overhead
- Minimal CSS footprint
- Static file serving
- Optimized image assets
