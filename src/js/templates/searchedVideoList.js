import { $ } from "../utils/DOM.js";
import { formatDate } from "../utils/date.js";
import { videoInfoList } from "../states/videoInfoList.js";
import { saveButtonTemplate, saveCancelButtonTemplate } from "./button.js";

export const createSearchedVideoList = (videos) => {
  videos.map((video) => {
    $("#video-search-result").insertAdjacentHTML(
      "beforeend",
      searchedVideoListTemplate(video)
    );
  });
};

export const searchedVideoListTemplate = ({ id, snippet }) => {
  const { channelId, channelTitle, publishTime, title } = snippet;
  const { videoId } = id;
  const date = formatDate(publishTime);
  const buttonTemplate = saveButtonConroller(id.videoId);

  return `<article class="clip js-video relative" data-video-id="${videoId}" data-title="${title}" data-channel-id="${channelId}" data-channel-title="${channelTitle}" data-publish-time="${publishTime}">
                <div class="preview-container">
                   <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
                </div>
                <div class="content-container pt-2 px-1">
                    <h3>${title}</h3>
                    <div>
                        <a href="https://www.youtube.com/channel/${channelId}" target="_blank" class="channel-name mt-1">
                        ${channelTitle}
                        </a>
                        <div class="meta">
                           <p>${date}</p>
                        </div>
                    </div>
                </div>
                <div class="button-list d-flex justify-end">
                    ${buttonTemplate}
                </div>
            </article>`;
};

const saveButtonConroller = (targetId) => {
  const savedVideoList = videoInfoList.get();
  let buttonTemplate = "";

  savedVideoList.map((videoInfo) => {
    if (videoInfo.id.videoId === targetId) {
      buttonTemplate = saveCancelButtonTemplate();
      return;
    }
  });

  if (buttonTemplate === "") buttonTemplate = saveButtonTemplate();

  return buttonTemplate;
};
