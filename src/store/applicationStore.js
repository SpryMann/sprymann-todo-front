import { makeAutoObservable } from "mobx";

export default class UiStore {
  constructor() {
    this._isSidebarShow = false;
    this._activeCollection = -1;
    this._isModalShow = false;
    this._modalMode = "createCollection";
    this._colors = [
      { id: 1, hex: "#fc76a1" },
      { id: 2, hex: "#ffb347" },
      { id: 3, hex: "#ad68e5" },
      { id: 4, hex: "#70c4bf" },
      { id: 5, hex: "#77dd77" },
      { id: 6, hex: "#ff99c8" },
      { id: 7, hex: "#d0f4de" },
      { id: 8, hex: "#a9def9" },
      { id: 9, hex: "#e9ff70" },
    ];
    this._icons = [
      {
        id: 1,
        title: "book",
        path: "./images/book-fill.svg",
      },
      {
        id: 2,
        title: "user",
        path: "./images/person-fill.svg",
      },
      {
        id: 3,
        title: "pencil",
        path: "./images/pencil-fill.svg",
      },
      {
        id: 4,
        title: "bookmark",
        path: "./images/bookmark-fill.svg",
      },
      {
        id: 5,
        title: "boombox",
        path: "./images/boombox-fill.svg",
      },
      {
        id: 6,
        title: "camera",
        path: "./images/camera-fill.svg",
      },
      {
        id: 7,
        title: "video-camera",
        path: "./images/camera-video-fill.svg",
      },
      {
        id: 8,
        title: "cart",
        path: "./images/cart-fill.svg",
      },
      {
        id: 9,
        title: "chat",
        path: "./images/chat-fill.svg",
      },
      {
        id: 10,
        title: "card",
        path: "./images/credit-card-fill.svg",
      },
    ];
    makeAutoObservable(this);
  }

  setIsSidebarShow(bool) {
    this._isSidebarShow = bool;
  }

  setActiveCollection(number) {
    this._activeCollection = number;
  }

  setIsModalShow(bool) {
    this._isModalShow = bool;
  }

  setModalMode(mode) {
    this._modalMode = mode;
  }

  get isSidebarShow() {
    return this._isSidebarShow;
  }

  get activeCollection() {
    return this._activeCollection;
  }

  get isModalShow() {
    return this._isModalShow;
  }

  get modalMode() {
    return this._modalMode;
  }

  get colors() {
    return this._colors;
  }

  get icons() {
    return this._icons;
  }
}
