document.addEventListener("DOMContentLoaded", () => {

    const flash = document.querySelector(".flash-msg");

    if (!flash) return;

    setTimeout(() => {

        flash.style.transition = "0.4s ease";
        flash.style.opacity = "0";

        setTimeout(() => {
            flash.remove();
        }, 400);

    }, 3000);

});