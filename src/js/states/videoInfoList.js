import { $ } from "../utils/DOM.js";
import { SAVED_VIDEO_LIST } from "../constants/localStorage.js";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage.js";
import { renderSavedVideo } from "../utils/render.js";

export const videoInfoList = {
  value: [],

  init() {
    this.set(getLocalStorage(SAVED_VIDEO_LIST) ?? []);
  },

  get() {
    return this.value;
  },

  set(newVideoInfoList = []) {
    this.value = newVideoInfoList;
    setLocalStorage(SAVED_VIDEO_LIST, this.value ?? []);
    renderSavedVideo(this.value);
    $("#saved-video-count").innerText = this.size;
  },

  add(newVideoInfo = {}) {
    const newVideoInfoList = [...this.value, newVideoInfo];
    this.set(newVideoInfoList);
  },

  remove(targetId) {
    const oldVideoInfo = [...this.value];
    const newVideoinfo = oldVideoInfo.filter(
      ({ id }) => id.videoId != targetId
    );
    this.set(newVideoinfo);
  },

  get size() {
    return this.value.length;
  },
};
