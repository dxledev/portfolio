import '../../css/Icon.css';
import '../../css/themes.css';

import type { ReactNode } from 'react';

type IconProps = {
  link: string,
  icon: ReactNode,
  alt: string,
}

function Icon({ link, icon, alt }: IconProps) {
  return (
    <a 
      href={link}
      aria-label={alt}
      className="Icon"
    >
      {icon}
    </a>
  );
}

export default Icon;
