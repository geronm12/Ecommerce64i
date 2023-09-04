function GetItem(key) {
  const existsLocalStorage = localStorage.getItem(key);

  if (existsLocalStorage) {
    return JSON.parse(existsLocalStorage);
  }

  return null;
}

function SetItem({ key, data }) {
  let value = data;

  if (typeof value === "object" || typeof value === "Array") {
    value = JSON.stringify(value);
  }

  localStorage.setItem(key, value);
}

function Clear() {
  localStorage.clear();
}

function ClearSpecific(key) {
  localStorage.removeItem(key);
}

export { GetItem, SetItem, Clear, ClearSpecific };
