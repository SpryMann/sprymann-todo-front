import { makeAutoObservable } from "mobx";
import { authVerify } from "../http/auth";

export default class UserStore {
  constructor() {
    this._isLogged = authVerify();
    this._isAuthorizedEver = localStorage.getItem("authorizedEver")
      ? true
      : false;
    makeAutoObservable(this);
  }

  setIsLogged(boolean) {
    this._isLogged = boolean;
  }

  setIsAuthorizedEver(boolean) {
    this._isAuthorizedEver = boolean;
  }

  get isLogged() {
    return this._isLogged;
  }

  get isAuthorizedEver() {
    return this._isAuthorizedEver;
  }
}
