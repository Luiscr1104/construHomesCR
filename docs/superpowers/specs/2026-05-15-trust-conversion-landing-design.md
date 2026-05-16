# Spec: Trust & Conversion — ConstruHomesCR Landing Page

**Fecha:** 2026-05-15
**Objetivo:** Agregar secciones de confianza y conversión a la landing page existente para vender construcción de casas y cabañas turísticas en La Fortuna, San Carlos.

---

## Contexto

El sitio actual tiene: Hero → Diseños (tabs con 3 modelos) → Galería (6 fotos) → Contacto.

Le faltan los elementos clave del funnel de conversión: prueba social, proceso claro, diferenciador de mercado (Airbnb), y manejo de objeciones. El mercado tiene dos segmentos igualmente importantes: residencial (familia que quiere su casa) y turístico (inversionista que quiere una cabaña para rentar en Airbnb).

---

## Flujo final

```
Hero → Stats Bar → Diseños → Proceso → Inversión Airbnb → Galería → Testimonios → FAQ → Contacto
```

Cada nueva sección es un componente Astro independiente montado en `src/pages/index.astro`.

---

## Secciones nuevas

### 1. Stats Bar (`StatsBar.astro`)

**Posición:** Inmediatamente después del Hero.
**Fondo:** `bg-dark` — contrasta con el Hero blanco y llama la atención.
**Contenido:** 4 métricas en grid horizontal (desktop) / 2×2 (mobile).

| Número | Label | Sub-label |
|--------|-------|-----------|
| 15+ | Años en el mercado | Experiencia comprobada |
| 80+ | Proyectos completados | En zona norte |
| 95% | Clientes satisfechos | Recomendarían ConstruHomesCR |
| 100% | Entrega a tiempo | Sin sorpresas |

**Tipografía:** Número en `text-primary` grande (font-display, 4xl/5xl), label en blanco, sub-label en gris. Sin íconos — solo tipografía bold.

---

### 2. Proceso (`Proceso.astro`)

**Posición:** Después de Diseños.
**Fondo:** `bg-white`
**Título:** "Cómo Funciona" / sub: "De la idea a las llaves en mano, sin complicaciones."

5 pasos conectados visualmente por línea horizontal (desktop) / vertical (mobile). Número de paso en círculo `bg-primary text-dark`.

| # | Título | Descripción |
|---|--------|-------------|
| 1 | Consulta Gratuita | Conversamos sobre tu proyecto, tu lote y tu presupuesto. Sin compromiso. |
| 2 | Diseño y Planos | Desarrollamos los planos arquitectónicos adaptados a tu lote y preferencias. |
| 3 | Permisos y Trámites | Gestionamos todos los permisos municipales. Vos no te preocupás por el papeleo. |
| 4 | Construcción | Ejecutamos con materiales de calidad y supervisión técnica permanente en sitio. |
| 5 | Entrega Llave en Mano | Recibís tu propiedad lista para habitar, alquilar o publicar en Airbnb. |

**CTA al pie:** Botón "Empezá tu consulta gratuita →" que hace scroll a `#contacto`.

---

### 3. Inversión Airbnb (`InversionAirbnb.astro`)

**Posición:** Después de Proceso.
**Fondo:** `bg-dark` — cambio de tono deliberado, pitch diferente.
**Titular:** "Tu cabaña en La Fortuna puede generar ingresos desde el primer mes"

**3 cards de métricas de mercado:**
- $95/noche — tarifa promedio Airbnb en La Fortuna
- 70% ocupación — turismo año redondo por el Arenal
- ~$2,000/mes — ingreso estimado con cabaña de 2 habitaciones

**3 razones por qué La Fortuna:**
1. Volcán Arenal — destino #1 turístico de Costa Rica
2. Aguas termales y naturaleza — turistas de alto gasto
3. Demanda constante — vuelos internacionales, sin temporada baja real

**CTA:** "Cotizá tu cabaña para Airbnb →" (scroll a `#contacto`).

**Disclaimer al pie:** *"Los ingresos estimados son referenciales basados en datos de mercado. Resultados varían según ubicación, temporada y gestión."*

---

