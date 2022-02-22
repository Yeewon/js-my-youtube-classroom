import { MAX_STORE_KEYWORD_COUNT } from "../constants/classroom.js";
import { LATEST_KEYWORD_LIST } from "../constants/localStorage.js";
import { createLatestKeyword } from "../templates/latestKeyword.js";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage.js";

export const latestKeywordList = {
  value: [],

  init() {
    this.set(getLocalStorage(LATEST_KEYWORD_LIST) ?? []);
  },

  get() {
    return this.value;
  },

  set(newKeywordList = []) {
    this.value = newKeywordList;
    setLocalStorage(LATEST_KEYWORD_LIST, this.value ?? []);
    createLatestKeyword(this.value);
  },

  add(newKeyword = "") {
    let newKeywordList = [...this.value];

    if (newKeywordList.includes(newKeyword)) {
      const targetIndex = newKeywordList.indexOf(newKeyword);
      newKeywordList.splice(targetIndex, 1);
    }

    newKeywordList = [newKeyword, ...newKeywordList];

    if (newKeywordList.length > MAX_STORE_KEYWORD_COUNT) {
      newKeywordList.pop();
    }

    this.set(newKeywordList);
  },

  get size() {
    return this.value.length;
  },
};
