const timeStamp = "1660330744109";
const publicKey = "f7ee4194bd09a1d79471d9f3647c9b3f";
const globalKey = "4bf72640b81958b3ba84ede604221d45";

const fetchHeroes = () => {
  const getHeroUrl = (id) =>
    `http://gateway.marvel.com/v1/public/characters/${id}?ts=${timeStamp}&apikey=${publicKey}&hash=${globalKey}`;
  const arrayHeroes = [];
  for (let i = 1011333; i <= 1011353; i++) {
    arrayHeroes.push(fetch(getHeroUrl(i)).then((resp) => resp.json()));
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
                        <img src="${wikiHero.thumbnail.path}.jpg" alt="Hero">
                    </div>
                    <div class="back-card">
                        <h2>${wikiHero.name}</h2>
                        <a href="${linksHero[0].url}">Bio</a>
                        <a href="${arrLink}">Comics</a>
                    </div>
                </div>
            </li>
            `;
      // console.log(hero);
      return accumulator;
    }, "");

    const ulHeroList = document.querySelector('[dataHero="listHero"]');

    ulHeroList.innerHTML = listHeroes;
    // console.log(listHeroes)
  });
};

const fetchEvents = () => {
  const getEventUrl = `http://gateway.marvel.com/v1/public/events?ts=${timeStamp}&apikey=${publicKey}&hash=${globalKey}`;

  const arrayEvents = [];
  arrayEvents.push(
    fetch(getEventUrl)
      .then((resp) => resp.json())
      .then((data) => data.data.results)
  );
  // console.log(arrayEvents)
  Promise.all(arrayEvents).then((events) => {
    events.map((arrEvent) => {
      const listEvents = arrEvent.reduce((accumulator, infoEvent) => {
        accumulator += `
          <li><a href="${infoEvent.urls[0].url}"><img src="${infoEvent.thumbnail.path}.jpg" alt="Event"></a></li>
          `;
        return accumulator;
      }, "");
      const ulEventsList = document.querySelector('[data-events="data-events"]')
      ulEventsList.innerHTML = listEvents
    });
  });
};

fetchHeroes();
fetchEvents();
