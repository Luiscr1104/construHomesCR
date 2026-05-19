# Lead Generation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convertir visitantes del sitio en leads reales de inversionistas que quieren construir cabañas turísticas para Airbnb, priorizando WhatsApp como canal de contacto.

**Architecture:** Se crean o modifican cinco componentes Astro. El nuevo `StickyContactBar` reemplaza `WhatsAppFab` con una barra fija de ancho completo visible en todo momento. Los otros cambios optimizan mensajes y CTAs de WhatsApp en secciones de alto impacto, y agregan transparencia de precio.

**Tech Stack:** Astro 5.7, Tailwind CSS 4, TypeScript, IntersectionObserver API (nativo, sin dependencias extra)

---

## Mapa de archivos

| Archivo | Acción |
|---|---|
| `src/components/StickyContactBar.astro` | Crear — barra fija de contacto |
| `src/components/WhatsAppFab.astro` | Eliminar — reemplazado por StickyContactBar |
| `src/layouts/Layout.astro` | Modificar — swap FAB → barra, agregar `pb-20` al body |
| `src/components/Hero.astro` | Modificar — texto y URL del botón WhatsApp + copy de inversión |
| `src/components/InversionAirbnb.astro` | Modificar — tabla de rangos de precio + CTA verde WhatsApp |
| `src/components/Contacto.astro` | Modificar — bloque WhatsApp-first encima del grid |

---

## Task 1: Crear StickyContactBar.astro

**Files:**
- Create: `src/components/StickyContactBar.astro`

- [ ] **Step 1: Crear el componente**

Crear `src/components/StickyContactBar.astro` con el siguiente contenido:

```astro
---
import { Image } from "astro:assets";
import isotipoImg from "../assets/isotipo.png";
---

<div
  id="sticky-contact-bar"
  class="fixed bottom-0 left-0 right-0 z-50 bg-dark border-t-2 border-primary/20 shadow-[0_-4px_24px_rgba(0,0,0,0.3)] transition-transform duration-300"
>
  <div class="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
    <!-- Marca + teléfono — visible solo en sm+ -->
    <div class="hidden sm:flex items-center gap-3 shrink-0">
      <Image
        src={isotipoImg}
        alt="ConstruHomesCR"
        width={32}
        height={18}
        class="opacity-90 object-contain"
      />
      <div>
        <div class="text-[9px] font-black uppercase tracking-[0.2em] text-primary leading-none mb-0.5">
          ConstruHomesCR
        </div>
        <div class="text-sm font-black text-white leading-none">+506 8429 1847</div>
      </div>
    </div>

    <!-- Botones -->
    <div class="flex gap-3 w-full sm:w-auto">
      <a
        href="https://wa.me/50684291847?text=Hola%2C+me+interesa+saber+m%C3%A1s+sobre+construir+una+caba%C3%B1a+tur%C3%ADstica+en+La+Fortuna"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        class="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-[#25D366] text-white font-black uppercase tracking-widest text-xs px-5 py-3 hover:brightness-110 transition-all active:scale-95"
      >
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        WhatsApp
      </a>
      <a
        href="#contacto"
        class="flex-1 sm:flex-none flex items-center justify-center bg-primary text-dark font-black uppercase tracking-widest text-xs px-5 py-3 hover:brightness-110 transition-all active:scale-95"
      >
        Cotizá tu Cabaña&nbsp;&rarr;
      </a>
    </div>
  </div>
</div>

<script>
  const bar = document.getElementById("sticky-contact-bar") as HTMLElement | null;
  const contacto = document.getElementById("contacto");

  if (bar && contacto) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        bar.style.transform = entry.isIntersecting ? "translateY(100%)" : "translateY(0)";
      },
      { threshold: 0.1 }
    );
    observer.observe(contacto);
  }
</script>
```

- [ ] **Step 2: Verificar que compila sin errores**

```bash
npm run build
```

Esperado: `Build complete` sin errores de TypeScript ni imports.

- [ ] **Step 3: Commit**

```bash
git add src/components/StickyContactBar.astro
git commit -m "feat: agregar StickyContactBar con WhatsApp y CTA para inversionistas"
```

---

## Task 2: Conectar StickyContactBar en Layout y eliminar WhatsAppFab

**Files:**
- Modify: `src/layouts/Layout.astro`
- Delete: `src/components/WhatsAppFab.astro`

- [ ] **Step 1: Actualizar Layout.astro**

En `src/layouts/Layout.astro`, hacer tres cambios:

