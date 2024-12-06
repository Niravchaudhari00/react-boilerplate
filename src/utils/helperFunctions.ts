const getObjectKeys = (obj: any) => {
  if (!obj) return [];
  return Object.keys(obj);
};

// get length of object or array or string
const getLength = (obj: any) => {
  if (!obj) return 0;

  if (Array.isArray(obj)) {
    return obj.length;
  }

  if (typeof obj === "object" && obj !== null) {
    return getObjectKeys(obj).length;
  }

  if (typeof obj === "string") {
    return obj.length;
  }

  return 0;
};

export { getLength, getObjectKeys };
