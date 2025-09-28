import {
  APP_URL,
  BASE_IFRAME_URL,
  pageIframe,
  PLATFORM_NAME,
  REF_ID,
  PATH_APP_PAGE_ADD,
  PATH_APP_PAGE_LIST,
  PATH_PC_PAGE_ADD,
  PATH_PC_PAGE_LIST,
  PATH_PIS_PAGE_ADD,
  PATH_PIS_PAGE_LIST,
} from "./constant";
import { usePlatform } from "../composables/usePlatform";
const { isPCIframe, isPISIframe } = usePlatform();

export function getPageIframeURL(page: pageIframe): string {
  const isPageAdd = page === pageIframe.ADD;
  if (isPCIframe()) {
    return isPageAdd ? PATH_PC_PAGE_ADD : PATH_PC_PAGE_LIST;
  }

  return isPageAdd ? PATH_PIS_PAGE_ADD : PATH_PIS_PAGE_LIST;
}

export function getPageAppURL(page: pageIframe): string {
  return page === pageIframe.ADD ? PATH_APP_PAGE_ADD : PATH_APP_PAGE_LIST;
}

export function getIframeUrl(page: pageIframe): string {
  const currentPage = getPageIframeURL(page);
  let iframeURL = `${BASE_IFRAME_URL}${currentPage}?ref_id=${REF_ID}&platform=${PLATFORM_NAME}`;
  if (isPISIframe()) {
    iframeURL += `&page_add_product=${APP_URL}${PATH_APP_PAGE_ADD}`;
    iframeURL += `&page_my_product=${APP_URL}${PATH_APP_PAGE_LIST}`;
  } // required url app page list and add on PIS

  return iframeURL;
}
