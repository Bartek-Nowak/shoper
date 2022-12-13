import { LOAD_LIMIT } from "../const";

export function checkDataEnd(prevData, nextData) {
  if (prevData === null) return false;
  console.log(nextData.length);
  if (nextData.length % LOAD_LIMIT !== 0) return true;
  if (JSON.stringify(prevData) === JSON.stringify(nextData)) return true;
}