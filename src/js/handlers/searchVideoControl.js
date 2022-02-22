import { $ } from "../utils/DOM.js";
import { searchResult } from "../API.js";
import { createSearchedVideoList } from "../templates/searchedVideoList.js";
import { videoSkeletonTemplate } from "../templates/videoSkeleton.js";
import { FETCH_VIDEO_COUNT } from "../constants/classroom.js";
import { searchNotFoundTemplate } from "../templates/searchNotFound.js";
import { initInfiniteScroll } from "./scrollControl.js";
import { pageToken } from "../states/pageToken.js";
import { latestKeywordList } from "../states/latestKeywordList.js";
import { latestKeyword } from "../states/latestKeyword.js";

export const searchVideoController = (e) => {
  e.preventDefault();

  const keyword = $("#video-search-input").value;
  onSearchKeyword(keyword);
};

export const searchLatestKeywordController = ({ target }) => {
  if (target.classList.contains("js-latest-keyword")) {
    const keyword = target.innerText;
    $("#video-search-input").value = keyword;
    onSearchKeyword(keyword);
  }
};

export const onSearchKeyword = async (keyword) => {
  latestKeyword.set(keyword);
  latestKeywordList.add(keyword);

  const results = await searchVideo(keyword);
  results.length && initInfiniteScroll();
};

export const searchVideo = async (keyword) => {
  const $videoSearchResult = $("#video-search-result");
  $videoSearchResult.innerHTML =
    videoSkeletonTemplate().repeat(FETCH_VIDEO_COUNT);

  const { nextPageToken, items } = await searchResult(keyword);

  pageToken.set(nextPageToken);

  $videoSearchResult.innerHTML = "";
  items.length
    ? createSearchedVideoList(items)
    : ($videoSearchResult.innerHTML = searchNotFoundTemplate());

  return items;
};
