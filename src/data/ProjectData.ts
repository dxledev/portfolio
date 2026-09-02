import netricImg from '../assets/portfolio/netric.png'
import wssImg from '../assets/portfolio/wss.png'
import hymissionImg from '../assets/portfolio/hymission.png'

const inst_hymission = [
  {
    inst: "Ensure you are running Hyprland on your system already!",
  },
  {
    type: "multi" as const,
    inst: "'hyprpm' is the preferred user-facing install path in the Hyprland ecosystem.",
    cmd: "hyprpm update\nhyprpm add https://github.com/dxledev/hymission\nhyprpm enable hymission\nhyprpm reload",
  },
  {
    type: "single" as const,
    inst: "If you use Hyprland's permission system, you may need to allow 'hyprpm' in your config:",
    cmd: "permission = /usr/(bin|local/bin)/hyprpm, plugin, allow",
  }
]

const projects = [

    {
      id: "netric",
      title: "Netric Sports",
      description: "A full-stack NBA analytics platform that features quick-lookups for \
            user-favorited players' and team stats. It features a precise \
            search engine, local caching, and a MongoDB-backed worker queue for rapid stat retrieval.",
      action: "web" as const,
      github: "https://github.com/dxledev/netric",
      url: "https://netricsports.us/",
      image: netricImg,
      tags: [
        "React.js",
        "Tailwind",
        "Python",
        "MongoDB",
        "REST APIs",
      ],
    },

    {
      id: "wss",
      title: "Wilderness Survival System",
      description: "Survival game featuring complex React state management, asynchronous REST integration, \
                    and a Java server backend that handles trading, vision, and strategy systems.",
      action: "web" as const,
      github: "https://github.com/CS3560-Team-4/WSS-Project",
      url: "cs3560-team-4.github.io/WSS-Project",
      image: wssImg,
      tags: [
        "React.js",
        "Tailwind",
        "Java",
        "Javalin",
        "REST APIs"
      ],
    },

    {
      id: "hymission",
      title: "Hymission",
      description: "Scrolling overview plugin for the Hyprland desktop compositor. Employs a customizable overview zoom-out for \
                    the scrolling layout, animated geometry transitions, dynamic reflow, and compositor-level rendering hooks. Utilizes \
                    Hyprland API and purely written in C++.",
      action: "modal" as const,
      github: "https://github.com/dxledev/hymission",
      instructions: inst_hymission,
      image: hymissionImg,
      tags: [
        "C++",
        "Linux"
      ],
    },

]

export { projects };

