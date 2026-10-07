import React from "react";
import type { Surface } from "../entities";

export type EventHandler = (payload: unknown) => void | Promise<void>;
export type SurfaceRenderer<T extends string = string> = (surface: Surface & { type: T }) => React.ReactElement;
