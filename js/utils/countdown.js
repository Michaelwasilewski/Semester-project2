function splitIntoArray(num) {
  if (num < 10) {
    return [0, num];
  } else {
    return Array.from(String(num), Number);
  }
}

export { splitIntoArray };
