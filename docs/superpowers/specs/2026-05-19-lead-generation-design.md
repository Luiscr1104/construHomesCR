# ConstruHomesCR — Lead Generation Design Spec
**Fecha:** 2026-05-19  
**Objetivo:** Convertir visitantes del sitio en leads reales de clientes interesados en construir cabañas turísticas para Airbnb en La Fortuna, Costa Rica.

---

## Contexto y Decisiones de Diseño

### Perfil de cliente primario
Inversionistas que quieren construir una cabaña turística para alquilar en Airbnb en La Fortuna / San Carlos. Las familias que construyen casa propia son audiencia secundaria.

### Canal de conversión primario
WhatsApp (+506 8429 1847). El formulario de contacto es secundario.

### Principales fricciones identificadas
1. **Falta de transparencia de precio** — el inversionista necesita saber si puede costear el proyecto antes de escribir.
2. **Falta de confianza** — no hay proyectos reales ni testimonios con cifras concretas (todo el contenido actual es placeholder).

### Enfoque elegido: Híbrido (Fase 1 + Fase 2)
- **Fase 1** (implementable sin contenido nuevo): optimizar CTAs de WhatsApp + precio ancla visible.
- **Fase 2** (cuando haya contenido real): portafolio de proyectos + testimonios de inversionistas con ROI.

---

## Fase 1 — Cambios Inmediatos

### 1. Sticky Bar (nuevo componente `StickyContactBar.astro`)
Reemplaza el componente `WhatsAppFab.astro` actual.

**Comportamiento:**
- Barra oscura (`bg-dark`) fija en `position: fixed; bottom: 0`, ancho completo, `z-50`
- Visible en todo momento en mobile y desktop
- Se oculta automáticamente cuando la sección `#contacto` entra en viewport (IntersectionObserver), para no duplicar CTAs al llegar al final de la página
- Reaparece al salir de `#contacto`

**Contenido:**
- Izquierda: logotipo pequeño + nombre "ConstruHomesCR" + teléfono `+506 8429 1847`
- Derecha: dos botones
  - Botón verde WhatsApp: `💬 WhatsApp` → `https://wa.me/50684291847?text=Hola%2C+me+interesa+saber+m%C3%A1s+sobre+construir+una+caba%C3%B1a+tur%C3%ADstica+en+La+Fortuna`
  - Botón amarillo primario: `Cotizá tu Cabaña →` → scroll a `#contacto`
- En mobile (< 640px): fila de dos botones de ancho completo apilados, sin texto de contacto

**Nota de padding:** Agregar `pb-20` al `<body class="...">` en `Layout.astro` (línea 138) para que el contenido de página no quede tapado por la barra fija.

---

### 2. Hero — Ajuste de CTA y Mensajería

**Cambios en `Hero.astro`:**

a. El botón de WhatsApp cambia:
   - Texto actual: `"Escribinos por WhatsApp"`
   - Texto nuevo: `"Cotizá tu Cabaña Airbnb →"`
   - URL actual: `...text=Hola%2C%20me%20interesa%20cotizar%20una%20casa%20en%20La%20Fortuna`
   - URL nueva: `...text=Hola%2C+me+interesa+cotizar+una+caba%C3%B1a+tur%C3%ADstica+para+Airbnb+en+La+Fortuna`

b. El párrafo descriptivo agrega mención explícita de inversión:
   - Mantener copy existente pero agregar al final: `"o convertila en una inversión turística desde el primer mes."`

---

### 3. InversiónAirbnb — Tabla de Rangos de Precio + CTA WhatsApp

**Cambios en `InversionAirbnb.astro`:**

a. Agregar tabla de 3 columnas **antes del CTA existente**:

| | Cabaña S | Cabaña M ★ | Cabaña L |
|---|---|---|---|
| Inversión | $35K–45K | $45K–65K | $65K–90K |
| Habitaciones | 1 hab | 2 hab | 3 hab |
| Área aprox. | ~40 m² | ~60 m² | ~85 m² |

