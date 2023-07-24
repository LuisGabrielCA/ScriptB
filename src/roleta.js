const axios = require('axios');

async function getUser() {
  try {
    const headers = {
      "accept": "*/*",
      "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
      "content-type": "application/json",
      "sec-ch-ua": "\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"",
      "sec-ch-ua-mobile": "?0",
      "sec-ch-ua-platform": "\"Windows\"",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-message-type": "81",
      "x-pingback": "31bc026378e43d9573cfd24338161c8f",
      "x-use-session-cookie": "1",
      "cookie": "session_cookie_name=session; dnsDisplayed=undefined; ccpaApplies=false; signedLspa=undefined; device_id=6fd68ab3-8ab3-b326-2645-45443397be3b; first_web_visit_id=d39ea40da461afc6e86baed4723d89a284a3e75a; _gcl_au=1.1.1542990448.1689645312; _sp_su=false; _pin_unauth=dWlkPVltRTNZV1U0TlRJdE9EVXdaQzAwTmpkakxXSXhPV1V0TWpObFpHRTNOMll6T1dZdw; ccpaUUID=a25e7c54-41f9-4368-8c06-642e30420c02; _tt_enable_cookie=1; _ttp=z4khDyaE9WigdvxnElbHNsz_P9R; consentUUID=99c1582e-4b18-45ca-a45d-3196e189167a_11_21; buzz_lang_code=en-us; aid=943497944; cpc=%7B%22c%22%3A0%2C%22e%22%3A1692252829627%2C%22u%3A%22zAhMACTk0MzQ5Nzk0NAAgHz_NyboI9OQ10bI-wtgxmANOC-3_vOulVZBK-wXazlE%22%7D; trcksesh=c8f26334-8769-461d-b147-11e5948a604b; cookie_banner_closed=true; last_referred_web_visit_id=2089f77bb1a674d98f0c103d6404fc1525b15688; _gid=GA1.2.1725913049.1689998708; _gat=1; _derived_epik=dj0yJnU9cVdENnhpMWRWd3VGWGlNMC13WGppU0tpRHp5bjY4a3gmbj1xaDhYa3ZEMjRIWW9BenBCdUppQVhRJm09MSZ0PUFBQUFBR1M3VlhRJnJtPTEmcnQ9QUFBQUFHUzdWWFEmc3A9NQ; HDR-X-User-id=zAhMACTk0MzQ5Nzk0NAAgHz_NyboI9OQ10bI-wtgxmANOC-3_vOulVZBK-wXazlE; has_secure_session=1; _ga=GA1.1.1867051403.1689645312; _ga_NSEKRQF5TF=GS1.1.1689998702.13.1.1689998753.9.0.0; session=s2:7:lAwXiVye0UOHXY1BWksyfZWhx8e3nmhgtStg32Bb",
      "Referer": "https://bumble.com/app",
      "Referrer-Policy": "origin-when-cross-origin"
    }

    const data = {
      "$gpb": "badoo.bma.BadooMessage",
      "body": [
        {
          "message_type": 81,
          "server_get_encounters": {
            "number": 10,
            "context": 1,
            "user_field_filter": {
              "projection": [210, 370, 200, 230, 490, 540, 530, 560, 291, 732, 890, 930, 662, 570, 380, 493, 1140, 1150, 1160, 1161],
              "request_albums": [
                { "album_type": 7 },
                { "album_type": 12, "external_provider": 12, "count": 8 }
              ],
              "game_mode": 0,
              "request_music_services": {
                "top_artists_limit": 8,
                "supported_services": [29],
                "preview_image_size": { "width": 120, "height": 120 }
              }
            }
          }
        }
      ],
      "message_id": 7,
      "message_type": 81,
      "version": 1,
      "is_background": false
    }

    const response = await axios.post("https://bumble.com/mwebapi.phtml?SERVER_GET_ENCOUNTERS", data, { headers });

    const { results } = response.data.body[0].client_encounters;

    const photosIdsEncounter = results.flatMap(result => result.user.albums[0].photos.map(photo => photo.id.replace(/-\d+$/, '')));

    return { results, photosIdsEncounter }

  } catch (error) {
    console.error('Error:', error);
  }
}

getUser()


module.exports = { getUser };
