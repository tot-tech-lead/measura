export enum ShapeTypes {
  RECTANGLE = 'RECTANGLE',
  OVAL = 'OVAL',
  TRAPEZOID = 'TRAPEZOID',
}

export const SHAPE_OPTIONS = [
  { label: 'Прямокутник', value: ShapeTypes.RECTANGLE },
  { label: 'Овал', value: ShapeTypes.OVAL },
  { label: 'Трапеція', value: ShapeTypes.TRAPEZOID },
];

export enum SurfaceTypes {
  FLOOR = 'FLOOR',
  WALL = 'WALL',
}

export const SURFACE_OPTIONS = [
  { label: 'Підлога', value: SurfaceTypes.FLOOR },
  { label: 'Стіна', value: SurfaceTypes.WALL },
];
