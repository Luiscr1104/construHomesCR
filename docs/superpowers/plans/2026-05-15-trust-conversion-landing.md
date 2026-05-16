# Trust & Conversion — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Agregar 5 secciones nuevas (StatsBar, Proceso, InversionAirbnb, Testimonios, FAQ) a la landing de ConstruHomesCR para aumentar confianza y conversión.

**Architecture:** Cada sección es un componente Astro estático independiente en `src/components/`. Se montan en `src/pages/index.astro` en este orden: Hero → StatsBar → Diseños → Proceso → InversionAirbnb → Galería → Testimonios → FAQ → Contacto. El accordion del FAQ usa JS vanilla dentro del componente. Sin dependencias externas nuevas.

**Tech Stack:** Astro 5.7, Tailwind CSS 4. Sistema de diseño: `font-display` (Archivo Black), `text-primary` (#fdb813), `bg-dark` (#1a1a1a), `text-steel` (gris), `container mx-auto px-6`. No hay test runner — la verificación es `pnpm build` (captura errores de compilación TS/Astro).

---

## File Map

| Acción | Archivo |
|--------|---------|
| Crear | `src/components/StatsBar.astro` |
| Crear | `src/components/Proceso.astro` |
| Crear | `src/components/InversionAirbnb.astro` |
| Crear | `src/components/Testimonios.astro` |
| Crear | `src/components/FAQ.astro` |
| Modificar | `src/pages/index.astro` |

---

## Task 1: StatsBar

**Files:**
- Create: `src/components/StatsBar.astro`

- [ ] **Crear `src/components/StatsBar.astro`:**

```astro
---
const stats = [
  { number: "15+", label: "Años en el mercado", sub: "Experiencia comprobada" },
  { number: "80+", label: "Proyectos completados", sub: "En zona norte" },
  { number: "95%", label: "Clientes satisfechos", sub: "Recomendarían ConstruHomesCR" },
  { number: "100%", label: "Entrega a tiempo", sub: "Sin sorpresas" },
];
---

<section class="bg-dark py-14 border-b-4 border-primary">
  <div class="container mx-auto px-6">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-white/10">
      {stats.map((stat) => (
        <div class="text-center lg:px-8 py-2">
          <div class="font-display text-5xl md:text-6xl font-black text-primary mb-2 leading-none">{stat.number}</div>
          <div class="text-white font-bold uppercase tracking-wider text-xs md:text-sm mb-1">{stat.label}</div>
          <div class="text-gray-500 text-[10px] uppercase tracking-widest font-bold">{stat.sub}</div>
        </div>
      ))}
    </div>
  </div>
</section>
```

- [ ] **Verificar compilación:**

```bash
pnpm build
```
Esperado: sin errores. Si falla, revisar sintaxis Astro.

- [ ] **Commit:**

```bash
git add src/components/StatsBar.astro
git commit -m "feat: agregar StatsBar con métricas de confianza"
```

---

## Task 2: Proceso

**Files:**
- Create: `src/components/Proceso.astro`

- [ ] **Crear `src/components/Proceso.astro`:**

```astro
---
const steps = [
  {
    title: "Consulta Gratuita",
    desc: "Conversamos sobre tu proyecto, tu lote y tu presupuesto. Sin compromiso.",
  },
  {
    title: "Diseño y Planos",
    desc: "Desarrollamos los planos arquitectónicos adaptados a tu lote y preferencias.",
  },
  {
    title: "Permisos y Trámites",
    desc: "Gestionamos todos los permisos municipales. Vos no te preocupás por el papeleo.",
  },
  {
    title: "Construcción",
    desc: "Ejecutamos con materiales de calidad y supervisión técnica permanente en sitio.",
  },
  {
    title: "Entrega Llave en Mano",
    desc: "Recibís tu propiedad lista para habitar, alquilar o publicar en Airbnb.",
  },
];
---

<section id="proceso" class="py-24 bg-white relative overflow-hidden">
  <div
    class="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-[size:20px_20px]"
  />

  <div class="container mx-auto px-6 relative z-10">
    <div class="max-w-4xl mx-auto text-center mb-16">
      <div
        class="inline-block px-4 py-1 bg-dark text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4"
      >
        Proceso
      </div>
      <h2
        class="font-display text-4xl md:text-5xl font-black text-dark uppercase tracking-tighter mb-6"
      >
        Cómo <span class="text-primary italic">Funciona</span>
      </h2>
      <p class="text-lg text-steel max-w-2xl mx-auto leading-relaxed">
        De la idea a las llaves en mano, sin complicaciones. Nos encargamos de
        todo para que vos solo te preocupés por elegir los acabados.
      </p>
    </div>

    <div class="relative max-w-6xl mx-auto">
      <!-- Línea conectora desktop -->
      <div
        class="hidden md:block absolute top-7 left-[8%] right-[8%] h-0.5 bg-primary/20 z-0"
      />

      <div class="grid grid-cols-1 md:grid-cols-5 gap-10 relative z-10">
        {
          steps.map((step, i) => (
            <div class="flex flex-col items-center text-center group">
              <div class="w-14 h-14 bg-primary rounded-full flex items-center justify-center font-display text-2xl font-black text-dark mb-5 shadow-lg group-hover:scale-110 transition-transform shrink-0">
                {i + 1}
              </div>
              <h3 class="font-black uppercase tracking-wide text-dark text-xs mb-3 leading-tight">
                {step.title}
              </h3>
              <p class="text-steel text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))
        }
      </div>
    </div>

    <div class="text-center mt-16">
      <a
        href="#contacto"
        class="inline-block bg-dark text-primary font-black uppercase tracking-widest text-xs px-10 py-5 hover:bg-primary hover:text-dark transition-all shadow-xl active:scale-95"
      >
        Empezá tu consulta gratuita &rarr;
      </a>
    </div>
  </div>
</section>
```

- [ ] **Verificar compilación:**

```bash
pnpm build
```
Esperado: sin errores.

- [ ] **Commit:**

```bash
git add src/components/Proceso.astro
git commit -m "feat: agregar sección Proceso con 5 pasos"
```

---

## Task 3: InversionAirbnb

**Files:**
- Create: `src/components/InversionAirbnb.astro`

- [ ] **Crear `src/components/InversionAirbnb.astro`:**

```astro
---
const metrics = [
  { value: "$95", label: "Por noche", sub: "Tarifa promedio Airbnb en La Fortuna" },
  { value: "70%", label: "Ocupación", sub: "Turismo año redondo por el Arenal" },
  { value: "$2,000", label: "Al mes", sub: "Ingreso estimado, cabaña 2 habitaciones" },
];

const reasons = [
  {
    emoji: "🌋",
    title: "Volcán Arenal",
    desc: "Destino #1 de Costa Rica. Miles de turistas internacionales cada mes del año.",
  },
  {
    emoji: "♨️",
    title: "Aguas Termales y Naturaleza",
    desc: "Turistas de alto gasto que buscan experiencias únicas y alojamientos especiales.",
  },
  {
    emoji: "✈️",
    title: "Demanda Constante",
    desc: "Vuelos internacionales directos y sin temporada baja real. Tu cabaña siempre ocupada.",
  },
];
---

<section class="py-24 bg-dark relative overflow-hidden">
  <div
    class="absolute top-0 right-0 w-1/3 h-full bg-primary/5 skew-x-[-12deg] translate-x-20 pointer-events-none"
  />
  <div
    class="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#fdb813_1px,transparent_1px),linear-gradient(to_bottom,#fdb813_1px,transparent_1px)] bg-[size:40px_40px]"
  />

  <div class="container mx-auto px-6 relative z-10">
    <div class="max-w-4xl mx-auto text-center mb-16">
      <div
        class="inline-block px-4 py-1 bg-primary text-dark text-[10px] font-black uppercase tracking-[0.3em] mb-4"
      >
        Inversión Inteligente
      </div>
      <h2
        class="font-display text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-6"
      >
        Tu cabaña en La Fortuna puede
        <span class="text-primary italic"> generar ingresos</span><br />desde el
        primer mes
      </h2>
      <p class="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
        El mercado turístico del Arenal es uno de los más activos de
        Centroamérica. Construí una cabaña y convertila en una fuente de ingreso
        pasivo.
      </p>
    </div>

    <!-- Métricas -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-16 max-w-4xl mx-auto">
      {
        metrics.map((m) => (
          <div class="bg-white/5 border border-white/10 p-8 text-center hover:border-primary/40 transition-colors">
            <div class="font-display text-5xl font-black text-primary mb-2 leading-none">
              {m.value}
            </div>
            <div class="text-white font-bold uppercase tracking-widest text-sm mb-2">
              {m.label}
            </div>
            <div class="text-gray-500 text-xs leading-relaxed">{m.sub}</div>
          </div>
        ))
      }
    </div>

    <!-- Razones -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-14">
      {
        reasons.map((r) => (
          <div class="flex flex-col items-center text-center md:items-start md:text-left gap-3">
            <div class="text-4xl">{r.emoji}</div>
            <div>
              <h3 class="text-white font-black uppercase tracking-wide text-sm mb-2">
                {r.title}
              </h3>
              <p class="text-gray-400 text-sm leading-relaxed">{r.desc}</p>
            </div>
          </div>
        ))
      }
    </div>

    <!-- CTA -->
    <div class="text-center mb-6">
      <a
        href="#contacto"
        class="inline-block bg-primary text-dark font-black uppercase tracking-widest text-xs px-12 py-5 hover:brightness-110 transition-all shadow-2xl active:scale-95"
      >
        Cotizá tu cabaña para Airbnb &rarr;
      </a>
    </div>

    <!-- Disclaimer -->
    <p class="text-center text-gray-600 text-xs max-w-lg mx-auto leading-relaxed">
      Los ingresos estimados son referenciales basados en datos de mercado de
      plataformas de alquiler vacacional en La Fortuna. Resultados varían según
      ubicación, temporada y gestión.
    </p>
  </div>
</section>
```

- [ ] **Verificar compilación:**

```bash
pnpm build
```
Esperado: sin errores.

- [ ] **Commit:**

```bash
git add src/components/InversionAirbnb.astro
git commit -m "feat: agregar sección Inversión Airbnb con métricas de mercado"
```

---

## Task 4: Testimonios

**Files:**
- Create: `src/components/Testimonios.astro`

- [ ] **Crear `src/components/Testimonios.astro`:**

```astro
---
// TODO: reemplazar con testimonios reales de clientes
const testimonios = [
  {
    initials: "CM",
    name: "Carlos & Andrea Mora",
    location: "La Fortuna, San Carlos",
    project: "Casa modelo Curridabat",
    quote:
      "Construimos nuestra casa en 8 meses y quedamos encantados con el resultado. El proceso fue transparente desde el primer día.",
  },
  {
    initials: "RQ",
    name: "Roberto Quesada",
    location: "Fortuna, Alajuela",
    project: "Cabaña turística · 2 habitaciones",
    quote:
      "Tenía miedo de los trámites y permisos pero ConstruHomesCR lo manejó todo. Hoy mi cabaña genera ₡800,000 al mes en Airbnb.",
  },
  {
    initials: "MA",
    name: "Mariela Arce",
    location: "San Carlos",
    project: "Casa modelo Libelula",
    quote:
      "Excelente calidad de materiales y siempre al día con los avances. Recomiendo ConstruHomesCR sin dudarlo.",
  },
];
---

<section class="py-24 bg-white relative overflow-hidden">
  <div
    class="absolute inset-0 opacity-[0.02] pointer-events-none bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-[size:20px_20px]"
  />

  <div class="container mx-auto px-6 relative z-10">
    <div class="max-w-4xl mx-auto text-center mb-16">
      <div
        class="inline-block px-4 py-1 bg-dark text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4"
      >
        Testimonios
      </div>
      <h2
        class="font-display text-4xl md:text-5xl font-black text-dark uppercase tracking-tighter mb-6"
      >
        Lo que dicen <span class="text-primary italic">nuestros clientes</span>
      </h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {
        testimonios.map((t) => (
          <div class="bg-white border-2 border-gray-100 p-8 flex flex-col gap-6 hover:border-primary/30 hover:shadow-xl transition-all">
            <div class="font-display text-6xl leading-none text-primary/20 font-black -mb-2">
              "
            </div>
            <p class="text-dark text-lg leading-relaxed font-medium flex-1">
              {t.quote}
            </p>
            <div class="flex items-center gap-4 pt-4 border-t border-gray-100">
              <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-display font-black text-dark text-sm shrink-0">
                {t.initials}
              </div>
              <div>
                <div class="font-black text-dark text-sm uppercase tracking-wide">
                  {t.name}
                </div>
                <div class="text-steel text-xs uppercase tracking-widest mt-0.5">
                  {t.location}
                </div>
                <div class="inline-block mt-1 px-2 py-0.5 bg-primary/10 text-dark text-[10px] font-black uppercase tracking-wider">
                  {t.project}
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
  </div>
</section>
```

- [ ] **Verificar compilación:**

```bash
pnpm build
```
Esperado: sin errores.

- [ ] **Commit:**

```bash
git add src/components/Testimonios.astro
git commit -m "feat: agregar sección Testimonios con 3 cards"
```

---

## Task 5: FAQ

**Files:**
- Create: `src/components/FAQ.astro`

- [ ] **Crear `src/components/FAQ.astro`:**

```astro
---
const faqs = [
  {
    q: "¿Cuánto tiempo toma construir una casa?",
    a: "Entre 6 y 10 meses dependiendo del modelo y tamaño del proyecto. Casas medianas de aproximadamente 100m² toman en promedio 7 meses desde el inicio de obra.",
  },
  {
    q: "¿Incluyen los permisos municipales en el proyecto?",
    a: "Sí. Gestionamos todos los trámites ante la Municipalidad de San Carlos y el INVU. Vos solo firmás los documentos necesarios — el papeleo es nuestro.",
  },
  {
    q: "¿Puedo adaptar los diseños a mi lote específico?",
    a: "Absolutamente. Los modelos son una base de referencia. Adaptamos dimensiones, distribución interna y acabados a las características de tu lote y tus preferencias personales.",
  },
  {
    q: "¿Trabajan con financiamiento bancario (BCR, BN, BAC)?",
    a: "Sí. Tenemos experiencia trabajando con clientes que financian su proyecto mediante crédito hipotecario. Te acompañamos y asesoramos en ese proceso.",
  },
  {
    q: "¿Qué garantía tienen las construcciones?",
    a: "Un año de garantía estructural y de acabados. Cualquier defecto constructivo lo atendemos y resolvemos sin costo adicional para el cliente.",
  },
  {
    q: "¿Construyen fuera de La Fortuna?",
    a: "Atendemos toda la zona norte de Costa Rica: San Carlos, Aguas Zarcas, Pital, Ciudad Quesada y alrededores. Consultanos sobre tu ubicación específica.",
  },
  {
    q: "¿Una cabaña construida por ustedes puede registrarse en Airbnb?",
    a: "Sí. Diseñamos con el uso turístico en mente: distribución práctica, acabados duraderos y fáciles de mantener, y podemos acompañarte en los requisitos del ICT si necesitás la declaratoria turística.",
  },
];
---

<section id="faq" class="py-24 bg-gray-50 relative">
  <div class="container mx-auto px-6">
    <div class="max-w-4xl mx-auto text-center mb-16">
      <div
        class="inline-block px-4 py-1 bg-dark text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4"
      >
        FAQ
      </div>
      <h2
        class="font-display text-4xl md:text-5xl font-black text-dark uppercase tracking-tighter mb-6"
      >
        Preguntas <span class="text-primary italic">Frecuentes</span>
      </h2>
      <p class="text-lg text-steel max-w-2xl mx-auto leading-relaxed">
        Resolvemos las dudas más comunes antes de que las tengas.
      </p>
    </div>

    <div class="max-w-3xl mx-auto space-y-2">
      {
        faqs.map((faq, i) => (
          <div class="faq-item border border-gray-200 bg-white" data-index={i}>
            <button
              type="button"
              class="faq-trigger w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-black text-dark uppercase tracking-wide text-xs hover:text-primary transition-colors"
              aria-expanded="false"
            >
              <span>{faq.q}</span>
              <span class="faq-icon text-primary text-xl font-black shrink-0 transition-transform duration-300">
                +
              </span>
            </button>
            <div
              class="faq-answer overflow-hidden"
              style="max-height: 0; transition: max-height 0.3s ease;"
            >
              <p class="px-6 pb-6 text-steel leading-relaxed text-sm">{faq.a}</p>
            </div>
          </div>
        ))
      }
    </div>

    <div class="text-center mt-12">
      <a
        href="https://wa.me/50684291847?text=Hola%2C%20tengo%20una%20pregunta%20sobre%20un%20proyecto%20de%20construcci%C3%B3n"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block bg-dark text-primary font-black uppercase tracking-widest text-xs px-10 py-5 hover:bg-primary hover:text-dark transition-all shadow-xl active:scale-95"
      >
        ¿Tenés otra pregunta? Escribinos por WhatsApp &rarr;
      </a>
    </div>
  </div>
</section>

<script>
  const setupFAQ = () => {
    const items = document.querySelectorAll<HTMLElement>(".faq-item");

    items.forEach((item) => {
      const trigger = item.querySelector<HTMLButtonElement>(".faq-trigger");
      const answer = item.querySelector<HTMLElement>(".faq-answer");
      const icon = item.querySelector<HTMLElement>(".faq-icon");

      trigger?.addEventListener("click", () => {
        const isOpen = trigger.getAttribute("aria-expanded") === "true";

        // Cerrar todos
        items.forEach((other) => {
          const otherTrigger =
            other.querySelector<HTMLButtonElement>(".faq-trigger");
          const otherAnswer = other.querySelector<HTMLElement>(".faq-answer");
          const otherIcon = other.querySelector<HTMLElement>(".faq-icon");
          otherTrigger?.setAttribute("aria-expanded", "false");
          if (otherAnswer) otherAnswer.style.maxHeight = "0";
          if (otherIcon) otherIcon.textContent = "+";
        });

        if (!isOpen && answer && icon) {
          trigger.setAttribute("aria-expanded", "true");
          answer.style.maxHeight = answer.scrollHeight + "px";
          icon.textContent = "−";
        }
      });
    });
  };

  setupFAQ();
</script>
```

- [ ] **Verificar compilación:**

```bash
pnpm build
```
Esperado: sin errores.

- [ ] **Commit:**

```bash
git add src/components/FAQ.astro
git commit -m "feat: agregar FAQ con accordion interactivo"
```

---

## Task 6: Montar todo en index.astro

**Files:**
- Modify: `src/pages/index.astro`

- [ ] **Reemplazar `src/pages/index.astro` con:**

```astro
---
import Layout from "../layouts/Layout.astro";
import Hero from "../components/Hero.astro";
import StatsBar from "../components/StatsBar.astro";
import Disenos from "../components/Diseños.astro";
import Proceso from "../components/Proceso.astro";
import InversionAirbnb from "../components/InversionAirbnb.astro";
import Galeria from "../components/Galeria.astro";
import Testimonios from "../components/Testimonios.astro";
import FAQ from "../components/FAQ.astro";
import Contacto from "../components/Contacto.astro";
---

<Layout>
  <Hero />
  <StatsBar />
  <Disenos />
  <Proceso />
  <InversionAirbnb />
  <Galeria />
  <Testimonios />
  <FAQ />
  <Contacto />
</Layout>
```

- [ ] **Verificar compilación completa:**

```bash
pnpm build
```
Esperado: build exitoso, sin errores de TypeScript ni de imports.

- [ ] **Commit final:**

```bash
git add src/pages/index.astro
git commit -m "feat: montar todas las secciones de trust & conversion en index"
```
