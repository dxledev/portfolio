import { useEffect, useState } from 'react';
import '../../css/Body.css'
import SplashImage from '../../assets/splash.png';
import ProfilePicture from '../../assets/profile-picture.jpeg';

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
          <div className='text-xl lg:text-3xl'
          >
            HELLO, I'M
          </div>
          <div 
            className='text-6xl lg:text-8xl'
          >Dale Peligro.</div>
          <div className='text-3xl lg:text-5xl'>Software Engineer</div>
        </h1>
      </div>
    </div>
  );
}

function SplashInfo() {
  const name = "Dale Peligro.";
  const majorLine1 = "B.S. in Science";
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
        <div className='text-4xl font-bold'>
          {name}
        </div>
        <div className='text-xl flex flex-col items-center gap-0.5'>
          <div>{majorLine1}</div>
          <div>{majorLine2}</div>
          <div>{location}</div>
        </div>
      </div>

      <div className='flex flex-col gap-8 items-center justify-start'>
        <div className='flex flex-col gap-0.5 items-center'>
          <div className='text-xl'>
            {email}
          </div>
          <div className='text-xl'>
            {phoneNumber}
          </div>
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
