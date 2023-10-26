export const appendDecorationNav = () => {
  const decorationElem = document.createElement("div");
  decorationElem.classList.add("tabs__nav-decoration");
  decorationElem.classList.add("js-decoration");
  document.querySelector(".tabs__nav").append(decorationElem);
  return decorationElem;
};

export const styleDecorElem = (elem, decorWidth, decorOffset) => {
  elem.style.width = `${decorWidth}px`;
  elem.style.transform = `translateX(${decorOffset}px)`;
};
