import i18n from "i18next";
import { MAX_ARRAY_SIZE, MAX_INPUT_RANGE, MIN_ARRAY_SIZE, MIN_INPUT_RANGE } from "@features/sortSensei/constants";

export const stringToArrayNumbers = (str: string): number[] => {
  return (
    str
      .match(/\d+/g) // Match sequences of digits
      ?.map((num) => parseInt(num, 10)) // Convert strings to integers
      .filter((num) => !isNaN(num)) ?? [] // / Remove any NaN values and return an empty array if no matches
  );
};

/* allow numbers, commas and whitespaces */
export const limitInputValues = (str: string): string => {
  return str.replace(/[^0-9,\s]+/g, "");
};

const t = i18n.getFixedT(null, "sortsensei");

export const validateArray = (array: number[]): "empty" | "valid" | string => {
  if (array.length === 0) return "empty";
  if (array.length > MAX_ARRAY_SIZE) {
    return t("error-message.to-many", { max: MAX_ARRAY_SIZE });
  }
  if (0 < array.length && array.length < MIN_ARRAY_SIZE) {
    return t("error-message.to-few", { min: MIN_ARRAY_SIZE });
  }
  if (array.some((n) => n < MIN_INPUT_RANGE || n > MAX_INPUT_RANGE)) {
    return t("error-message.range", { min: MIN_INPUT_RANGE, max: MAX_INPUT_RANGE });
  }

  // valid array
  return "valid";
};

export const generateRandomArray = (length: number) => {
  return Array.from({ length }, () => Math.floor(Math.random() * MAX_INPUT_RANGE + MIN_INPUT_RANGE));
};
