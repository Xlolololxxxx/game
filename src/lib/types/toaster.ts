import { ReactNode } from "react";

export enum AlertType {
  success = "success",
  info = "info",
  warning = "warning",
  error = "error",
}

export type ToasterConfig = {
  type?: AlertType;
  title?: string;
  message: string;
};

export type ToasterProviderContextValueType = {
  triggerOpen: (conf: ToasterConfig) => void;
  triggerClose: () => void;
};

export type ToasterProviderProps = {
  children: ReactNode;
};
