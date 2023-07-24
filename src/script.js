const { getUser } = require('./roleta');
const { getMatch } = require('./matchs');
const { exec } = require('child_process');
const _ = require('lodash');

this.arrUsers = [];

const command = 'start chrome';

const findMatch = async () => {
  try {
    const { results, photosIdsEncounter } = await getUser();
    const { photoIdsMatch } = await getMatch();

    const matchFoundId = photosIdsEncounter.filter((element) => photoIdsMatch.includes(element));

    for (const photoMatch of matchFoundId) {
      const find = results.find(
        ({ user }) => user.albums[0].photos.some((photo) => photo.id.replace(/-\d+$/, '') === photoMatch)
      );

      if (find) {
        const url = find.user.albums[0].photos[0].large_url;
        this.arrUsers.push({ nome: find.user.name, url });
      }
    }
  } catch (error) {
    console.error('Erro ao encontrar o match:', error);
    return;
  }
};

const runMultipleTimes = async (totalTimes) => {
  let count = 1;

  const execute = async () => {
    try {
        console.log(`Rodando script pela ${count} vez`)
        await findMatch();

      if (count === totalTimes) {

        clearInterval(intervalId);

        const filteredArr = _.uniqBy(this.arrUsers, obj => obj.nome + obj.url);

        if (filteredArr.length) {
            filteredArr.forEach((photo) => {
                exec(`${command} https:${photo.url}`)
            })
           return console.log(`Deu bom ${filteredArr}`)
        }
        return console.log('Deu ruim, sem matchs');
      } 
        count++;

    } catch (error) {
      console.error('Erro ao executar a busca por matches:', error);
    }
  };

  execute();

  const intervalId = setInterval(execute, 5000);
};

runMultipleTimes(5);
