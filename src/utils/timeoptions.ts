export const TIME_OPTIONS = (() => {
  const list: { id: string; title: string }[] = [];
  for (let h = 0; h <= 23; h++) {
    const hour = String(h).padStart(2, "0");
    list.push({ id: `${hour}:00`, title: `${hour}:00` });
    list.push({ id: `${hour}:30`, title: `${hour}:30` });
  }
  list.push({ id: "24:00", title: "24:00" });
  return list;
})();
