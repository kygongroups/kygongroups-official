import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import nodemailer from "nodemailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateContactPayload(body) {
  const errors = {};
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const subject = typeof body?.subject === "string" ? body.subject.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (name.length < 2 || name.length > 120) {
    errors.name = "Please enter your full name (2–120 characters).";
  }
  if (!EMAIL_RE.test(email) || email.length > 180) {
    errors.email = "Please enter a valid email address.";
  }
  if (subject.length < 2 || subject.length > 160) {
    errors.subject = "Please select a subject.";
  }
  if (message.length < 10 || message.length > 4000) {
    errors.message = "Please enter a message (at least 10 characters).";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
    data: { name, email, subject, message },
  };
}

async function saveSubmission(entry) {
  const dataDir = path.resolve(process.cwd(), "server");
  const filePath = path.join(dataDir, "submissions.json");
  await fs.promises.mkdir(dataDir, { recursive: true });

  let existing = [];
  try {
    const raw = await fs.promises.readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) existing = parsed;
  } catch {
    existing = [];
  }

  existing.push(entry);
  await fs.promises.writeFile(filePath, JSON.stringify(existing, null, 2), "utf-8");
}

async function dispatchEmail(entry) {
  const smtpHost = process.env.SMTP_HOST?.trim();
  const smtpUser = process.env.SMTP_USER?.trim();
  const smtpPass = process.env.SMTP_PASS?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || "contact@kygongroups.com";

  if (smtpHost && smtpUser && smtpPass) {
    const port = Number(process.env.SMTP_PORT || 587);
    const secure = process.env.SMTP_SECURE === "true" || port === 465;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port,
      secure,
      auth: { user: smtpUser, pass: smtpPass },
    });

    await transporter.sendMail({
      from: process.env.SMTP_FROM?.trim() || `"Kygon Groups Website" <${smtpUser}>`,
      to: toEmail,
      replyTo: entry.email,
      subject: `[Kygon Contact] ${entry.subject} — ${entry.name}`,
      text: [
        `Reference ID: ${entry.id}`,
        `Submitted: ${entry.createdAt}`,
        `Name: ${entry.name}`,
        `Email: ${entry.email}`,
        `Subject: ${entry.subject}`,
        "",
        "Message:",
        entry.message,
      ].join("\n"),
    });

    return { delivered: true, transport: "smtp" };
  }

  const web3Key = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (web3Key) {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: web3Key,
        name: entry.name,
        email: entry.email,
        subject: `[Kygon Contact] ${entry.subject}`,
        message: entry.message,
      }),
    });
    const result = await response.json();
    if (!response.ok || !result.success) {
      throw new Error(result.message || "Web3Forms delivery failed.");
    }
    return { delivered: true, transport: "web3forms" };
  }

  return { delivered: false, transport: "local-store" };
}

export async function processContactRequest(payload) {
  const validation = validateContactPayload(payload);
  if (!validation.valid) {
    return {
      status: 400,
      body: {
        ok: false,
        error: "Please check the highlighted fields and try again.",
        errors: validation.errors,
      },
    };
  }

  const entry = {
    id: `KYG-${crypto.randomBytes(3).toString("hex").toUpperCase()}`,
    createdAt: new Date().toISOString(),
    ...validation.data,
  };

  await saveSubmission(entry);

  let delivery = { delivered: false, transport: "local-store" };
  let deliveryWarning = null;

  try {
    delivery = await dispatchEmail(entry);
  } catch (err) {
    deliveryWarning =
      err instanceof Error ? err.message : "Email relay failed; inquiry was saved locally.";
  }

  return {
    status: 201,
    body: {
      ok: true,
      id: entry.id,
      emailDelivered: delivery.delivered,
      transport: delivery.transport,
      warning: deliveryWarning,
      message: delivery.delivered
        ? "Thank you! Your message has been sent to the Kygon Groups team."
        : "Your inquiry has been recorded by our backend. We will respond within 24 hours.",
    },
  };
}

