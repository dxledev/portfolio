import '../../css/Body.css';

import { FaCode } from "react-icons/fa6";
import { MdDownload } from "react-icons/md";
import { CiShare1 } from "react-icons/ci";

import {
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../widgets/Dialog.tsx";

import { projects } from "../../data/ProjectData.ts";

import { useInView } from '../../helpers/UseInView.tsx';
import { CopyButton } from '../widgets/CopyButton.tsx';

const webProjects = projects.filter((project) => (
  project.action === "web"
));
const modalProjects = projects.filter((project) => (
  project.action === "modal"
))

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

type iType = "single" | "multi";

type CommandFieldProps = {
  cmd: string;
  inputType: iType;
};

function CommandField({ cmd, inputType }: CommandFieldProps) {
  return (
    <div className='Portfolio-project-dialog-command-field-wrapper'>
      {inputType === "multi" ? (
        <textarea
          value={cmd}
          readOnly
          spellCheck={false}
          aria-lanel="Installation command"
          className='Portfolio-project-dialog-command-field'
          onFocus={(event) => event.currentTarget.select()}
        />
      ) : (
        <input 
          type="text"
          value={cmd}
          readOnly
          spellCheck={false}
          aria-label="Installation command"
          className='Portfolio-project-dialog-command-field'
          onFocus={(event) => event.currentTarget.select()}
        />
      )}

      <CopyButton value={cmd} className="shrink-0" />
    </div>
  );
}

type instruction = {
  type?: iType,
  inst: string,
  cmd?: string,
}

type ProjectDialogProps = {
  instructions: instruction[];
  title: string;
  link?: string;
}

function ProjectDialog({ instructions, title, link }: ProjectDialogProps) {
  return (
    <Dialog>
      <DialogTrigger render={<Button type="download" />} />
      <DialogContent showCloseButton={false} className="lg:max-w-4xl">
        <DialogHeader>
          <DialogTitle className='text-2xl'>Download {title}</DialogTitle>
          <DialogDescription className='text-text text-xl flex flex-col gap-3'>
            {instructions.map((instruction, index) => (
              <div key={index} className='flex flex-col gap-1'>
                {instruction.inst}

                {(instruction.cmd !== undefined && instruction.type !== undefined) && (
                  <div>
                    <CommandField 
                      inputType={instruction.type}
                      cmd={instruction.cmd}
                    />
                  </div>
                )}
              </div>
              
            ))}
            {link !== undefined && (
              <div className='text-xl flex flex-row gap-2'>
                <div>
                  Full documentation at
                </div>
                <a href={link} className='text-secondary underline decoration-2 decoration-secondary
                    hover:decoration-primary hover:text-primary'>
                  {link}.
                </a>
              </div>
            )}
            
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

function Tag({ name }: { name: string }) {
  return (
    <div className='Portfolio-project-tag'>
      {name}
    </div>
  );
}

type ButtonType = "view" | "code" | "download";

type ButtonProps = {
  type: ButtonType;
  link?: string;
  onClick?: () => void;
}

function Button({ type, link, onClick }: ButtonProps) {
  let icon;

  switch (type) {
    case "view":
      icon = <CiShare1 className='scale-110' />;
      break;

    case "download":
      icon = <MdDownload className='scale-105' />;
      break;

    case "code":
      icon = <FaCode className='scale-110' />;
      break;
  }

  return (
    <div>

      {link ? (
        <div className={`Portfolio-project-button-${type}`}>
          <a
            href={link}
            className='flex flex-row items-center justify-center gap-2.5'
            target="_blank"
            rel="noopener reference"
          >
            {icon}
            {capitalize(type)}
          </a>
        </div>
      ) : (
        <button 
          className={`Portfolio-project-button-${type}
            flex flex-row items-center justify-center gap-2`}
          onClick={onClick}
        >
          {icon}
          {capitalize(type)}
        </button>
      )}

    </div>
  );
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
// if it's "web" then return a normal view button
// if it's "model" then return a dialog button
function Project({ ...project }: ProjectProps) {
  return (
    <div 
      className='Portfolio-project'
    >
      <div className='Portfolio-project-image-wrapper'>
        <img
          src={project.image}
          className='Portfolio-project-image'
        />
      </div>

      <div className='Portfolio-project-title'>{project.title}</div>
      <div className='Portfolio-project-desc'>{project.description}</div>

      <div className='flex flex-row flex-wrap justify-center items-center gap-x-3 gap-y-2 w-[75%]'>
        {project.tags.map((tag) => (
          <Tag name={tag} />
        ))}
      </div>
  
      <div className='flex flex-row gap-4'>
        <Button 
          type="code"
          link={project.github}
        />
        {project.action === "web" ? (
          <Button
            type="view"
            link={project.url}
          />
        ) : (
          <ProjectDialog 
              instructions={project.instructions} 
              title={project.title}
              link={project.github}
          />
        )}
      </div>
    </div>
  );
}

function Portfolio() {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <div className='Portfolio' id='portfolio'>
      <h1 className='Portfolio-header'>
        What I've Made
      </h1>

      <div 
        ref={ref}
        className={`Portfolio-grid ${isVisible ? "animate-fade-up-no-delay" : "opacity-0"}`}
      >
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

