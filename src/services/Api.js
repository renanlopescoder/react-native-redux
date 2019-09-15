import axios from "axios";

const gwApi = axios.create({
  baseURL: "https://api.guildwars2.com/v2"
});

const getCharacterDetails = async name => {
  const result = await gwApi.get(`/characters/${result.data[0]}`, {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });
  // "gender": "Male",
  // "guild": null,
  // "level": 7,
  // "name": "Dexter Js",
  // "profession": "Mesmer",
  // "race": "Sylvari",
  return result.data;
};

const getCharacters = async apiKey => {
  const result = await gwApi.get("/characters", {
    headers: {
      Authorization: `Bearer ${apiKey}`
    }
  });

  return result.data;
};

export { gwApi, getCharacters };
