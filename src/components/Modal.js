import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
} from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import Icons from "./Icons";
import {
  createCollection,
  fetchCollections,
  updateCollection,
} from "../http/collectionAPI";
import { createTask, fetchTasks } from "../http/taskAPI";

const Modal = observer(() => {
  const { ui, collections } = useContext(Context);
  const ref = useRef(null);
  const [colorPickedId, setColorPickedId] = useState(-1);
  const [iconPickedId, setIconPickedId] = useState(-1);
  const [inputTitle, setInputTitle] = useState("");
  const [inputDate, setInputDate] = useState("");

  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      ui.setIsModalShow(false);
      setInputDate("");
      setInputTitle("");
      setColorPickedId(-1);
      setIconPickedId(-1);
      ui.setIsModalShow(false);
    }
  };

  useLayoutEffect(() => {
    if (window.innerWidth < 768) {
      if (ui.isModalShow) {
        document.body.style.minHeight = "130vh";
      } else {
        document.body.style.minHeight = "unset";
      }
    }
  }, [ui.isModalShow]);

  useEffect(() => {
    if (ui.modalMode === "editCollection") {
      setInputTitle(
        collections.collections.find(
          (collection) => collection.id === ui.activeCollection
        ).title
      );
      setColorPickedId(
        ui.colors.find(
          (color) =>
            color.hex ===
            collections.collections.find(
              (collection) => collection.id === ui.activeCollection
            ).color
        ).id
      );
      setIconPickedId(
        ui.icons.find(
          (icon) =>
            icon.title ===
            collections.collections.find(
              (collection) => collection.id === ui.activeCollection
            ).icon
        ).id
      );
    }

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [ui.isModalShow, ui.modalMode]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (ui.modalMode === "createCollection") {
      createCollection({
        title: inputTitle.trim(),
        icon:
          iconPickedId !== -1
            ? ui.icons.find((icon) => icon.id === iconPickedId).title
            : ui.icons.find((icon) => icon.id === 1).title,
        color:
          colorPickedId !== -1
            ? ui.colors.find((color) => color.id === colorPickedId).hex
            : ui.colors.find((color) => color.id === 1).hex,
      }).then(() => {
        fetchCollections().then((data) => collections.setCollections(data));
      });
    } else if (ui.modalMode === "createTask") {
      createTask({
        title: inputTitle.trim(),
        status: false,
        date: inputDate,
        color:
          colorPickedId !== -1
            ? ui.colors.find((color) => color.id === colorPickedId).hex
            : ui.colors.find((color) => color.id === 1).hex,
        collectionId: ui.activeCollection,
      }).then((data) => fetchTasks(data));
    } else if (ui.modalMode === "editCollection") {
      updateCollection({
        id: ui.activeCollection,
        title: inputTitle.trim(),
        icon:
          iconPickedId !== -1
            ? ui.icons.find((icon) => icon.id === iconPickedId).title
            : collections.collections.find(
                (collection) => collection.id === ui.activeCollection
              ).icon,
        color:
          colorPickedId !== -1
            ? ui.colors.find((color) => color.id === colorPickedId).hex
            : collections.collections.find(
                (collection) => collection.id === ui.activeCollection
              ).color,
      }).then(() => {
        fetchCollections().then((data) => collections.setCollections(data));
      });
    }

    setInputDate("");
    setInputTitle("");
    setColorPickedId(-1);
    setIconPickedId(-1);
    ui.setIsModalShow(false);
  };

  return (
    <div className={ui.isModalShow ? "overlay active" : "overlay"}>
      {!ui.modalMode.includes("Collection") ? (
        <div className="modal" ref={ref}>
          <h2 className="modal__title">Создание задачи</h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-control">
              <label>Цвет:</label>
              <div className="choose-color">
                {ui.colors.map((color) => (
                  <div
                    key={color.id}
                    className={
                      color.id === colorPickedId ? "square active" : "square"
                    }
                    style={{ background: color.hex }}
                    onClick={() => setColorPickedId(color.id)}
                  >
                    <Icons icon={"check"} iconClass={"icon"} />
                  </div>
                ))}
              </div>
            </div>
            <div className="input-control">
              <label>Дата:</label>
              <input
                type="date"
                value={inputDate}
                onChange={(e) => setInputDate(e.target.value)}
              />
            </div>
            <div className="input-control">
              <label>Название:</label>
              <input
                type="text"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                required
              />
            </div>
            <button className="btn btn--full-size btn--dark">Создать</button>
          </form>
        </div>
      ) : (
        <div className="modal" ref={ref}>
          <h2 className="modal__title">
            {ui.modalMode === "createCollection"
              ? "Создание коллекции"
              : "Редактирование коллекции"}
          </h2>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="input-control">
              <label>Цвет:</label>
              <div className="choose-color">
                {ui.colors.map((color) => (
                  <div
                    key={color.id}
                    className={
                      color.id === colorPickedId ? "square active" : "square"
                    }
                    style={{ background: color.hex }}
                    onClick={() => setColorPickedId(color.id)}
                  >
                    <Icons icon={"check"} iconClass={"icon"} />
                  </div>
                ))}
              </div>
            </div>
            <div className="input-control">
              <label>Иконка:</label>
              <div className="choose-icon">
                {ui.icons.map((icon) => (
                  <img
                    key={icon.id}
                    className={icon.id === iconPickedId ? "active" : ""}
                    src={icon.path}
                    alt="Icon"
                    onClick={() => setIconPickedId(icon.id)}
                  />
                ))}
              </div>
            </div>
            <div className="input-control">
              <label>Название:</label>
              <input
                type="text"
                value={inputTitle}
                onChange={(e) => setInputTitle(e.target.value)}
                required
              />
            </div>
            <button className="btn btn--full-size btn--dark">
              {ui.modalMode === "createCollection"
                ? "Создать"
                : "Редактировать"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
});

export default Modal;
