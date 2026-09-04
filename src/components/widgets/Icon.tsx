import '../../css/Icon.css';
import '../../css/themes.css';
import '../../index.css';

import type { ReactNode } from 'react';
import { Tooltip } from "@base-ui/react/tooltip";

type IconProps = {
  link?: string;
  onClick?: () => void;
  icon: ReactNode,
  alt: string,
  tooltipLabel: string,
}

function Icon({ link, onClick, icon, alt, tooltipLabel }: IconProps) {
  const trigger = link !== undefined ? (
    <Tooltip.Trigger
    render={
      <a
        href={link}
        aria-label={alt}
        className="Icon"
      >
        {icon}
      </a>
    } 
    />
  ) : (
    <Tooltip.Trigger
      type="button"
      onClick={onClick}
      aria-label={alt}
      className="Icon"
    >
      {icon}
    </Tooltip.Trigger>
  )

  return (
    <Tooltip.Provider delay={300} closeDelay={100}>
      <Tooltip.Root>
        {trigger}

        <Tooltip.Portal>
          <Tooltip.Positioner sideOffset={8} className="z-50">
            <Tooltip.Popup className="Tooltip">
              {tooltipLabel}
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

export default Icon;
