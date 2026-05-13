import type { APIRoute } from "astro";
import { Resend } from "resend";
import fs from "node:fs/promises";
import path from "node:path";

export const prerender = false;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { email, name, phone, subject, message, website } = body;

  // Honeypot: rechazar silenciosamente si viene lleno
  if (website) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  // Validación básica
  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return new Response(JSON.stringify({ error: "Campos requeridos incompletos" }), { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return new Response(JSON.stringify({ error: "Email inválido" }), { status: 400 });
  }

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  try {
    const htmlPath = path.resolve("src/emails/ContactFormNotification.html");
    let html = await fs.readFile(htmlPath, "utf8");

    const phoneDisplay = phone?.trim() || "No proporcionado";

    html = html
      .replace(/{{{fullName}}}/g, name.trim())
      .replace(/{{{email}}}/g, email.trim())
      .replace(/{{{phone}}}/g, phoneDisplay)
      .replace(/{{{subject}}}/g, subject.trim())
      .replace(/{{{message}}}/g, message.trim());

    await resend.emails.send({
      from: "ConstruHomesCR <no-reply@lafortunalaw.com>",
      to: ["luiscr1104@gmail.com"],
      subject: `Nuevo mensaje: ${subject.trim()}`,
      html,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ error: msg }), { status: 500 });
  }
};
