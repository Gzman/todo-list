
const setItemActive = ($item) => {
    document.querySelector(".activeItem")?.classList.remove("activeItem");
    $item?.classList.add("activeItem");
}

export { setItemActive }