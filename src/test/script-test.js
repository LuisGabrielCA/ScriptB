const { getUser } = require('../../roleta');
const { getMatch } = require('../../matchs');
const { exec } = require('child_process');

const findMatch = async () => {
  const { results, photosIdsEncounter } = await getUser();
  const { photoIdsMatch } = await getMatch();
  const matchFoundId = photosIdsEncounter.filter((element) => photoIdsMatch.includes(element));

  this.arrUsers = [];

  if (matchFoundId.length) {
    matchFoundId.forEach(async (photoMatch) => {
      const find = results.find(
        ({ user }) => user.albums[0].photos.some((photo) => photo.id.replace(/-\d+$/, '') === photoMatch)
      );

      if (find) {
        
        const url = find.user.albums[0].photos[0].large_url;

        this.arrUsers.push({ nome: find.user.name, url })

        // console.log('MATCH FOUND', { nome: find.user.name, url });

        /* const command = 'start chrome';
        exec(`${command} https:${url}`); */
      }
    });
  } 
  const filteredArr = [...new Set(this.arrUsers)];

  return filteredArr;

};

const runMultipleTimes = async (totalTimes) => {
  let count = 0;

  const execute = async () => {
     const { filteredArr } = await findMatch();

    if (count === totalTimes) {
      console.log(`Execução encerrada após ${count} vezes.`);
      clearInterval(intervalId);
      return console.log(filteredArr);
    } else {
      count++;
    }
  };

  execute();

  const intervalId = setInterval(execute, 5000);

};

runMultipleTimes(5);
