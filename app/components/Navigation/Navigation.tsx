import { NavLink } from "@remix-run/react";

export default function Navigation() {
  return (
    <nav className="flex flex-row justify-center w-full py-6 border-b border-slate-800">
      <div className="w-full flex flex-row items-center max-w-5xl xl:px-0 px-8">
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-lg underline mr-6" : "text-lg hover:underline mr-6"
          }
          to="/projects"
        >
          Projects
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            isActive ? "text-lg underline mr-6" : "text-lg hover:underline mr-6"
          }
          to="/about"
        >
          About
        </NavLink>
      </div>
    </nav>
  );
}
