import { MAX_SAVEABLE_VIDEO_COUNT } from "../constants/classroom.js";
import { renderSaveButton, renderSaveCancelButton } from "../utils/render.js";
import { loadVideo } from "./filterVideo.js";
import { videoInfoList } from "../states/videoInfoList.js";
import { filter } from "../states/filter.js";
import { onSnackbar } from "./snackbarControl.js";
import {
  EXCEEDED_STORABLE_VIDEOS,
  SAVE_CANCEL_SUCCESS_MSG,
  SAVE_SUCCESS_MSG,
} from "../constants/snackbar.js";

export const saveVideoController = ({ target }) => {
  if (target.classList.contains("save-button")) {
    if (videoInfoList.size < MAX_SAVEABLE_VIDEO_COUNT) {
      saveVideo(target.closest(".js-video"));
      renderSaveCancelButton(target.closest(".button-list"));
      onSnackbar(SAVE_SUCCESS_MSG);
    } else {
      onSnackbar(EXCEEDED_STORABLE_VIDEOS);
    }
  } else if (target.classList.contains("save-cancel-button")) {
    saveCancelVideo(target.closest(".js-video"));
    renderSaveButton(target.closest(".button-list"));
    onSnackbar(SAVE_CANCEL_SUCCESS_MSG);
  }

  loadVideo(filter.get());
};

const saveVideo = ($video) => {
  const newVideoInfo = createVideoInfo($video.dataset);
  videoInfoList.add(newVideoInfo);
};

const saveCancelVideo = ($video) => {
  const { videoId } = $video.dataset;
  videoInfoList.remove(videoId);
};

const createVideoInfo = (videoDataset) => {
  const { videoId, title, channelId, channelTitle, publishTime } = videoDataset;

  return {
    id: { videoId },
    snippet: { title, channelId, channelTitle, publishTime },
    type: {
      isWatched: false,
      isLiked: false,
    },
  };
};
