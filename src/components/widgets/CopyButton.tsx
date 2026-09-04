import { Tooltip } from "@base-ui/react/tooltip";
import { CheckIcon, CopyIcon } from "lucide-react";

import { useCopyToClipboard } from "../../helpers/useCopyToClipboard.tsx";
import { Button } from "./Button.tsx";

import "../../index.css";

type CopyButtonProps = {
  value: string;
  className?: string;
};

function CopyButton({ value, className }: CopyButtonProps) {
  const [copyToClipboard, isCopied] = useCopyToClipboard();
  const label = isCopied ? "Copied" : "Copy to clipboard";

  return (
    <Tooltip.Provider delay={300} closeDelay={100}>
      <Tooltip.Root>
        <Tooltip.Trigger
          render={
            <Button
              type="button"
              size="icon"
              variant="outline"
              className={className}
              aria-label={label}
              onClick={() => copyToClipboard(value)}
            >
              {isCopied ? (
                <CheckIcon aria-hidden="true" />
              ) : (
                <CopyIcon aria-hidden="true" />
              )}
            </Button>
          }
        />
        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={8} className="z-50">
            <Tooltip.Popup className="Tooltip">
              {label}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export { CopyButton };
export type { CopyButtonProps };
