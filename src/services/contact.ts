import { supabase } from "../lib/supabase.ts";

type ContactSubmission = {
  senderEmail: string;
  message: string;
  turnstileToken: string;
};

export async function submitContact(
  submission: ContactSubmission,
) {
  const { data, error } = await supabase.functions.invoke(
    "submit-contact",
    {
      body: submission,
    },
  );

  if (error) {
    throw error;
  }

  return data;
}


