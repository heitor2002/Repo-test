const letterAnimation = () => {
    const title = document.getElementById("title_marvel");
    const titleValue = "Marvel API";
    var counter = 0;
  
    setInterval(() => {
      if (counter <= titleValue.length) {
        counter++;
      } else if (counter > titleValue.length) {
        counter = 0;
      }
      const titleSlice = titleValue.slice(0, counter);
      title.innerHTML = titleSlice;
    }, 400);
  };

const elementTarget = document.querySelectorAll("[fade-animation]");
const fadeAnimation = "show_fade";

const scrollAnimation = () => {
    const windowTop = window.pageYOffset + ((window.innerHeight * 3) / 4)
    elementTarget.forEach((e) => {
    if(windowTop > e.offsetTop){
        e.classList.add(fadeAnimation)
    }else{
        e.classList.remove(fadeAnimation)
    }
    })
}

if(elementTarget.length){
    window.addEventListener("scroll", () => {
        scrollAnimation()
        // console.log('ola')
    })
}

letterAnimation();
