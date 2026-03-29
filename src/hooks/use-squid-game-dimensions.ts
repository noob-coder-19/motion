import { useSyncExternalStore } from "react";
import {
  SQUID_GAME_COMPACT_BREAKPOINT_PX,
  SQUID_GAME_THICKNESS_COMPACT,
  SQUID_GAME_THICKNESS_DESKTOP,
  SQUID_GAME_WIDTH_COMPACT,
  SQUID_GAME_WIDTH_DESKTOP,
} from "../constants";

const compactMediaQuery = (): MediaQueryList =>
  window.matchMedia(`(max-width: ${SQUID_GAME_COMPACT_BREAKPOINT_PX}px)`);

function subscribe(onChange: () => void): () => void {
  const mq = compactMediaQuery();
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return compactMediaQuery().matches;
}

function getServerSnapshot(): boolean {
  return false;
}

export function useSquidGameDimensions(): {
  width: number;
  thickness: number;
} {
  const compact = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
  return compact
    ? {
        width: SQUID_GAME_WIDTH_COMPACT,
        thickness: SQUID_GAME_THICKNESS_COMPACT,
      }
    : {
        width: SQUID_GAME_WIDTH_DESKTOP,
        thickness: SQUID_GAME_THICKNESS_DESKTOP,
      };
}
