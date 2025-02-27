import { Mail, Home, FileText, FileMinus, Image, Layout, Book } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "PastProjects",
    title: "Past Projects",
    icon: <FileText size={20} />,
    navLink: "/past-projects",
  },
  {
    id: "KidzProjects",
    title: "Kidz Projects",
    icon: <Book size={20} />,
    navLink: "/kidz-projects",
  },
  {
    id: "OngoingProjects",
    title: "News Updates",
    icon: <FileMinus size={20} />,
    navLink: "/news-updates",
  },
  {
    id: "events",
    title: "Events",
    icon: <Image size={20} />,
    navLink: "/events",
  },
  {
    id: "volunteers",
    title: "Volunteers",
    icon: <Image size={20} />,
    navLink: "/volunteers",
  },
  {
    id: "layout",
    title: "Layout",
    icon: <Layout size={20} />,
    navLink: "/heros",
  },
];
