import { Tooltip } from "@base-ui/react/tooltip";
import { CheckIcon, CopyIcon } from "lucide-react";

import { useCopyToClipboard } from "../../helpers/useCopyToClipboard.tsx";
import { Button } from "./Button.tsx";

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
            <Tooltip.Popup className="rounded-md border border-border bg-popover px-2 py-1 text-xs font-medium text-popover-foreground shadow-md transition-[transform,opacity] duration-150 data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0">
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
