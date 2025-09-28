export const PLATFORM_NAME = "testPlatform";
export const BASE_IFRAME_URL = "http://localhost:5173"; // CHANGE URL TO PIS | PC
export const APP_URL = "http://localhost:5174"; // CHANGE URL TO MATCH YOUR RUNNING
export const REF_ID = import.meta.env.VITE_REF_ID;

export const PATH_PIS_PAGE_ADD = "/select-product-type";
export const PATH_PIS_PAGE_LIST = "/product-list";
export const PATH_PC_PAGE_ADD = "/add-catalog";
export const PATH_PC_PAGE_LIST = "/catalog-list";

export const PATH_APP_PAGE_LIST = "/list";
export const PATH_APP_PAGE_ADD = "/add";

export const PIS_IFRAME_ID = "pis-iframe";
export const PC_IFRAME_ID = "pc-iframe";
export const SENDER_PIS = "pis.product";
export const SENDER_PC = "pc.catalog";

export enum pageIframe {
  ADD = "ADD",
  LIST = "LIST",
}

export enum apps {
  PIS = "PIS",
  PC = "PC",
}
