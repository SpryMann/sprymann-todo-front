import React, { useContext, useEffect } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import SidebarCollection from "./SidebarCollection";
import { fetchCollections } from "../http/collectionAPI";

const Sidebar = observer(() => {
  const { ui, collections, user } = useContext(Context);

  useEffect(() => {
    if (user.isLogged) {
      fetchCollections().then((data) => collections.setCollections(data));
    } else {
      ui.setIsSidebarShow(false);
      collections.setCollections([]);
      ui.setActiveCollection(-1);
    }
  }, [collections, user.isLogged]);

  return (
    <div className={ui.isSidebarShow ? "sidebar active" : "sidebar"}>
      <h2 className="sidebar__title">Коллекции</h2>
      <ul className="sidebar__collections">
        {collections.collections.map((item) => (
          <SidebarCollection
            key={item.id}
            active={ui.activeCollection === item.id}
            setActive={() => ui.setActiveCollection(item.id)}
            collection={item}
          />
        ))}
      </ul>
      {user.isLogged && (
        <div className="sidebar__bottom">
          <button
            className="btn"
            onClick={() => {
              ui.setModalMode("createCollection");
              ui.setIsModalShow(true);
            }}
          >
            <svg
              className="sidebar__collection__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
});

export default Sidebar;
