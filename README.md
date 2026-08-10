# Australma

Marca chilena de productos personalizados, outdoor y de aventura inspirados en la naturaleza del sur.

## Fase 0 — Landing page "En construcción"

Sitio one-page responsive con captura de leads completos: nombre, email, teléfono/WhatsApp, región y mensaje o consulta.

## Stack

- HTML5 semántico
- CSS moderno (variables, grid, flexbox)
- Vanilla JS
- Formspree como backend de formulario
- Endpoint configurable mediante `AUSTRALMA_FORM_ENDPOINT`; por defecto usa `/api/leads`

## Estructura

```
/
├── index.html
├── robots.txt
├── sitemap.xml
├── favicon.svg
├── css/
│   └── styles.css
├── js/
│   └── main.js
└── assets/
    ├── brand/
    │   └── isotipo.svg
    └── images/
        └── hero.webp
```

## Deploy

Compatible con Vercel, Netlify o Cloudflare Pages. Subir la raíz del proyecto sin configuración adicional.

### Endpoint del formulario

El formulario envía un JSON con `nombre`, `email`, `telefono`, `region`, `mensaje` y `source: 'australma-web'`.

- Usá la variable global `AUSTRALMA_FORM_ENDPOINT` para apuntar a tu backend (por ejemplo Google Sheets via Apps Script).
- Si no se define, usa `/api/leads`.

## Diseño

- **Verde austral:** `#123628`
- **Azul profundo:** `#0D1B2A`
- **Dorado premium:** `#C49A2C`
- **Arena natural:** `#F3EDE0`
- **Grafito:** `#232323`


## Proceso de trabajo con el cliente

- Iteración explícita por entregas funcionales.
- Cada ciclo incluye revisión del comportamiento de venta y ajuste de copy/UX para mejorar conversión.
- Métricas de control: tasa de envío del formulario, % leads válidos y feedback comercial directo.

## Fases previstas

1. Fase 0 — landing "En construcción"
2. Iteración 1 — ajustes de copy, conversión y validación de intención de compra
3. Iteración 2 — incorporar aprendizaje del funnel comercial y proximas secciones
4. Fase 1 — catálogo + storytelling
5. Fase 2 — pasarela de pago y fulfillment


