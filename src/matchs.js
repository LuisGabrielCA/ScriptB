const axios = require('axios');

async function getMatch() {
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
      "x-message-type": "245",
      "x-pingback": "f18cd9543a05666eb8e1b7185accfa68",
      "x-use-session-cookie": "1",
      "cookie": "session_cookie_name=session; dnsDisplayed=undefined; ccpaApplies=false; signedLspa=undefined; device_id=6fd68ab3-8ab3-b326-2645-45443397be3b; first_web_visit_id=d39ea40da461afc6e86baed4723d89a284a3e75a; _gcl_au=1.1.1542990448.1689645312; _sp_su=false; _pin_unauth=dWlkPVltRTNZV1U0TlRJdE9EVXdaQzAwTmpkakxXSXhPV1V0TWpObFpHRTNOMll6T1dZdw; ccpaUUID=a25e7c54-41f9-4368-8c06-642e30420c02; _tt_enable_cookie=1; _ttp=z4khDyaE9WigdvxnElbHNsz_P9R; consentUUID=99c1582e-4b18-45ca-a45d-3196e189167a_11_21; buzz_lang_code=en-us; aid=943497944; cpc=%7B%22c%22%3A0%2C%22e%22%3A1692252829627%2C%22u%22%3A%22zAhMACTk0MzQ5Nzk0NAAgHz_NyboI9OQ10bI-wtgxmANOC-3_vOulVZBK-wXazlE%22%7D; last_referred_web_visit_id=2089f77bb1a674d98f0c103d6404fc1525b15688; _derived_epik=dj0yJnU9cVdENnhpMWRWd3VGWGlNMC13WGppU0tpRHp5bjY4a3gmbj1xaDhYa3ZEMjRIWW9BenBCdUppQVhRJm09MSZ0PUFBQUFBR1M3VlhRJnJtPTEmcnQ9QUFBQUFHUzdWWFEmc3A9NQ; _ga=GA1.1.1867051403.1689645312; has_secure_session=1; trcksesh=db6e50e9-b651-4c12-8195-e2b47b9384a8; HDR-X-User-id=zAhMACTk0MzQ5Nzk0NAAgHz_NyboI9OQ10bI-wtgxmANOC-3_vOulVZBK-wXazlE; cookie_banner_closed=true; session=s2:7:HVpEovbIhaPVm9hgcwfKyU4tym3yuoPPQetpneke; _ga_NSEKRQF5TF=GS1.1.1690417538.18.1.1690418461.59.0.0",
      "Referer": "https://bumble.com/app/beeline",
      "Referrer-Policy": "origin-when-cross-origin"
    };

    const data = {
      "$gpb": "badoo.bma.BadooMessage",
      "body": [
        {
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
        }
      ],
      "message_id": 6,
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
