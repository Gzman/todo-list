
const setActive = ($item) => {
    document.querySelector(".activeItem")?.classList.remove("activeItem");
    $item?.classList.add("activeItem");
}

export { setActive }