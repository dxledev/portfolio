"use client";

import '../../css/EmailDialog.css';

import { useCopyToClipboard } from '../../helpers/useCopyToClipboard.tsx';
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
  ControlledDialog,
} from "./Dialog.tsx";
import CopiedAlert from "../widgets/CopiedAlert.tsx";

import { useState } from 'react';
import { IoIosSend } from "react-icons/io";

type EmailDialogProps= {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
}

function EmailDialog({ open, onOpenChange, email }: EmailDialogProps) {
  const [copyToClipboard] = useCopyToClipboard();
  const [showAlert, setShowAlert] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setShowAlert(false);
    }

    onOpenChange(nextOpen);
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

        <div className='text-xl text-text text-center pb-3'>
          Reach out to me at <span className='underline hover:text-secondary cursor-pointer'
            onClick={() => {
              setShowAlert(true);
              copyToClipboard(email)
            }}
          >
            {email} 
          </span> or through the form below:
        </div>
        {showAlert && (
          <CopiedAlert 
            item="Email" 
            onDismiss={() => setShowAlert(false)}
          />
        )}

        <DialogDescription className="Email-dialog-description">
          <form className='Email-dialog-form gap-4.5!'>
            <div className='Email-dialog-form'>
              <input placeholder='Your email' className='Email-dialog-email'/>
              <textarea placeholder='Your message' className='Email-dialog-message'/>
            </div>

            <button 
              type='submit'
              className='rounded-xl text-background bg-text py-1 px-4 hover:bg-text/85 cursor-pointer drop-shadow-md 
                        drop-shadow-text/75 flex flex-row gap-2 items-center justify-center'
            >
              <IoIosSend />
              Submit
            </button>
          </form>
        </DialogDescription>
      </DialogHeader>
    </ControlledDialog>
  );
}

export default EmailDialog;
