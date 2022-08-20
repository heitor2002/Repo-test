const timeStamp = "1660330744109";
const publicKey = "f7ee4194bd09a1d79471d9f3647c9b3f";
const globalKey = "4bf72640b81958b3ba84ede604221d45";

const fetchHeroes = () => {
  const getUrl = (id) =>
    `http://gateway.marvel.com/v1/public/characters/${id}?ts=${timeStamp}&apikey=${publicKey}&hash=${globalKey}`;
  const arrayHeroes = [];
  for (let i = 1011333; i <= 1011353; i++) {
    arrayHeroes.push(fetch(getUrl(i)).then((resp) => resp.json()));
  }

  Promise.all(arrayHeroes).then((heroes) => {
    const listHeroes = heroes.reduce((accumulator, hero) => {
      const wikiHero = hero.data.results.map((info) => info)[0];
      const linksHero = wikiHero.urls;
      const arrLink = [];

      linksHero.find((info) => {
        // arrLink.push(info.type == 'comiclink')
        if (info.type == "comiclink") {
          arrLink.push(info.url);
        }
      });

      accumulator += `
            <li class="card">
                <div class="card-flip">
                    <div class="front-card">
                        <img src="${wikiHero.thumbnail.path}.jpg" alt="">
                    </div>
                    <div class="back-card">
                        <h2>${wikiHero.name}</h2>
                        <a href="${linksHero[0].url}">Bio</a>
                        <a href="${arrLink}">Comics</a>
                    </div>
                </div>
            </li>
            `;
      console.log(hero);
      return accumulator;
    }, "");

    const ulHeroList = document.querySelector('[dataHero="listHero"]');

    ulHeroList.innerHTML = listHeroes;
    // console.log(listHeroes)
  });
};

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

fetchHeroes();

letterAnimation();

// const url = `http://gateway.marvel.com/v1/public/events?ts=${timeStamp}&apikey=${publicKey}&hash=${globalKey}`

// fetch(url).then(resp => resp.json()).then(data => console.log(data))
