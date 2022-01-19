import { makeAutoObservable } from "mobx";

export default class CollectionsStore {
  constructor() {
    this._collections = [];
    makeAutoObservable(this);
  }

  setCollections(collections) {
    this._collections = collections;
  }

  editCollection(collection) {
    this._collections = [
      ...this.collections.filter((coll) => coll.id !== collection.id),
      collection,
    ];
  }

  deleteCollection(id) {
    this._collections = this._collections.filter((coll) => coll.id !== id);
  }

  get collections() {
    return this._collections;
  }
}
