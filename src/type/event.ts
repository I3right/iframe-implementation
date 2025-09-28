/* 
THIS FILE INCLUDE SECTION 
  1. GENERIC EVENT TYPE 
  2. RECIVER FROM IFRAME
  3. EVENT ADAPTER
  4. SENDER TO IFRAME
*/

// =============== 1. GENRIC EVENT TYPE ===============
// TOPIC
export enum eventTopic {
  pisEvent = "pisEvent",
}
// PIS TOAST
export enum eventToastType {
  success = "success",
  error = "error",
}

export enum eventToastColor {
  success = "success",
  danger = "danger",
}

// =============== 2. RECIEVER FROM IFRAME ===============
// PIS EVENT [MODAL, TOAST, NAVIGATE]
// PIS MODAL
export type pisEventModalPayload = {
  message: string;
  icon: {
    // name , color
    // style , icon
    style?: string; // warning
    icon?: string; // ssk icon color
    name?: string; // warning
    color?: string; // ssk icon color
  };
  data?: {
    id: string;
    name?: string;
    productName?: string;
  };
  warningText?: string;
};

// PIS Toast
export type pisEventToastPayload = {
  message: string;
  type: eventToastType;
  icon: eventToastIcons;
};
// PIS Navigate
export type pisEventNavigatePayload = {
  origin: string;
  path: string;
};

// =============== 3. EVENT ADAPTER ===============
// PIS MODAL
export type eventModalOptions = {
  message: string;
  icon: { type: string; name: string };
  warningText: string;
  data?: any;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};

// PIS TOAST
export type eventToastIcons = {
  style: string;
  color: eventToastColor;
  icon: string;
};

export type eventToastOptions = {
  message: string;
  type: eventToastType;
  icon: eventToastIcons;
};

// EVENT ADAPTER
export type eventAdapter = {
  modal: (o: eventModalOptions) => void;
  toast: (o: eventToastOptions) => void;
  navigate: (path: string) => void;
};

// =============== 4. SEND TO IFRAME ===============
export type eventPayload = {
  sender: string;
  topic: string;
  payload: Record<string, any>;
};
