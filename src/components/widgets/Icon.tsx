import '../../css/Icon.css';
import '../../css/themes.css';

import type { ReactNode } from 'react';

type IconProps = {
  link?: string,
  onClick?: () => void;
  icon: ReactNode,
  alt: string,
}

function Icon({ link, onClick, icon, alt }: IconProps) {
  return (
    <div className="Icon">
      {link !== undefined ? (
        <a 
          href={link}
          aria-label={alt}
        >
          {icon}
        </a>
      ) : (
        <button onClick={onClick} className='cursor-pointer'>
          {icon}
        </button>
      )}
    </div>
  );
}

export default Icon;
