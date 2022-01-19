import React, { useEffect, useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import TaskList from "./TaskList";
import useComponentVisible from "../hooks/useComponentVisible";
import { deleteCollection, fetchCollections } from "../http/collectionAPI";
import { fetchTasks } from "../http/taskAPI";

const Collection = observer(() => {
  const { tasks, ui, collections } = useContext(Context);
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  useEffect(() => {
    if (ui.activeCollection !== -1) {
      fetchTasks(ui.activeCollection).then((data) => tasks.setTasks(data));
    }
  }, [ui.activeCollection, ui.isModalShow, tasks]);

  if (ui.activeCollection !== -1) {
    return (
      <div className="collection">
        <div className="collection__header">
          <button className="btn" onClick={() => ui.setActiveCollection(-1)}>
            <svg
              className="collection__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>
          <h1 className="collection__title">
            {
              collections.collections.find(
                (collection) => collection.id === ui.activeCollection
              ).title
            }
          </h1>
          <div className="settings">
            <button onClick={() => setIsComponentVisible(true)}>
              <svg
                className="collection__icon settings__icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
              </svg>
            </button>
            <ul
              ref={ref}
              className={
                isComponentVisible ? "settings__list active" : "settings__list"
              }
            >
              <li
                className="settings__item"
                onClick={() => {
                  ui.setModalMode("editCollection");
                  ui.setIsModalShow(true);
                }}
              >
                Редактировать
              </li>
              <li
                className="settings__item"
                onClick={() => {
                  deleteCollection(ui.activeCollection).then(() => {
                    fetchCollections().then((data) =>
                      collections.setCollections(data)
                    );
                  });
                  ui.setActiveCollection(-1);
                  setIsComponentVisible(false);
                }}
              >
                Удалить
              </li>
            </ul>
          </div>
        </div>
        <button
          className="btn btn--full-size add-btn"
          onClick={() => {
            ui.setModalMode("createTask");
            ui.setIsModalShow(true);
          }}
        >
          <div className="icon__wrap">
            <svg
              className="collection__icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>
          </div>
          Добавить задачу
        </button>
        <TaskList title={"Задачи"} status={false} />
        <TaskList title={"Завершенные"} status={true} />
      </div>
    );
  } else {
    return (
      <div className="collection">
        <h2>Выберите коллекцию или создайте новую 👈🏽</h2>
      </div>
    );
  }
});

export default Collection;
