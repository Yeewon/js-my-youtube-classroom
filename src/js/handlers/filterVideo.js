import { $, $$ } from "../utils/DOM.js";
import { renderEmptyVideo, renderSavedVideo } from "../utils/render.js";
import { videoInfoList } from "../states/videoInfoList.js";
import { filter } from "../states/filter.js";

export const filterVideoController = ({ target }) => {
  if (!["toWatch", "watched", "liked"].includes(target.id)) return;
  const option = target.id;
  filter.set(option);
  buttonController(option);
  loadVideo(option);
};

const buttonController = (option) => {
  const buttons = $$("#video-filter button");
  buttons.forEach((button) => button.classList.remove("bg-cyan-100"));
  $(`#${option}`).classList.add("bg-cyan-100");
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
