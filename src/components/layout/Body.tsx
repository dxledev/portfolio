import '../../css/Body.css';
import Splash from './Splash.tsx';
import About from './About.tsx';
import Skills from './Skills.tsx';
import Portfolio from './Portfolio.tsx';

function Body() {
  return (
    <div className='Body'>
      <Splash />
      <About />
      <Skills />
      <Portfolio />
    </div>
  );
}

export default Body;
