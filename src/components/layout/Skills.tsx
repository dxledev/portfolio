import '../../css/Body.css';

import type { ReactNode } from 'react';

import { FaHtml5, FaNode } from "react-icons/fa";
import { FaCss3Alt } from "react-icons/fa";
import { BiLogoTypescript } from "react-icons/bi";
import { BiLogoCPlusPlus } from "react-icons/bi";
import { FaPython } from "react-icons/fa";
import { FaJava } from "react-icons/fa";

import { FaReact } from "react-icons/fa";
import { RiTailwindCssFill } from "react-icons/ri";
import { RiNextjsLine } from "react-icons/ri";
import { FaNodeJs } from "react-icons/fa";
import { SiRaylib } from "react-icons/si";
import { TbApiApp } from "react-icons/tb";

import { FaGitAlt } from "react-icons/fa";
import { FaLinux } from "react-icons/fa";
import { FaAws } from "react-icons/fa";
import { DiMongodb } from "react-icons/di";
import { DiPostgresql } from "react-icons/di";

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
    <div className='Skills-section'>
      
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
  const languages = [
    { 
      id: "row1",
      row: [
        {
          label: "HTML",
          id: "html",
          icon: <FaHtml5 />,
        },
        {
          label: "CSS",
          id: "css",
          icon: <FaCss3Alt />,
        },
        {
          label: "JS/TS",
          id: "js",
          icon: <BiLogoTypescript />,
        }
      ],
    },
    {
      id: "row2",
      row: [
        {
          label: "C++",
          id: "c++",
          icon: <BiLogoCPlusPlus />,
        },
        {
          label: "Python",
          id: "python",
          icon: <FaPython />,
        },
        {
          label: "Java",
          id: "java",
          icon: <FaJava />
        },
      ],
    },
  ]

  const frameworks = [
    {
      id: "row1",
      row: [
        {
          label: "React",
          id: "react",
          icon: <FaReact />,
        },
        {
          label: "Tailwind",
          id: "tailwind",
          icon: <RiTailwindCssFill />,
        },
        {
          label: "Next.js",
          id: "nextjs",
          icon: <RiNextjsLine />,
        },
      ]
    },
    {
      id: "row2",
      row: [
        {
          label: "Node.js",
          id: "nodejs",
          icon: <FaNodeJs />,
        },
        {
          label: "Raylib",
          id: "raylib",
          icon: <SiRaylib />,
        },
        {
          label: "Javalin",
          id: "javalin",
          icon: <TbApiApp />,
        }
      ]
    }
  ]

  const tools = [
    {
      id: "row1",
      row: [
        {
          label: "Git",
          id: "git",
          icon: <FaGitAlt />,
        },
        {
          label: "Linux",
          id: "linux",
          icon: <FaLinux />,
        },
        {
          label: "AWS EC2",
          id: "awsec2",
          icon: <FaAws />,
        },
      ]
    },
    {
      id: "row2",
      row: [
        {
          label: "MongoDB",
          id: "mongodb",
          icon: <DiMongodb />,
        },
        {
          label: "PostgreSQL",
          id: "postgresql",
          icon: <DiPostgresql />,
        }
      ]
    }
  ]

  return (
    <div className='Skills' id='skills'>
      <h1 className='Skills-header'>
        My Development Stack
      </h1>

      <div className='Skills-grid'>
        <Section title="Languages" group={languages} />
        <Section title="Frameworks & Libraries" group={frameworks} />
        <Section title="Tools & Databases" group={tools} />
      </div>
    </div>
  );
}

export default Skills;

