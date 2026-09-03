import '../../css/CopiedAlert.css';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { CircleCheckIcon } from 'lucide-react';
import {
  Alert, 
  AlertDescription,
  AlertTitle, 
} from "../widgets/Alert.tsx";

type CopiedAlertProps = {
  item: string;
  onDismiss: () => void;
  durationMs?: number;
}

const exitAnimationDurationMs = 200;

function CopiedAlert({
  item,
  onDismiss,
  durationMs = 2000,
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
      <AlertTitle className='text-lg'>Clipboard</AlertTitle>
      <AlertDescription className="text-secondary">
        {item} copied successfully!
      </AlertDescription>
    </Alert>,
    document.body,
  );
}

export default CopiedAlert;
