import { Button as ButtonPrimitive } from "@base-ui/react/button";

import { cn } from "../../lib/utils.ts";

const buttonBaseClasses =
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4";

const buttonVariantClasses = {
  default:
    "bg-primary text-primary-foreground hover:bg-primary/80 aria-expanded:bg-primary/80",
  outline:
    "border-border bg-background text-foreground hover:bg-muted aria-expanded:bg-muted",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 aria-expanded:bg-secondary/80",
  ghost:
    "text-foreground hover:bg-muted aria-expanded:bg-muted",
  destructive:
    "bg-destructive/15 text-foreground hover:bg-destructive/25 focus-visible:border-destructive focus-visible:ring-destructive/30",
  link: "text-secondary underline-offset-4 hover:text-primary hover:underline",
} as const;

const buttonSizeClasses = {
  default:
    "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
  xs: "h-6 gap-1 rounded-md px-2 text-xs has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
  sm: "h-7 gap-1 rounded-md px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
  lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
  icon: "size-8",
  "icon-xs": "size-6 rounded-md [&_svg:not([class*='size-'])]:size-3",
  "icon-sm": "size-7 rounded-md",
  "icon-lg": "size-9",
} as const;

type ButtonVariant = keyof typeof buttonVariantClasses;
type ButtonSize = keyof typeof buttonSizeClasses;
type ButtonProps = ButtonPrimitive.Props & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

function getButtonClasses(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return cn(
    buttonBaseClasses,
    buttonVariantClasses[variant],
    buttonSizeClasses[size],
    className,
  );
}

function getButtonClassName(
  variant: ButtonVariant,
  size: ButtonSize,
  className: ButtonPrimitive.Props["className"],
) {
  if (typeof className === "function") {
    return (state: Parameters<typeof className>[0]) =>
      getButtonClasses(variant, size, className(state));
  }

  return getButtonClasses(variant, size, className);
}

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={getButtonClassName(variant, size, className)}
      {...props}
    />
  );
}

export { Button };
export type { ButtonProps, ButtonSize, ButtonVariant };
