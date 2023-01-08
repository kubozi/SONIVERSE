import axios from 'axios';

const SONIVERSE_DOMAIN = ''; // on package.json proxy handles the connection to localhost

export async function getIndexSounds(extended = false) {
  const response = await fetch(`${SONIVERSE_DOMAIN}/index`);
  const data = await response.json();
  const slicedData = data.slice(0,10);
  console.log(data);
  if(!extended) return slicedData;
  return data;
}

export async function getSoundDetails(id) {
  console.log('fetching sound details.. with id: ' + id);
  const response = await fetch(`${SONIVERSE_DOMAIN}/sounds/${id}`);

  const sound = await response.json();
  console.log('fetched sound: ' + sound);
  if (!response.ok) {
    throw new Error(sound.message || 'Could not fetch sound.');
  }
  return sound;
}

export async function updateOwner(tokenID, buyerAddress) {
  const updateOwnerArgs = {
      buyerAddress: buyerAddress,
      tokenID: tokenID,
  }
  console.log('update ownership on the db..');
  const updateOwnerResponse = await axios({
    url: `${SONIVERSE_DOMAIN}/update_owner`,
    method: 'post',
    data: updateOwnerArgs
  });
  console.log(updateOwnerResponse);
}

export async function getTokensByOwnerAddress(address) {
  const response = await fetch(`${SONIVERSE_DOMAIN}/address/${address}`);
  const data = await response.json();
  if(!response.ok) {
      throw new Error(data.message || 'failed to fetch user data');
  }
  return data;
}

export async function updateRelistedSound(tokenID, price) {
  const updateRelistedSoundArgs = {
      tokenID: tokenID,
      price: price
  }
  console.log('update relisted sound on the db..' + updateRelistedSoundArgs);
  const updateRelistedSoundResponse = await axios({
    url: `${SONIVERSE_DOMAIN}/update_relisted_sound`,
    method: 'post',
    data: updateRelistedSoundArgs
  });
  console.log(updateRelistedSoundResponse);
}

export async function getUserTestData() {
  const response = await fetch (`${SONIVERSE_DOMAIN}/test`);
  const data = await response.json();
  if(!response.ok) {
      throw new Error(data.message || 'failed to fetch test data');
  }
  return data;
}