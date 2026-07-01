export type Point = {
  x: number;
  y: number;
};

export type Zone = {
  id: string;
  name: string;
  polygon: Point[];
  loadFactor: number;
  trafficLevel: number;
};
