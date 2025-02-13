window.addEventListener("load", () =>{
    const $menu = document.querySelector("#menu");
    const $sidebar = document.querySelector("#sidebar");
    $menu.addEventListener("click", () =>{
        if ($menu.classList.contains("fa-bars")) {
            $menu.classList.remove("fa-bars");
            $menu.classList.add("fa-xmark");
        } else if ($menu.classList.contains("fa-xmark")) {
            $menu.classList.remove("fa-xmark");
            $menu.classList.add("fa-bars");
        }
        $sidebar.classList.toggle("hidden");
    })
})