
const setItemActive = ($item) => {
    document.querySelector(".activeItem")?.classList.remove("activeItem");
    $item?.classList.add("activeItem");
}

const DATE_FORMAT = "yyyy-MM-dd";

export { setItemActive, DATE_FORMAT }