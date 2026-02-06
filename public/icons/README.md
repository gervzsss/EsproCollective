# PWA Icons

Replace these placeholder icons with your actual brand icons:

## Required Icons

| File           | Size    | Purpose                              |
| -------------- | ------- | ------------------------------------ |
| `icon-192.png` | 192x192 | Android Chrome manifest icon         |
| `icon-512.png` | 512x512 | Android Chrome manifest icon (large) |
| `icon-152.png` | 152x152 | iPad (non-Retina)                    |
| `icon-167.png` | 167x167 | iPad Pro                             |
| `icon-180.png` | 180x180 | iPhone Retina                        |

## Also needed in `/public`:

| File                   | Size    | Purpose          |
| ---------------------- | ------- | ---------------- |
| `apple-touch-icon.png` | 180x180 | Default iOS icon |
| `favicon.ico`          | 32x32   | Browser tab icon |

## Design Guidelines

- Use your brand primary color (`#fa8314`) as background
- Keep safe zone for maskable icons (center the logo in ~60% of the area)
- Use transparent or solid background depending on platform needs

## Quick Generation

You can generate all sizes from a single 512x512 source using tools like:

- https://realfavicongenerator.net
- https://maskable.app (for testing maskable icons)
