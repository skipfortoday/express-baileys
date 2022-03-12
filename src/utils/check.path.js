import { existsSync, mkdirSync } from 'fs';

/**
 * @param {string} path
 */
export function checkPath(path) {
   if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
   }
}
