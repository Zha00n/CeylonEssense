import { Mail, Home, FileText, FileMinus, Image, Layout, Book } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "Products",
    title: "Products",
    icon: <FileText size={20} />,
    navLink: "/products",
  },
  {
    id: "Resources",
    title: "Resources",
    icon: <Book size={20} />,
    navLink: "/resources",
  },
];
