import type React from "react";

//

export interface SelectOption {
  label: string;
  value: string;
  media?: React.ReactElement;
}

//

export enum ProjectType {
  DESIGN = "Design",
  PRODUCT = "Product",
  SERVICE = "Service",
}

export const projectTypes = Object.values(ProjectType);
