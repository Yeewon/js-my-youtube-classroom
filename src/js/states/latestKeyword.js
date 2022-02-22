export const latestKeyword = {
  value: "",

  get() {
    return this.value;
  },

  set(newKeyword = "") {
    this.value = newKeyword;
  },
};
