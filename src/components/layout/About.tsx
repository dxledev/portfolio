import '../../css/Body.css';

function About() {
  return (
    <div className='About'>
      <div className='flex flex-col items-start gap-2 w-[70%]'>
        <div className='text-4xl'>
          About Me
        </div>
        <div>
          My Background
        </div>
      </div>

      <div className='flex flex-col items-start w-[70%]'>
        <div>
          Hi there, visitor! I'm Dale, a passionate problem-solver who likes to express that 
          through coding and development. 
        </div>
      </div>
    </div>
  );
}

export default About;
