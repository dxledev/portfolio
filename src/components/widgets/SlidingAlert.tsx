import '../../css/CopiedAlert.css';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CircleCheckIcon } from 'lucide-react';
import {
  Alert, 
  AlertDescription,
  AlertTitle, 
} from "./Alert.tsx";

type CopiedAlertProps = {
  title: string;
  body: string;
  onDismiss: () => void;
  durationMs?: number;
}

const exitAnimationDurationMs = 200;

function CopiedAlert({
  title,
  body,
  onDismiss,
  durationMs = 3000,
}: CopiedAlertProps) {
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const visibleDurationMs = Math.max(
      durationMs - exitAnimationDurationMs,
      0,
    );
    const exitTimer = window.setTimeout(
      () => setIsClosing(true),
      visibleDurationMs,
    );
    const dismissTimer = window.setTimeout(onDismiss, durationMs);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(dismissTimer);
    };
  }, [durationMs, onDismiss]);

  return createPortal(
    <Alert
      className="Copied-alert fixed top-4 right-4 z-50 w-[min(24rem,calc(100vw-2rem))] shadow-lg"
      data-closing={isClosing || undefined}
    >
      <CircleCheckIcon />
      <AlertTitle className='text-xl text-secondary font-semibold'>{title}</AlertTitle>
      <AlertDescription className="text-text text-[16px]">
        {body}
      </AlertDescription>
    </Alert>,
    document.body,
  );
}

export default CopiedAlert;
