import { BUTTON_LIST, UN_SELECTED_ATTRIBUTE } from "../constants/classroom.js";
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
    watched: () => handleStatusButton(target),
    liked: () => handleStatusButton(target),
    delete: () => handleDeleteButton(target),
  };

  return status[target.id]();
};

const handleStatusButton = (target) => {
  target.classList.toggle(UN_SELECTED_ATTRIBUTE);

  const targetId = target.closest("article").dataset.videoId;
  videoInfoList.setStatus(option[target.id], targetId);

  showStatusChangeMessage(target);
};

const handleDeleteButton = (target) => {
  if (confirm(DELETE_CONFIRM_NSG)) {
    const { videoId } = target.closest(".js-video").dataset;
    videoInfoList.remove(videoId);
    onSnackbar(DELETE_SUCCESS_MSG);
  }
};

const showStatusChangeMessage = (target) => {
  isWatchedButton
    ? onSnackbar(
        isSelected(target) ? WATCHED_SUCCESS_MSG : TO_WATCH_SUCCESS_MSG
      )
    : onSnackbar(
        isSelected(target) ? LIKED_SUCCESS_MSG : LIKE_CANCEL_SUCCESS_MSG
      );
};

const isWatchedButton = () => {
  return target.id === "watched";
};

const isSelected = (target) => {
  return !target.classList.contains(UN_SELECTED_ATTRIBUTE);
};

const option = {
  watched: "isWatched",
  liked: "isLiked",
};