**a) Cambiar el import (línea 5):**
```astro
// Reemplazar:
import WhatsAppFab from "../components/WhatsAppFab.astro";
// Por:
import StickyContactBar from "../components/StickyContactBar.astro";
```

**b) Agregar `pb-20` al `<body>` (línea 138):**
```astro
// Reemplazar:
<body class="bg-white text-text antialiased">
// Por:
<body class="bg-white text-text antialiased pb-20">
```

**c) Cambiar el componente usado (línea 155):**
```astro
// Reemplazar:
<WhatsAppFab />
// Por:
<StickyContactBar />
```

- [ ] **Step 2: Eliminar WhatsAppFab.astro**

```bash
rm src/components/WhatsAppFab.astro
```

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

Esperado: `Build complete` sin referencias a `WhatsAppFab`.

- [ ] **Step 4: Verificar visualmente**

```bash
npm run dev
```

Abrir http://localhost:4321 y verificar:
- La barra oscura aparece fija en la parte inferior
- El botón verde "WhatsApp" y el amarillo "Cotizá tu Cabaña" son visibles
- En desktop (> 640px): se muestra el logo y `+506 8429 1847` a la izquierda
- En mobile: solo los dos botones de ancho completo
- Al hacer scroll hasta `#contacto`, la barra se desliza hacia abajo y desaparece
- Al salir de `#contacto` (scroll hacia arriba), la barra vuelve a aparecer
- El FAB circular verde anterior ya no aparece

- [ ] **Step 5: Commit**

```bash
git add src/layouts/Layout.astro
git rm src/components/WhatsAppFab.astro
git commit -m "feat: conectar StickyContactBar en layout, eliminar WhatsAppFab"
```

---

## Task 3: Actualizar Hero.astro — CTA y copy para inversionistas

**Files:**
- Modify: `src/components/Hero.astro`

- [ ] **Step 1: Actualizar el botón de WhatsApp**

En `src/components/Hero.astro`, encontrar el `<a>` de WhatsApp (líneas 59–67) y reemplazarlo completo:

```astro
// Reemplazar bloque completo:
<a
  href="https://wa.me/50684291847?text=Hola%2C%20me%20interesa%20cotizar%20una%20casa%20en%20La%20Fortuna"
  target="_blank"
  rel="noopener noreferrer"
  class="border-4 border-dark text-dark px-10 py-[1.1rem] font-black uppercase tracking-widest text-sm hover:bg-dark hover:text-white transition-all shadow-xl active:scale-95"
>
  Escribinos por WhatsApp
</a>

// Por:
<a
  href="https://wa.me/50684291847?text=Hola%2C+me+interesa+cotizar+una+caba%C3%B1a+tur%C3%ADstica+para+Airbnb+en+La+Fortuna"
  target="_blank"
  rel="noopener noreferrer"
  class="border-4 border-dark text-dark px-10 py-[1.1rem] font-black uppercase tracking-widest text-sm hover:bg-dark hover:text-white transition-all shadow-xl active:scale-95"
>
  Cotizá tu Cabaña Airbnb &rarr;
</a>
```

- [ ] **Step 2: Agregar mención de inversión al párrafo descriptivo**

En `src/components/Hero.astro`, encontrar el `<p>` descriptivo (líneas 36–44) y actualizar el final del texto:

```astro
// Reemplazar:
<p
  class="text-lg md:text-xl text-steel max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
>
  Diseño y construcción residencial llave en mano en La Fortuna, San Carlos
  y zona norte. Modelos probados, precios transparentes y acompañamiento
  personalizado para que tu proyecto sea una realidad con{" "}
  <span
    class="text-dark font-bold underline decoration-primary decoration-4 underline-offset-4"
    >total tranquilidad</span
  >.
</p>

// Por:
<p
  class="text-lg md:text-xl text-steel max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed"
>
  Diseño y construcción residencial llave en mano en La Fortuna, San Carlos
  y zona norte. Modelos probados, precios transparentes y acompañamiento
  personalizado — para construir tu casa soñada o{" "}
  <span
    class="text-dark font-bold underline decoration-primary decoration-4 underline-offset-4"
    >convertila en inversión turística</span
  >{" "}desde el primer mes.
</p>
```

- [ ] **Step 3: Verificar visualmente**

```bash
npm run dev
```

Abrir http://localhost:4321 y verificar en la sección Hero:
- El botón de borde oscuro ahora dice "Cotizá tu Cabaña Airbnb →"
- El párrafo menciona "invertila en inversión turística"
- Hacer clic en el botón abre WhatsApp con el mensaje `"Hola, me interesa cotizar una cabaña turística para Airbnb en La Fortuna"`

