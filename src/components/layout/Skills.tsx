import '../../css/Body.css';

import { useInView } from '../../helpers/UseInView.tsx';

import type { ReactNode } from 'react';

import { languages, frameworks, tools } from '../../data/SkillsData.tsx';

type Skill = {
  label: string,
  id: string,
  icon: ReactNode,
};

type SkillRow = {
  id: string,
  row: Skill[],
};

type SectionProps = {
  title: string, 
  group: SkillRow[],
}

function Section({ title, group }: SectionProps) {
  return (
    <div className={`Skills-section`}>
      
      {group.map((row) => (
        <div key={row.id} className='Skills-section-row' id={row.id}>

          {row.row.map((skill) => (
            <div key={row.id} className='Skills-section-skill' id={skill.id}>
              <div className='Skills-section-skill-icon'>
                {skill.icon}
              </div>

              <div className='Skills-section-skill-label'>
                {skill.label}
              </div>
            </div>
          ))}

        </div>
      ))}

    <h1 className='Skills-section-title'>{title}</h1>
    </div>
  );
}

function Skills() {
  const { ref, isVisible } = useInView<HTMLDivElement>();

   return (
    <div className='Skills' id='skills'>
      <h1 className='Skills-header'>
        What I've Used
      </h1>

      <div
        ref={ref}
        className={`Skills-grid ${isVisible 
                                ? "animate-fade-up-no-delay"
                                : "opacity-0"}`}
      >
        <Section title="Languages" group={languages} />
        <Section title="Frameworks & Libraries" group={frameworks} />
        <Section title="Tools & Databases" group={tools} />
      </div>
    </div>
  );
}

export default Skills;

