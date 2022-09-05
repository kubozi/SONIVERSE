const SONIVERSE_DOMAIN = ''; // on package.json proxy handles the connection to localhost

export async function getUserTestData() {

  const response = await fetch (`${SONIVERSE_DOMAIN}/test`);
  const data = await response.json();
  if(!response.ok) {
      throw new Error(data.message || 'failed to fetch test data');
  }

  return data;
}