export const isComparer = (v1, v2) => {
  if (!v1) {
    return -1;
  } else if (!v2) {
    return 1;
  }
  if (v1.trim) {
    return v1.trim().localeCompare(v2.trim());
  } else {
    return v1.localeCompare(v2);
  }
};

export const isNumericComparer = (v1, v2) => {
  if (!v1) {
    return -1;
  } else if (!v2) {
    return 1;
  }

  if (v1 > v2) {
    return 1;
  } else if (v1 == v2) {
    return 0;
  } else {
    return -1;
  }
};
