    // Header
let hamburger = document.querySelector("#hamburger");
let headerDown  = document.querySelector(".header-down");
let cross  = document.querySelector("#cross");

hamburger.addEventListener("click", ()=> {
    headerDown.style.display = "flex";
    hamburger.style.display = "none";
    cross.style.display = "flex";
    console.log("Clicked");
});

cross.addEventListener("click", ()=> {
    headerDown.style.display = "none";
    hamburger.style.display = "flex";
    cross.style.display = "none";
});


