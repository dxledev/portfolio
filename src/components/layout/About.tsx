import '../../css/Body.css';
import { useInView } from '../../helpers/UseInView.tsx';

function About() {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  const body = 
    "Hi there, visitor! I'm Dale, an LA County-based software engineer focused on building reliable, " +
    "user-focused applications across the full stack. I specialize in both React.js for frontend development " + 
    "and C++ for backend development. My whole life I've loved to solve problems and puzzles " +
    "and I've been able to express that desire through coding and developing tangible projects. Currently, I'm learning and " +
    "building projects independently and working hard to find a permanent full-time position where I can showcase my " +
    "skills in assisting building and improving systems.";

  const body2 =
    "In my free time, I enjoy playing pool and the occasional guitar. I'm a die-hard Golden State Warriors fan and watching " +
    "and talking about the NBA is one of my lifelong passions. If not then I'm probably theming some minute detail on my Linux desktop. " +
    "I also like to socialize with people and I always love collaborating on something meaningful.";

  const body3 = "Let's get in touch!";

  return (
    <div className='About' id="about">
      <div className='About-title'>
        <div className='text-4xl font-extrabold italic'>
          About Me
        </div>
        <div className='font-bold'>
          My Background
        </div>
      </div>

      <div 
        ref={ref}
        className={`About-body ${isVisible ? "animate-fade-in-no-delay" : "opacity-0"}`}
      >
        <div>
          {body}
        </div>
        <div>
          {body2}
        </div>
        <div>
          {body3}
        </div>
      </div>
    </div>
  );
}

export default About;
