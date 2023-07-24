const axios = require('axios');

async function getMatch() {
  try {
    const headers = {
      'accept': '*/*',
      'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
      'content-type': 'application/json',
      'sec-ch-ua': '\"Not.A/Brand\";v=\"8\", \"Chromium\";v=\"114\", \"Google Chrome\";v=\"114\"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '\"Windows\"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-origin',
      'x-message-type': '245',
      'x-pingback': 'f40a0c3e6bb843e71a554587010d48d7',
      'x-use-session-cookie': '1',
      'cookie': 'session_cookie_name=session; dnsDisplayed=undefined; ccpaApplies=false; signedLspa=undefined; device_id=6fd68ab3-8ab3-b326-2645-45443397be3b; first_web_visit_id=d39ea40da461afc6e86baed4723d89a284a3e75a; _gcl_au=1.1.1542990448.1689645312; _sp_su=false; _pin_unauth=dWlkPVltRTNZV1U0TlRJdE9EVXdaQzAwTmpkakxXSXhPV1V0TWpObFpHRTNOMll6T1dZdw; ccpaUUID=a25e7c54-41f9-4368-8c06-642e30420c02; _tt_enable_cookie=1; _ttp=z4khDyaE9WigdvxnElbHNsz_P9R; consentUUID=99c1582e-4b18-45ca-a45d-3196e189167a_11_21; buzz_lang_code=en-us; aid=943497944; cpc=%7B%22c%22%3A0%2C%22e%22%3A1692252829627%2C%22u%22%3A%22zAhMACTk0MzQ5Nzk0NAAgHz_NyboI9OQ10bI-wtgxmANOC-3_vOulVZBK-wXazlE%22%7D; trcksesh=c8f26334-8769-461d-b147-11e5948a604b; cookie_banner_closed=true; last_referred_web_visit_id=2089f77bb1a674d98f0c103d6404fc1525b15688; _gid=GA1.2.1725913049.1689998708; _derived_epik=dj0yJnU9cVdENnhpMWRWd3VGWGlNMC13WGppU0tpRHp5bjY4a3gmbj1xaDhYa3ZEMjRIWW9BenBCdUppQVhRJm09MSZ0PUFBQUFBR1M3VlhRJnJtPTEmcnQ9QUFBQUFHUzdWWFEmc3A9NQ; HDR-X-User-id=zAhMACTk0MzQ5Nzk0NAAgHz_NyboI9OQ10bI-wtgxmANOC-3_vOulVZBK-wXazlE; has_secure_session=1; _ga=GA1.1.1867051403.1689645312; session=s2:7:lAwXiVye0UOHXY1BWksyfZWhx8e3nmhgtStg32Bb; _ga_NSEKRQF5TF=GS1.1.1689998702.13.1.1689999415.60.0.0',
      'Referer': 'https://bumble.com/app/beeline',
      'Referrer-Policy': 'origin-when-cross-origin'
    };

    const data = {
      "$gpb": "badoo.bma.BadooMessage",
      "body": [{
        "message_type": 245,
        "server_get_user_list": {
          "filter": [8],
          "filter_match_mode": [0],
          "folder_id": 6,
          "user_field_filter": {
            "projection": [210, 662, 670, 200, 890, 230, 490, 340, 291, 763]
          },
          "preferred_count": 21
        }
      }],
      "message_id": 14,
      "message_type": 245,
      "version": 1,
      "is_background": false
    };

    const matchs = await axios.post("https://bumble.com/mwebapi.phtml?SERVER_GET_USER_LIST", data, { headers });

    const { users: userMatch } = matchs.data.body[0].client_user_list.section[0];
    const photoIdsMatch = userMatch.map(user => user.profile_photo.id);

   return { photoIdsMatch };

  } catch (error) {
    console.error('Error:', error);
  }
}

getMatch();

module.exports = { getMatch };
