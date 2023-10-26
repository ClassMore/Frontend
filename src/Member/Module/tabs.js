export const setActiveItem = (elem) => {
  const navItems = document.querySelectorAll(".tabs__nav-item");
  navItems.forEach((el) => {
    el.classList.remove("js-active");
  });
  elem.classList.add("js-active");
};

export const findActiveItem = (tabsNavItems) => {
  for (let i = 0; i < tabsNavItems.length; i++) {
    if (tabsNavItems[i].classList.contains("js-active")) {
      return i;
    }
  }
  return 0;
};
export const findActiveItemParams = (activeItemIndex) => {
  const activeTab =
    document.querySelectorAll(".tabs__nav-item")[activeItemIndex];
  const activeItemWidth = activeTab.offsetWidth - 1;
  const activeItemOffset_left = activeTab.offsetLeft;
  return [activeItemWidth, activeItemOffset_left];
};
