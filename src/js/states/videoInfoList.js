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

  setStatus(option, targetId) {
    const newVideoInfoList = this.value.map((videoInfo) => {
      const { id, type } = videoInfo;
      if (id.videoId === targetId) {
        return {
          ...videoInfo,
          type: {
            ...type,
            [option]: !type[option],
          },
        };
      } else {
        return videoInfo;
      }
    });

    this.set(newVideoInfoList);
  },

  add(newVideoInfo = {}) {
    const newVideoInfoList = [...this.value, newVideoInfo];
    this.set(newVideoInfoList);
  },

  remove(targetId) {
    const newVideoinfo = this.value.filter(({ id }) => id.videoId != targetId);
    this.set(newVideoinfo);
  },

  get size() {
    return this.value.length;
  },
};
