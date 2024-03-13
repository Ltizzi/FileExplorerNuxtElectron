export interface HDElement {
  name: string;
  route: string;
  folder: string;
  isFolder: boolean;
  size: number;
  modified: number;
  access: number;
  birth: number;
}

export interface RouteNavigation {
  folder: string;
  route: string;
}
