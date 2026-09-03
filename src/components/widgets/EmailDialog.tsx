"use client";

import '../../css/EmailDialog.css';

import { useCopyToClipboard } from '../../helpers/useCopyToClipboard.tsx';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ControlledDialog,
} from "./Dialog.tsx";
import SlidingAlert from "./SlidingAlert.tsx";

import { useState, useRef, type SubmitEvent as ReactSubmitEvent } from 'react';
import { submitContact } from "../../services/contact.ts";
import { IoIosSend } from "react-icons/io";
import { Loader2 } from "lucide-react";

import { Turnstile, type TurnstileInstance } from "@marsidev/react-turnstile";

type EmailDialogProps= {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
}

function EmailDialog({ open, onOpenChange, email }: EmailDialogProps) {
  const [copyToClipboard] = useCopyToClipboard();
  const [showCopiedAlert, setShowCopiedAlert] = useState(false);
  const [showSentAlert, setShowSentAlert] = useState(false);

  // turnstile
  const turnstileRef = useRef<TurnstileInstance | null>(null);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const turnstileSiteKey = import.meta.env.VITE_TURNSTILE_SITE_KEY;

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setShowCopiedAlert(false);
      setShowSentAlert(false);
      setSubmissionStatus("idle");
      setSubmissionMessage("");
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    }

    onOpenChange(nextOpen);
  }

  // Email Dialog Submission Handling
  type SubmissionStatus =
    | "idle"
    | "submitting"
    | "success"
    | "error";

  const [submissionStatus, setSubmissionStatus] = 
    useState<SubmissionStatus>("idle");
  const [, setSubmissionMessage] = useState("");

  async function handleSubmit(
    event: ReactSubmitEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const senderEmail = formData.get("senderEmail");
    const message = formData.get("message");

    if (
      typeof senderEmail !== "string" ||
      typeof message !== "string" ||
      !turnstileToken
    ) {
      setSubmissionStatus("error");
      setSubmissionMessage("Please complete the verification.");
      return;
    }

    // if passes continue
    setSubmissionStatus("submitting");
    setSubmissionMessage("");

    try {
      await submitContact({ senderEmail, message, turnstileToken });

      form.reset();
      setSubmissionStatus("success");
      setShowSentAlert(true);
    } catch (error) {
      setSubmissionStatus("error");
      setSubmissionMessage(
        error instanceof Error
          ? error.message
          : "Unable to send your message.",
      );
    } finally {
      setTurnstileToken(null);
      turnstileRef.current?.reset();
    }
  }

  return (
    <ControlledDialog 
      open={open} 
      onOpenChange={handleOpenChange}
      contentProps={{ className: "lg:max-w-xl", showCloseButton: false }}
    >
      <DialogHeader className='flex flex-col'>
        <DialogTitle className="Email-dialog-title">
          Contact Me
        </DialogTitle>

        <DialogDescription className="text-center text-text text-xl pb-2">
          Reach out to me at <span className='underline hover:text-secondary cursor-pointer'
            onClick={() => {
              setShowCopiedAlert(true);
              copyToClipboard(email)
            }}
          >
            {email} 
          </span> or through the form below:
          {showCopiedAlert && (
            <SlidingAlert 
              title='Clipboard'
              body='Email copied!'
              onDismiss={() => setShowCopiedAlert(false)}
            />
          )}
        </DialogDescription>

        <div className='Email-dialog-description'>
          <form 
            className='Email-dialog-form gap-4.5!'
            onSubmit={handleSubmit}
          >
            <div className='Email-dialog-form'>
              <input 
                name="senderEmail"
                type="email"
                required
                maxLength={254}
                placeholder='Your email' 
                className='Email-dialog-email'
                disabled={submissionStatus === "submitting" || !turnstileToken}
              />
              <textarea 
                name="message"
                required
                maxLength={5000}
                placeholder='Your message' 
                className='Email-dialog-message'
                disabled={submissionStatus === "submitting" || !turnstileToken}
              />
            </div>

            {/* Turnstile for user verification*/}
            <Turnstile
              ref={turnstileRef}
              siteKey={turnstileSiteKey}
              onSuccess={setTurnstileToken}
              onExpire={() => setTurnstileToken(null)}
              onError={() => setTurnstileToken(null)}
              options={{
                action: "contact",
                theme: "light",
                size: "flexible",
              }}
            />

            <button 
              type='submit'
              className='rounded-xl text-background bg-text py-1 px-4 hover:bg-text/85 cursor-pointer drop-shadow-md 
                        drop-shadow-text/75 flex flex-row gap-2 items-center justify-center'
              disabled={submissionStatus === "submitting" || !turnstileToken}
            >
              {submissionStatus === "submitting" 
                ? <Loader2 className='w-auto h-[75%] animate-spin text-primary font-bold' /> 
                : <IoIosSend />
              }
              {submissionStatus === "submitting" ? "Sending..." : "Submit"}
            </button>
          </form>
          {showSentAlert && (
            <SlidingAlert
              title='Contact'
              body='Message sent successfully! I will get in contact with you as soon as possible.'
              onDismiss={() => setShowSentAlert(false)}
              durationMs={5500}
            />
          )}
        </div>
      </DialogHeader>
    </ControlledDialog>
  );
}

export default EmailDialog;
