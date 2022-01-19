import React from "react";
import Icons from "./Icons";

const SidebarCollection = ({ collection, active, setActive }) => {
  return (
    <li
      className={active ? "sidebar__collection active" : "sidebar__collection"}
      onClick={() => setActive()}
    >
      <div className="icon__wrap" style={{ background: collection.color }}>
        <Icons icon={collection.icon} iconClass={"sidebar__collection__icon"} />
      </div>
      {collection.title}
    </li>
  );
};

export default SidebarCollection;
