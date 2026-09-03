import '../../css/Footer.css';

function Footer() {
  return (
    <div className='Footer'>
      <div className='flex flex-col justify-center items-center'>
        <h1 className='font-semibold'>About This Site</h1>
        <div>Front End - React, Tailwind, shadcn/ui lib</div>
        <div>Back End - Supabase</div>
      </div>
      <div>x Unique Visitors</div>
    </div>
  );
}

export default Footer;

