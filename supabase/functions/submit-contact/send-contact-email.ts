import "@supabase/functions-js/edge-runtime.d.ts"

type ContactMessage = {
  id: number,
  sender_email: string;
  message: string;
  created_at: string;
};

function getRequiredEnvironmentVariable(name: string) {
  const value = Deno.env.get(name);

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export async function sendContactEmail(
  contactMessage: ContactMessage,
) {
  const apiKey = 
    getRequiredEnvironmentVariable("RESEND_API_KEY");
  const recipient =
    getRequiredEnvironmentVariable("CONTACT_EMAIL_TO");
  const sender = 
    getRequiredEnvironmentVariable("CONTACT_EMAIL_FROM");

  const response = await fetch(
    "https://api.resend.com/emails",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "User-Agent": "dxle-portfolio/1.0",
        "Idempotency-Key": `contact-message/${contactMessage.id}`,
      },
      body: JSON.stringify({
        from: sender,
        to: [recipient],
        reply_to: contactMessage.sender_email,
        subject: "New portfolio contact message",
        text: [
          `From: ${contactMessage.sender_email}`,
          `Received: ${contactMessage.created_at}`,
          "",
          contactMessage.message,
        ].join("\n"),
      }),
    },
  );
  
  if (!response.ok) {
    const responseBody = await response.text();

    throw new Error(
      `Resend failed (${response.status}): ${responseBody}`,
    );
  }

}
