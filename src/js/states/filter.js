export const filter = {
  value: "toWatch",

  get() {
    return this.value;
  },

  set(newFilter = "") {
    this.value = newFilter;
  },

  contains(option) {
    const filters = ["toWatch", "watched", "liked"];
    return filters.includes(option);
  },
};
