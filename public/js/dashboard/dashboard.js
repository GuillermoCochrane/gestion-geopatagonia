window.addEventListener("load", () =>{
    const $menu = document.querySelector("#menu");
    const $sidebar = document.querySelector("#sidebar");
    $menu.addEventListener("click", () =>{
        $sidebar.classList.toggle("hidden");
        console.log($sidebar.classList);
    })
})