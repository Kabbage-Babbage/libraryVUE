const apiEndpoint = 'http://localhost:3000';

export async function getCaptcha() {
  const response = await fetch(apiEndpoint);

  if (!response.ok) {
    throw new Error('something went wrong..');
  }

  // type assertion to ImageRequest
  const { id, image } = await response.json();

  return {
    id,
    image: `data:image/png;base64,${image}`
  };
}

export async function submitCaptcha(id, check) {
  const url = new URL(`${apiEndpoint}/images`);
  const params = {
    id,
    check
  };

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  const response = await fetch(url.toString(), {
    method: 'POST'
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return await response.json();
}
