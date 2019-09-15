import { gwApi, getApiKey } from "../../api/Api";
import { AsyncStorage } from "react-native";

// 0EB8DD11-12DF-0243-BF20-5C72D57703727A773859-6FC8-4785-BCA2-CDD7B77003F6

const fetchCharacters = characters => ({
  type: "FETCH_CHARACTERS",
  payload: characters
});

const fetchCharacterDetails = details => ({
  type: "FETCH_CHARACTER_DETAILS",
  payload: details
});

const sentFetchCharacterDetails = () => ({
  type: "SENT_FETCH_CHARACTER_DETAILS"
});

export const getCharacters = () => async dispatch => {
  try {
    const key = await getApiKey();
    const result = await gwApi.get("/characters", {
      headers: {
        Authorization: `Bearer ${key}`
      }
    });
    dispatch(fetchCharacters(result.data));
  } catch (error) {}
};

export const getCharacterDetails = characterName => async dispatch => {
  dispatch(sentFetchCharacterDetails());
  try {
    const key = await getApiKey();
    const result = await gwApi.get(`/characters/${characterName}`, {
      headers: {
        Authorization: `Bearer ${key}`
      }
    });
    dispatch(fetchCharacterDetails(result.data));
  } catch (error) {}
};
