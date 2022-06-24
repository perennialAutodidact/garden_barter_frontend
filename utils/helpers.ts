/**
 * @param string string
 * @returns string with the first letter of each word capitalized
 */
export const titleize = (string: string): string =>
  string
    .split(" ")
    .map((word, index) => {
      if (index !== 0) {
        return word.toLowerCase();
      } else {
        if (word[0]) {
          return word[0].toUpperCase() + word.slice(1).toLowerCase();
        } else {
          return "";
        }
      }
    })
    .join(" ");
