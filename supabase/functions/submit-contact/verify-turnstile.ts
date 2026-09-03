type TurnstileResult = {
  success: boolean;
  action?: string;
  "error-codes"?: string[];
}

export async function verifyTurnstileToken(
  token: string,
): Promise<boolean> {
  const secretKey = Deno.env.get("TURNSTILE_SECRET_KEY");

  if (!secretKey) {
    throw new Error("Missing TURNSTILE_SECRET_KEY");
  }

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
      signal: AbortSignal.timeout(10_000),
    },
  );

  if (!response.ok) {
    throw new Error(`Turnstile returned ${response.status}`);
  }

  const result = await response.json() as TurnstileResult;

  return result.success && result.action === "contact";
}
