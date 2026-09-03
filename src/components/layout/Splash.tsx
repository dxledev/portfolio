import { useEffect, useState } from 'react';
import '../../css/Body.css'
import SplashImage from '../../assets/splash.png';
import ProfilePicture from '../../assets/profile-picture.jpeg';
import Icon from '../widgets/Icon.tsx';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoMdMail } from "react-icons/io";

import EmailDialog from "../widgets/EmailDialog.tsx";
import SlidingAlert from "../widgets/SlidingAlert.tsx";
import { useCopyToClipboard } from "../../helpers/useCopyToClipboard.tsx"

function SplashGreeting() {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const parallaxBreakpoint = window.matchMedia('(min-width: 64rem)');

    function handleScroll() {
      setScrollOffset(Math.min(window.scrollY * 0.45, 300));
    }

    function syncParallax() {
      window.removeEventListener('scroll', handleScroll);

      if (parallaxBreakpoint.matches) {
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true }); 
      } else {
        setScrollOffset(0);
      }
    }

    syncParallax();
    parallaxBreakpoint.addEventListener('change', syncParallax);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      parallaxBreakpoint.removeEventListener('change', syncParallax);
    };
  }, []);

  return (
    <div className='Splash-greeting'>
      <div 
        className='Splash-greeting-image'
        style={{ 
          backgroundImage: `url(${SplashImage})`,
          backgroundPosition: `center calc(50% + ${scrollOffset}px)`,
        }}
      >
        <h1 className='Splash-greeting-image-text'>
          <div className='text-lg lg:text-xl xl:text-3xl font-montserrat! tracking-[10px]'
          >
            HELLO, I'M
          </div>
          <div 
            className='text-5xl lg:text-7xl xl:text-9xl font-extrabold font-playfair'
          >Dale Peligro.</div>
          <div
            className='text-2xl lg:text-4xl xl:text-5xl italic 
                       font-extrabold font-cormorant tracking-wide'
          >
            Software Engineer.
          </div>
        </h1>
      </div>
    </div>
  );
}

function SplashInfo() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const [copyToClipboard] = useCopyToClipboard();

  const name = "Dale Peligro.";
  const majorLine1 = "B.S. in Science,";
  const majorLine2 = "Computer Science.";
  const location = "Covina, California";

  const email = "ddparmstrong2021@gmail.com";
  const phoneNumber = "+1 (626)-727-1414";

  return (
    <div className='Splash-info'>
      <div className='flex flex-col gap-4 items-center lg:justify-start'>
        <div className='Splash-info-profile-picture-wrapper'>
          <img
            src={ProfilePicture}
            alt="Profile"
            className='Splash-info-profile-picture'
          />
        </div>
        <div className='Splash-info-profile-name'>
          {name}
        </div>
        <div className='Splash-info-profile-major'>
          <div>{majorLine1}</div>
          <div>{majorLine2}</div>
          <div>{location}</div>
        </div>
      </div>

      <div className='flex flex-col gap-6 items-center justify-start pb-6'>
        <div className='Splash-info-profile-contact'>
          <div 
            onClick={() => {
              setShowAlert(true)
              copyToClipboard(email)
            }} 
            className='text-lg hover:underline hover:text-secondary cursor-pointer'>
            {email}
          </div>
          {showAlert && (
            <SlidingAlert
              title='Clipboard'
              body='Email copied!'
              onDismiss={() => setShowAlert(false)}
            />
          )}
          <div className='text-lg'>
            {phoneNumber}
          </div>
        </div>

        <div className='Splash-info-profile-links'>
          <Icon
            onClick={() => setDialogOpen(true)}
            icon={<IoMdMail className='size-8' />}
            alt='Email'
          />
          <EmailDialog
            open={dialogOpen}
            onOpenChange={setDialogOpen}
            email={email}
          />
          <Icon
            link='https://github.com/dxledev'
            icon={<FaGithub className='size-8' />}
            alt="GitHub"
          />
          <Icon 
            link='https://www.linkedin.com/in/dale-peligro-62762424a/'
            icon={<FaLinkedin className='size-8'/>}
            alt="LinkedIn"
          />
        </div>

        <div>
          <div className='Splash-info-button'>
            <a
              href="/Dale-Peligro-Resume.pdf"
              download="Dale-Peligro-Resume.pdf"
            >
              Download CV
            </a>
          </div>
          
        </div>
      </div>
    </div>
  );
}

function Splash() {
  return(
    <div className='Splash'>
      <SplashGreeting />
      <SplashInfo />
    </div>
  );
}

export default Splash;