- [ ] **Step 4: Commit**

```bash
git add src/components/Hero.astro
git commit -m "feat: ajustar CTA y copy del Hero para perfil inversionista Airbnb"
```

---

## Task 4: Agregar tabla de rangos de precio y CTA WhatsApp en InversiónAirbnb

**Files:**
- Modify: `src/components/InversionAirbnb.astro`

- [ ] **Step 1: Agregar datos de precios al frontmatter**

En `src/components/InversionAirbnb.astro`, agregar el array `cabinPricing` después del array `reasons` existente (antes del cierre `---`):

```astro
const cabinPricing = [
  {
    size: "S",
    range: "$35K–45K",
    beds: "1 habitación",
    area: "~40 m²",
    popular: false,
  },
  {
    size: "M",
    range: "$45K–65K",
    beds: "2 habitaciones",
    area: "~60 m²",
    popular: true,
  },
  {
    size: "L",
    range: "$65K–90K",
    beds: "3 habitaciones",
    area: "~85 m²",
    popular: false,
  },
];
```

- [ ] **Step 2: Agregar la tabla de precios y el nuevo CTA**

En `src/components/InversionAirbnb.astro`, encontrar el bloque `<!-- CTA -->` (líneas 91–98) y reemplazarlo completo con la tabla + nuevo CTA:

```astro
// Reemplazar bloque <!-- CTA --> completo:
    <!-- CTA -->
    <div class="text-center mb-6">
      <a
        href="#contacto"
        class="inline-block bg-primary text-dark font-black uppercase tracking-widest text-xs px-12 py-5 hover:brightness-110 transition-all shadow-2xl active:scale-95"
      >
        Cotizá tu cabaña para Airbnb &rarr;
      </a>
    </div>

// Por:
    <!-- Tabla de rangos de inversión -->
    <div class="max-w-3xl mx-auto mb-10">
      <div
        class="inline-block px-4 py-1 bg-primary/10 border border-primary/30 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6 mx-auto block w-fit"
      >
        Rangos de Inversión
      </div>
      <div class="grid grid-cols-3 gap-3 mb-4">
        {
          cabinPricing.map((cabin) => (
            <div
              class={`relative flex flex-col items-center text-center p-6 transition-colors ${
                cabin.popular
                  ? "bg-primary"
                  : "bg-white/5 border border-white/10 hover:border-primary/40"
              }`}
            >
              {cabin.popular && (
                <span class="absolute -top-3 left-1/2 -translate-x-1/2 bg-dark text-primary text-[9px] font-black uppercase tracking-widest px-3 py-1 whitespace-nowrap">
                  Más popular
                </span>
              )}
              <div
                class={`text-[10px] font-black uppercase tracking-[0.2em] mb-3 ${
                  cabin.popular ? "text-dark" : "text-primary"
                }`}
              >
                Cabaña {cabin.size}
              </div>
              <div
                class={`font-display text-3xl font-black leading-none mb-3 ${
                  cabin.popular ? "text-dark" : "text-white"
                }`}
              >
                {cabin.range}
              </div>
              <div
                class={`text-xs font-bold uppercase tracking-wide mb-1 ${
                  cabin.popular ? "text-dark/80" : "text-gray-400"
                }`}
              >
                {cabin.beds}
              </div>
              <div
                class={`text-xs ${cabin.popular ? "text-dark/60" : "text-gray-600"}`}
              >
                {cabin.area}
              </div>
            </div>
          ))
        }
      </div>
      <p class="text-center text-gray-600 text-xs leading-relaxed">
        Precios referenciales · incluyen materiales, mano de obra y permisos en La Fortuna
      </p>
    </div>

    <!-- CTA WhatsApp -->
    <div class="text-center mb-6">
      <a
        href="https://wa.me/50684291847?text=Hola%2C+quiero+saber+el+costo+de+una+caba%C3%B1a+tur%C3%ADstica+en+La+Fortuna.+%C2%BFPueden+darme+una+cotizaci%C3%B3n%3F"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-3 bg-[#25D366] text-white font-black uppercase tracking-widest text-xs px-12 py-5 hover:brightness-110 transition-all shadow-2xl active:scale-95"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Cotizá tu cabaña por WhatsApp &rarr;
      </a>
    </div>
```

- [ ] **Step 3: Verificar build**

```bash
npm run build
```

Esperado: `Build complete` sin errores.

- [ ] **Step 4: Verificar visualmente**

```bash
npm run dev
```

