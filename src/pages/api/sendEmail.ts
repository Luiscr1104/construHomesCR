import type { APIRoute } from "astro";
import { Resend } from "resend";
import fs from "node:fs/promises";
import path from "node:path";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const { email, name, phone, subject, message } = await request.json();

  const resend = new Resend(import.meta.env.RESEND_API_KEY);

  try {
    // Cargar HTML y reemplazar los placeholders
    const htmlPath = path.resolve("src/emails/ContactFormNotification.html");
    let html = await fs.readFile(htmlPath, "utf8");

    html = html
      .replace(/{{{fullName}}}/g, name)
      .replace(/{{{email}}}/g, email)
      .replace(/{{{phone}}}/g, phone)
      .replace(/{{{subject}}}/g, subject)
      .replace(/{{{message}}}/g, message);

    // Enviar email HTML
    await resend.emails.send({
      from: "ConstruHomesCR <no-reply@lafortunalaw.com>",
      to: ["luiscr1104@gmail.com"],
      subject: `Nuevo mensaje: ${subject}`,
      html,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: message }), { status: 500 });
  }
};
