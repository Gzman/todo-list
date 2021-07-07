
const setItemActive = ($item) => {
    document.querySelector(".activeItem")?.classList.remove("activeItem");
    $item?.classList.add("activeItem");
}

const DATE_FORMAT = "dd.MM.yyyy"

export { setItemActive, DATE_FORMAT }