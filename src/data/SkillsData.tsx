import { FaHtml5, FaCss3Alt, FaPython, FaJava } from "react-icons/fa";
import { BiLogoTypescript, BiLogoCPlusPlus } from "react-icons/bi";

import { FaReact, FaNodeJs } from "react-icons/fa";
import { RiTailwindCssFill, RiNextjsLine, RiSupabaseFill } from "react-icons/ri";
import { SiQt } from "react-icons/si";
import { TbApiApp } from "react-icons/tb";

import { FaGitAlt, FaLinux, FaAws } from "react-icons/fa";
import { DiMongodb, DiPostgresql } from "react-icons/di";

const languages = [
  { 
    id: "lang-row-1",
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
    id: "lang-row-2",
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
    id: "fw-row-1",
    row: [
      {
        label: "React.js",
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
    id: "fw-row-2",
    row: [
      {
        label: "Node.js",
        id: "nodejs",
        icon: <FaNodeJs />,
      },
      {
        label: "Qt6",
        id: "qt6",
        icon: <SiQt />,
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
    id: "tools-row-1",
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
    id: "tools-row-2",
    row: [
      
      {
        label: "PostgreSQL",
        id: "postgresql",
        icon: <DiPostgresql />,
      },
      {
        label: "Supabase",
        id: "supabase",
        icon: <RiSupabaseFill />,
      },
      {
        label: "MongoDB",
        id: "mongodb",
        icon: <DiMongodb />,
      },
    ]
  }
]

export { languages, frameworks, tools };
