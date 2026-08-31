import { useEffect, useState } from 'react';
import '../../css/Body.css'
import SplashImage from '../../assets/splash.png';
import ProfilePicture from '../../assets/profile-picture.jpeg';
import Icon from '../widgets/Icon.tsx';

import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { IoMdMail } from "react-icons/io";

function SplashGreeting() {
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    function handleScroll() {
      setScrollOffset(Math.min(window.scrollY * 0.45, 300));
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
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
          <div className='text-2xl lg:text-4xl font-montserrat!'
          >
            HELLO, I'M
          </div>
          <div 
            className='text-7xl lg:text-9xl font-extrabold font-playfair'
          >Dale Peligro.</div>
          <div 
            className='text-3xl lg:text-5xl italic font-bold font-cormorant'
          >
            Software Engineer.
          </div>
        </h1>
      </div>
    </div>
  );
}

function SplashInfo() {
  const name = "Dale Peligro.";
  const majorLine1 = "B.S. in Science,";
  const majorLine2 = "Computer Science.";
  const location = "Covina, California";

  const email = "ddparmstrong2021@gmail.com";
  const phoneNumber = "+1 (626)-727-1414";

  return (
    <div className='Splash-info'>
      <div className='flex flex-col gap-6 items-center justify-start'>
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

      <div className='flex flex-col gap-8 items-center justify-start pb-12'>
        <div className='Splash-info-profile-contact'>
          <div className='text-xl'>
            {email}
          </div>
          <div className='text-xl'>
            {phoneNumber}
          </div>
        </div>
        <div className='Splash-info-profile-links'>
          <Icon
            link=''
            icon={<IoMdMail className='size-8' />}
            alt='Email'
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
          <button className='Splash-info-button'>
            Download CV
          </button>
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