### 4. Testimonios (`Testimonios.astro`)

**Posición:** Después de Galería.
**Fondo:** `bg-white`
**Título:** "Lo que dicen nuestros clientes"

3 cards en grid (desktop) / apiladas (mobile). Cada card:
- Avatar con iniciales en círculo `bg-primary text-dark`
- Nombre, ubicación
- Tipo de proyecto construido (badge)
- Quote en texto grande

**Contenido (placeholder — reemplazar con reales):**

1. *"Construimos nuestra casa en 8 meses y quedamos encantados con el resultado. El proceso fue transparente desde el primer día."*
   — Carlos & Andrea Mora · La Fortuna · Casa modelo Curridabat

2. *"Tenía miedo de los trámites y permisos pero ConstruHomesCR lo manejó todo. Hoy mi cabaña genera ₡800,000 al mes en Airbnb."*
   — Roberto Quesada · Fortuna, Alajuela · Cabaña turística 2 habitaciones

3. *"Excelente calidad de materiales y siempre al día con los avances. Recomiendo ConstruHomesCR sin dudarlo."*
   — Mariela Arce · San Carlos · Casa modelo Libelula

---

### 5. FAQ (`FAQ.astro`)

**Posición:** Antes de Contacto.
**Fondo:** `bg-gray-50` — separación visual suave.
**Título:** "Preguntas Frecuentes"

Accordion interactivo: una pregunta abierta a la vez. Animación suave de expand/collapse. Ícono `+`/`−` en `text-primary`.

7 preguntas:

1. **¿Cuánto tiempo toma construir una casa?** — Entre 6 y 10 meses dependiendo del modelo y tamaño. Casas medianas (~100m²) en promedio 7 meses.
2. **¿Incluyen los permisos municipales?** — Sí. Gestionamos todos los trámites ante la municipalidad de San Carlos y el INVU. Vos solo firmás.
3. **¿Puedo adaptar los diseños a mi lote?** — Absolutamente. Los modelos son base de referencia. Adaptamos dimensiones, distribución y acabados a tu lote y preferencias.
4. **¿Trabajan con financiamiento bancario (BCR, BN, BAC)?** — Sí. Tenemos experiencia trabajando con clientes que financian mediante crédito hipotecario. Te asesoramos en el proceso.
5. **¿Qué garantía tienen las construcciones?** — Un año de garantía estructural y de acabados. Cualquier defecto constructivo lo resolvemos sin costo adicional.
6. **¿Construyen fuera de La Fortuna?** — Atendemos toda la zona norte: San Carlos, Aguas Zarcas, Pital, Ciudad Quesada y alrededores.
7. **¿Una cabaña construida por ustedes puede registrarse en Airbnb?** — Sí. Diseñamos pensando en uso turístico: distribución práctica, acabados duraderos, y cumplimiento de los requisitos del ICT si lo necesitás.

**CTA al pie:** "¿Tenés otra pregunta? Escribinos por WhatsApp →" (link a WhatsApp).

---

## Implementación técnica

- Cada sección = componente Astro independiente en `src/components/`
- Todos los textos son placeholder — marcados con comentarios `<!-- TODO: reemplazar con datos reales -->`
- El accordion del FAQ usa JavaScript vanilla en `<script>` dentro del componente, sin librerías externas
- El paso de proceso usa CSS grid/flex para la línea conectora — sin librerías de diagrama
- Todos los componentes siguen el sistema de diseño existente: `font-display`, `text-primary` (#fdb813), `bg-dark` (#1a1a1a), `text-steel`, clases de Tailwind 4
- Consistencia visual con secciones existentes: mismos patrones de header de sección (`inline-block px-4 py-1 bg-dark text-primary text-[10px] font-black uppercase tracking-[0.3em]`)

---

## Archivos a modificar

- `src/pages/index.astro` — agregar imports y montar las 5 nuevas secciones en el orden correcto
- `src/components/StatsBar.astro` — nuevo
- `src/components/Proceso.astro` — nuevo
- `src/components/InversionAirbnb.astro` — nuevo
- `src/components/Testimonios.astro` — nuevo
- `src/components/FAQ.astro` — nuevo
