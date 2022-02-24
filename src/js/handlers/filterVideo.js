import { $, $$ } from "../utils/DOM.js";
import { renderEmptyVideo, renderSavedVideo } from "../utils/render.js";
import { videoInfoList } from "../states/videoInfoList.js";
import { filter } from "../states/filter.js";
import { PRIMARY_COLOR } from "../constants/classroom.js";

export const filterVideoController = ({ target }) => {
  const option = target.id;

  if (filter.contains(option)) {
    filter.set(option);
    filterButtonController(option);
    loadVideo(option);
  }
};

const filterButtonController = (option = "toWatch") => {
  const buttons = $$("#video-filter button");
  buttons.forEach((button) => button.classList.remove(PRIMARY_COLOR));
  $(`#${option}`).classList.add(PRIMARY_COLOR);
};

export const loadVideo = (option = "toWatch") => {
  const filteredVideo = filterVideo(videoInfoList.get(), option);
  if (!filteredVideo.length) renderEmptyVideo();
  else renderSavedVideo(filteredVideo);
};

const filterVideo = (videos, option) => {
  const filter = {
    toWatch: () => videos.filter(({ type }) => !type.isWatched),
    watched: () => videos.filter(({ type }) => type.isWatched),
    liked: () => videos.filter(({ type }) => type.isLiked),
  };

  return filter[option]();
};
