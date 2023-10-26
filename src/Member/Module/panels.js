export const findActivePanel = (index) => {
  return document.querySelectorAll(".tabs__panel")[index];
};

export const setActivePanel = (index) => {
  const panels = document.querySelectorAll(".tabs__panel");
  panels.forEach((el) => {
    el.classList.remove("js-active");
  });
  panels[index].classList.add("js-active");
};
