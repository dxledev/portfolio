import '../../css/Body.css';

import {
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../widgets/Dialog.tsx";

import { projects } from "../../data/ProjectData.ts";

const webProjects = projects.filter((project) => (
  project.action === "web"
));
const modalProjects = projects.filter((project) => (
  project.action === "modal"
))

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// function ProjectDialogProps = {
//
// }
//
function ProjectDialog() {

}

type ButtonType = "demo" | "code" | "download";

type ButtonProps = {
  type: ButtonType;
  link?: string;
  onClick?: () => void;
}

function Button({ type, link, onClick }: ButtonProps) {
  return (
    <div>

      {link ? (
        <div className={`Portfolio-project-button-${type}`}>
          <a
            href={link}
          >
            {capitalize(type)}
          </a>
        </div>
      ) : (
        <button 
          className={`Portfolio-project-button-${type}`}
          onClick={onClick}
        >
          {capitalize(type)}
        </button>
      )}

    </div>
  );
}

type instruction = {
  inst: string,
  cmd: string,
}

type ProjectProps =
  | {
      id: string;
      title: string;
      description: string;
      action: "web";
      github: string;
      url: string;
      image: string;
      tags: string[];
    }
  | {
      id: string;
      title: string;
      description: string;
      action: "modal";
      github: string;
      instructions: instruction[];
      image: string;
      tags: string[];
    };

// pass in a project
// if it's "web" then return a normal demo button
// if it's "model" then return a dialog button
function Project({ ...project }: ProjectProps) {
  return (
    <div 
      className='Portfolio-project'
    >
      <img
        src={project.image}
        className='Portfolio-project-image'
      />

      <div className='Portfolio-project-title'>{project.title}</div>
      <div className='Portfolio-project-desc'>{project.description}</div>
  
      <div className='flex flex-row gap-4'>
        <Button 
          type="code"
          link={project.github}
        />
        {project.action === "web" ? (
          <Button
            type="demo"
            link={project.url}
          />
        ) : (
          <Button
            type="download"
            onClick={ProjectDialog}
          />
        )}
      </div>
    </div>
  );
}

function Portfolio() {
  return (
    <div className='Portfolio' id='portfolio'>
      <h1 className='Portfolio-header'>
        What I've Made
      </h1>

      <div className='Portfolio-grid'>
        {modalProjects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
        {webProjects.map((project) => (
          <Project key={project.id} {...project} />
        ))}
      </div>
    </div>
  );
}

export default Portfolio;

