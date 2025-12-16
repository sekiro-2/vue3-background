export function saveData(localname, data) {
  localStorage.setItem(localname, JSON.stringify(data))
}
