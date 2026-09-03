import '../../css/Nav.css';

import EmailDialog from './EmailDialog.tsx';
import { useState } from 'react';

function Nav() {
  const email = "ddparmstrong2021@gmail.com";
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <div className='Nav'>
      <a className='link' href="#about">
        About
      </a>

      <a className='link' href="#skills">
        Skills
      </a>

      <a className='link' href="#portfolio">
        Portfolio
      </a>

      <button 
        className='link'
        onClick={() => setDialogOpen(true)}
      >
        Contact Me
      </button>
      <EmailDialog email={email} open={dialogOpen} onOpenChange={setDialogOpen} />
    </div>
  );
}

export default Nav;
