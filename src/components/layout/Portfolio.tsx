import '../../css/Body.css';

import {
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../widgets/Dialog.tsx";

import type { ReactNode } from "react";

import { projects } from "../../data/ProjectData.ts";

// function ProjectDialogProps = {
//
// }
//
// function ProjectDialog({  })

type instruction = {
  line: string,
}

type ProjectProps =
  | {
      title: string;
      action: "web";
      github: string;
      url: string;
      image: string;
    }
  | {
      title: string;
      action: "modal";
      github: string;
      instructions: instruction[];
      image: string;
    };

function Project({ title, ...project }: ProjectProps) {

}

function Portfolio() {

  

  return (
    <div className='Portfolio'>
      <h1 className='Portfolio-header'>
        What I've Made
      </h1>

      <div className='Portfolio-grid'>
        
      </div>
    </div>
  );
}

export default Portfolio;

