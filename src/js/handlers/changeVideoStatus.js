import { BUTTON_LIST } from "../constants/classroom.js";
import { DELETE_CONFIRM_NSG } from "../constants/message.js";
import {
  DELETE_SUCCESS_MSG,
  LIKED_SUCCESS_MSG,
  LIKE_CANCEL_SUCCESS_MSG,
  TO_WATCH_SUCCESS_MSG,
  WATCHED_SUCCESS_MSG,
} from "../constants/snackbar.js";
import { filter } from "../states/filter.js";
import { videoInfoList } from "../states/videoInfoList.js";
import { loadVideo } from "./filterVideo.js";
import { onSnackbar } from "./snackbarControl.js";

export const changeVideoStatus = ({ target }) => {
  const option = target.id;
  if (BUTTON_LIST.includes(option)) {
    changeStatus(target);
    loadVideo(filter.get());
  }
};

const changeStatus = (target) => {
  const status = {
    watched: () => handleWatchedButton(target),
    liked: () => handleLikedButton(target),
    delete: () => {
      if (confirm(DELETE_CONFIRM_NSG)) {
        const { videoId } = target.closest(".js-video").dataset;
        videoInfoList.remove(videoId);
        onSnackbar(DELETE_SUCCESS_MSG);
      }
    },
  };

  return status[target.id]();
};

const handleWatchedButton = (target) => {
  if (target.classList.contains("opacity-hover")) {
    changeButton(target, "opacity-hover", "false");
    setVideoStatus(target, "isWatched", true);

    onSnackbar(WATCHED_SUCCESS_MSG);
  } else {
    changeButton(target, "false", "opacity-hover");
    setVideoStatus(target, "isWatched", false);

    onSnackbar(TO_WATCH_SUCCESS_MSG);
  }
};

const handleLikedButton = (target) => {
  if (target.classList.contains("opacity-hover")) {
    changeButton(target, "opacity-hover", "false");
    setVideoStatus(target, "isLiked", true);

    onSnackbar(LIKED_SUCCESS_MSG);
  } else {
    changeButton(target, "false", "opacity-hover");
    setVideoStatus(target, "isLiked", false);

    onSnackbar(LIKE_CANCEL_SUCCESS_MSG);
  }
};

const changeButton = (target, removeTarget, addTarget) => {
  target.classList.remove(removeTarget);
  target.classList.add(addTarget);
};

const setVideoStatus = (target, $type, value) => {
  const targetId = target.closest("article").dataset.videoId;
  const videos = videoInfoList.get();

  videos.map((video) => {
    if (video.id.videoId === targetId) return (video.type[$type] = value);
  });
  videoInfoList.set(videos);
};
