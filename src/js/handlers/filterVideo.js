import { $, $$ } from "../utils/DOM.js";
import { renderEmptyVideo, renderSavedVideo } from "../utils/render.js";
import { videoInfoList } from "../states/videoInfoList.js";
import { filter } from "../states/filter.js";
import { PRIMARY_COLOR } from "../constants/classroom.js";

export const filterVideoController = ({ target }) => {
  const option = target.id;

  if (filter.contains(option)) {
    filter.set(option);
    setButtonColor(option);
    loadVideo(option);
  }
};

const setButtonColor = (option = "toWatch") => {
  InitializeButtonColor();
  setPrimaryColor(option);
};

const InitializeButtonColor = () => {
  const buttons = $$("#video-filter button");
  buttons.forEach((button) => button.classList.remove(PRIMARY_COLOR));
};

const setPrimaryColor = (option = "toWatch") => {
  $(`#${option}`).classList.add(PRIMARY_COLOR);
};

export const loadVideo = (option = "toWatch") => {
  const filteredVideo = filterVideo(option);
  filteredVideo.length ? renderSavedVideo(filteredVideo) : renderEmptyVideo();
};

const filterVideo = (option) => {
  const videos = videoInfoList.get();
  const filter = {
    toWatch: () => videos.filter(({ type }) => !type.isWatched),
    watched: () => videos.filter(({ type }) => type.isWatched),
    liked: () => videos.filter(({ type }) => type.isLiked),
  };

  return filter[option]();
};
