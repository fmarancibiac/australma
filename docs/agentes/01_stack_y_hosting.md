# Australma — Fase 0: Stack, hosting y arquitectura

## Stack recomendado
Opciones en orden de preferencia:
1. HTML5 + CSS moderno + Vanilla JS (sin build).
2. Vite + React 18 + TypeScript + Tailwind CSS (si se prevé catálogo pronto).

## Hosting
Vercel / Netlify / Cloudflare Pages. Cualquiera con HTTPS automático y dominio propio.

## Estructura de carpetas (HTML/CSS recomendada)
/index.html
/css/variables.css
/css/base.css
/css/layout.css
/css/components.css
/css/utilities.css
/js/main.js
/assets/brand/isotipo.svg
/assets/images/hero.webp
/favicon.ico
/robots.txt
/sitemap.xml
/og-image.jpg

## Design tokens
- Verde austral: `#123628`
- Azul profundo: `#0D1B2A`
- Dorado premium: `#C49A2C`
- Arena natural: `#F3EDE0`
- Grafito: `#232323`
- Títulos: Trajan/Montserrat
- Cuerpo: Montserrat
- Interlineado: 1.5
- Márgenes: 1 pulgada

## SEO base
- Title: “Australma | El Alma del Sur”
- Meta description: 150–160 caracteres.
- OG title, description e image.
- Favicon y apple-touch-icon.
- Sitemap.xml y robots.txt.

## Lead capture
- Formulario email + nombre (opcional).
- Backend: Formspree, Google Sheets o Mailchimp free.
- Validación frontend obligatoria.
