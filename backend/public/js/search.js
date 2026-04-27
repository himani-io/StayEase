setTimeout(() => {
   const flash = document.querySelector(".flash-msg");

   if (flash) {
      flash.style.transition = "0.5s";
      flash.style.opacity = "0";

      setTimeout(() => {
           flash.remove();
        }, 500);
    }
}, 3000);