- La columna M lleva el badge "Más popular" con fondo `primary`
- Nota de pie: `"Precios referenciales · incluyen materiales, mano de obra y permisos en La Fortuna"`
- **Los rangos son placeholder** — Luis debe confirmar los números reales antes de publicar

b. El CTA existente (`Cotizá tu cabaña para Airbnb →`) se convierte en botón verde WhatsApp:
   - Color: `#25D366` (verde WhatsApp)
   - Mensaje: `"Hola%2C+quiero+saber+el+costo+de+una+caba%C3%B1a+tur%C3%ADstica+en+La+Fortuna.+%C2%BFPueden+darme+una+cotizaci%C3%B3n%3F"`

---

### 4. Contacto — WhatsApp Primero

**Cambios en `Contacto.astro`:**

Agregar encima del grid (antes del formulario y la columna de info) un bloque destacado:
- Fondo `bg-primary`, padding generoso
- Texto: `"¿Preferís hablar directo?"` + descripción breve
- Botón verde WhatsApp grande: `"💬 Escribinos por WhatsApp →"`
- Mensaje: `"Hola%2C+me+gustar%C3%ADa+cotizar+una+caba%C3%B1a+tur%C3%ADstica+en+La+Fortuna"`
- Este bloque va en ancho completo, centrado, antes del grid de 2 columnas existente

---

## Fase 2 — Cuando Haya Contenido Real

### 5. Portafolio de Proyectos (nuevo componente `Portafolio.astro`)
- Se inserta entre `Galeria` y `Testimonios` en `index.astro`
- Grid de 4–6 tarjetas: foto del proyecto, nombre, m², ciudad, estado (entregado)
- Hasta tener fotos reales: mostrar placeholder con texto `"Próximamente: conocé nuestros proyectos entregados"`
- Cada tarjeta tiene CTA `"Construí algo similar →"` → WhatsApp

### 6. Testimonios de Inversionistas (refactor de `Testimonios.astro`)
- Reemplazar los 3 testimonios placeholder actuales con datos reales
- Cada card debe incluir: nombre, foto (o iniciales), ciudad, tipo de proyecto, **ingreso mensual Airbnb real** (ej: `"₡850,000/mes"`)
- Sin datos reales, mantener las cards actuales con el TODO visible en código

---

## Archivos a Modificar

| Archivo | Tipo de cambio |
|---|---|
| `src/components/WhatsAppFab.astro` | Reemplazar por `StickyContactBar.astro` |
| `src/components/StickyContactBar.astro` | Crear nuevo |
| `src/layouts/Layout.astro` | Cambiar `<WhatsAppFab>` por `<StickyContactBar>`, agregar padding-bottom al body |
| `src/components/Hero.astro` | Ajustar texto y URL del botón WhatsApp + copy descriptivo |
| `src/components/InversionAirbnb.astro` | Agregar tabla de precios + cambiar CTA a WhatsApp verde |
| `src/components/Contacto.astro` | Agregar bloque WhatsApp-first encima del grid |
| `src/pages/index.astro` | Fase 2: insertar `<Portafolio>` entre Galeria y Testimonios |

---

## Criterios de Éxito

- El botón de WhatsApp es visible en todo momento (sticky bar)
- El inversionista puede ver rangos de precio sin tener que preguntar
- Los mensajes preescritos de WhatsApp son específicos para inversionistas de Airbnb
- El sitio es funcional y genera leads desde el día de deploy de Fase 1
- La arquitectura de Fase 2 está lista para recibir contenido real sin rediseño

---

## Fuera de Scope

- Calculadora de ROI interactiva (considerada, descartada por complejidad vs. beneficio inmediato)
- Animaciones con Remotion (valor bajo para esta etapa de generación de leads)
- Integración con CRM o sistema de seguimiento de leads
- Cambios a SEO, meta tags o estructura de URLs
