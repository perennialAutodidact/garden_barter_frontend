export const titleize = (string) =>
  string
    .split(" ")
    .map((word, index) => {
      if (index !== 0) {
        return word.toLowerCase();
      } else {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join(" ");
