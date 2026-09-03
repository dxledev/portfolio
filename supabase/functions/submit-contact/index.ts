// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

import type { Database } from "../_shared/database.types.ts";
import { sendContactEmail } from "./send-contact-email.ts";
import { verifyTurnstileToken } from "./verify-turnstile.ts";

const limits = {
  emailLength: 254,
  messageLength: 5000,
  turnstileTokenLength: 2048,
};

type ContactSubmission = {
  senderEmail: string;
  message: string;
  turnstileToken: string;
};

type ValidationResult =
  | { valid: true; submission: ContactSubmission }
  | { valid: false; message: string };

function validateSubmission(body: unknown): ValidationResult {
  if (typeof body !== "object" || body === null) {
    return { valid: false, message: "Invalid request body" };
  }

  const record = body as Record<string, unknown>;

  if (
    typeof record.senderEmail !== "string" ||
    typeof record.message !== "string" ||
    typeof record.turnstileToken !== "string"
  ) {
    return { valid: false, message: "Email and message are required" };
  }

  const senderEmail = record.senderEmail.trim().toLowerCase();
  const message = record.message.trim();
  const turnstileToken = record.turnstileToken.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (
    senderEmail.length > limits.emailLength ||
    !emailPattern.test(senderEmail)
  ) {
    return { valid: false, message: "Invalid email address" };
  }

  if (
    turnstileToken.length === 0 ||
    turnstileToken.length > limits.turnstileTokenLength
  ) {
    return { valid: false, message: "Invalid verification token" };
  }

  if (message.length === 0 || message.length > limits.messageLength) {
    return { valid: false, message: "Invalid message length" };
  }

  return {
    valid: true,
    submission: { senderEmail, message, turnstileToken },
  };
}

export default {
  fetch: withSupabase<Database>({ auth: "publishable" }, async (request, context) => {
    if (request.method !== "POST") {
      return Response.json(
        { message: "Method not allowed" },
        {
          status: 405, 
          headers: { Allow: "POST" },
        },
      );
    }

    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return Response.json(
        { message: "Invalid JSON" },
        { status: 400 },
      );
    }

    const validation = validateSubmission(body);

    if (!validation.valid) {
      return Response.json(
        { message: validation.message },
        { status: 400 },
      );
    }

    let turnstileValid: boolean;

    try {
      turnstileValid = await verifyTurnstileToken(
        validation.submission.turnstileToken,
      );
    } catch (error) {
      console.error("Turnstile verification unavailable:", error);

      return Response.json(
        { message: "Verification unavailable." },
        { status: 503 },
      );
    }

    if (!turnstileValid) {
      return Response.json(
        { message: "Verification failed." },
        { status: 403 },
      );
    }

    const { data: contactMessage, error } = await context.supabaseAdmin
      .from("contact_messages")
      .insert({
        sender_email: validation.submission.senderEmail,
        message: validation.submission.message,
      })
      .select("id, sender_email, message, created_at")
      .single();

    if (error) {
      console.error("Contact submission failed:", error);

      return Response.json(
        { message: "Unable to submit message." },
        { status: 500 },
      );
    }

    let notificationSent = true;

    try {
      await sendContactEmail(contactMessage);
    } catch (error) {
      notificationSent = false;
      console.error("Contact email failed:", error);
    }

    return Response.json(
      { success: true,
        notificationSent,
      },
      { status: 201 }
    );
  },
),
};