Abrir http://localhost:4321, hacer scroll a la sección "Inversión Inteligente" y verificar:
- La tabla de 3 columnas (S / M ★ / L) aparece con los rangos de precio
- La columna M tiene el badge "Más popular" con fondo `primary`
- El botón CTA es verde `#25D366` con ícono de WhatsApp
- La nota de pie de página está visible y en gris tenue
- Hacer clic en el botón abre WhatsApp con el mensaje de cotización

- [ ] **Step 5: Commit**

```bash
git add src/components/InversionAirbnb.astro
git commit -m "feat: agregar tabla de rangos de precio y CTA WhatsApp en InversiónAirbnb"
```

---

## Task 5: Agregar bloque WhatsApp-first en Contacto

**Files:**
- Modify: `src/components/Contacto.astro`

- [ ] **Step 1: Agregar el bloque WhatsApp-first**

En `src/components/Contacto.astro`, encontrar el `<div class="grid grid-cols-1 lg:grid-cols-2 ...">` (línea 27) e insertar el siguiente bloque **inmediatamente antes** de ese div:

```astro
    <!-- WhatsApp-first block -->
    <div class="max-w-2xl mx-auto mb-12">
      <div class="bg-primary p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div class="text-center sm:text-left">
          <div class="text-[10px] font-black uppercase tracking-[0.3em] text-dark/60 mb-2">
            Respuesta inmediata
          </div>
          <h3 class="font-display text-2xl font-black text-dark uppercase tracking-tighter leading-tight">
            ¿Preferís hablar directo?
          </h3>
          <p class="text-dark/70 text-sm mt-2 leading-relaxed">
            Escribinos por WhatsApp y te respondemos en minutos con información y precios para tu cabaña.
          </p>
        </div>
        <a
          href="https://wa.me/50684291847?text=Hola%2C+me+gustar%C3%ADa+cotizar+una+caba%C3%B1a+tur%C3%ADstica+en+La+Fortuna"
          target="_blank"
          rel="noopener noreferrer"
          class="shrink-0 flex items-center gap-3 bg-[#25D366] text-white font-black uppercase tracking-widest text-xs px-8 py-4 hover:brightness-110 transition-all shadow-lg active:scale-95 whitespace-nowrap"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          💬 Escribinos por WhatsApp
        </a>
      </div>
      <div class="text-center mt-4">
        <span class="text-steel text-xs font-bold uppercase tracking-widest">o completá el formulario abajo</span>
      </div>
    </div>
```

- [ ] **Step 2: Verificar build**

```bash
npm run build
```

Esperado: `Build complete` sin errores.

- [ ] **Step 3: Verificar visualmente**

```bash
npm run dev
```

Abrir http://localhost:4321, hacer scroll a la sección "Hagamos Realidad tu Proyecto" y verificar:
- El bloque amarillo `bg-primary` aparece encima del formulario
- El texto dice "¿Preferís hablar directo?" con descripción
- El botón verde de WhatsApp está a la derecha en desktop, abajo en mobile
- Debajo del bloque aparece el separador "o completá el formulario abajo"
- El formulario existente de 2 columnas sigue funcionando normalmente

- [ ] **Step 4: Verificar recorrido completo del usuario**

Con `npm run dev` activo, verificar el golden path del inversionista:
1. Aterrizaje en Hero → el párrafo menciona inversión turística, el botón dice "Cotizá tu Cabaña Airbnb →"
2. La sticky bar amarilla/verde es visible en la parte inferior durante todo el scroll
3. Sección InversiónAirbnb → tabla de precios visible, CTA verde de WhatsApp
4. Sección Contacto → bloque WhatsApp prominente antes del formulario
5. Al llegar a `#contacto`, la sticky bar desaparece
6. Al hacer scroll hacia arriba, la sticky bar vuelve

- [ ] **Step 5: Commit final**

```bash
git add src/components/Contacto.astro
git commit -m "feat: agregar bloque WhatsApp-first en sección Contacto"
```

---

## Nota sobre precios

Los rangos de precio en `InversionAirbnb.astro` (Task 4, Step 1) son **placeholder**. Antes de hacer deploy a producción, actualizar el array `cabinPricing` con los rangos reales confirmados por el equipo de ConstruHomesCR.

---

## Fase 2 — Referencia (implementar cuando haya contenido real)

Esta fase no forma parte de este plan. Cuando haya fotos y testimonios reales, crear:
- `src/components/Portafolio.astro` — grid de proyectos entregados, insertado entre `<Galeria />` y `<Testimonios />` en `index.astro`
- Refactorizar `src/components/Testimonios.astro` — agregar campo `airbnbIncome` a cada testimonio
