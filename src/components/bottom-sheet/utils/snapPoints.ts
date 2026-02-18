import type { BottomSheetSnapPoint } from '../types';

export function computeSnapHeightPx(
  snapPoints: BottomSheetSnapPoint[] | undefined,
  height: number | undefined,
  expandable: boolean,
  instinctHeight: number,
  initialSnapPoint: number | undefined,
): number | null {
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const points = Array.isArray(snapPoints) ? snapPoints : [];

  let combinedSnapPoints: BottomSheetSnapPoint[] = [...points];
  if (typeof height === 'number' && !Number.isNaN(height)) {
    combinedSnapPoints = [height, ...combinedSnapPoints];
  }
  if (expandable) {
    combinedSnapPoints = [instinctHeight, ...combinedSnapPoints, '100%'];
  }

  const normalized = combinedSnapPoints
    .map((p) => {
      if (typeof p === 'number') return p;
      const m = String(p).match(/^(\d+(?:\.\d+)?)%$/);
      if (!m) return null;
      const pct = Number(m[1]);
      return Math.round((pct / 100) * vh);
    })
    .filter((n): n is number => typeof n === 'number' && Number.isFinite(n) && n > 0);

  if (!normalized.length) return null;

  const idx = typeof initialSnapPoint === 'number' ? initialSnapPoint : 0;
  const chosen = normalized[Math.min(Math.max(idx, 0), normalized.length - 1)];
  return chosen ?? null;
}
