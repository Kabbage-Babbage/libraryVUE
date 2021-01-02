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
  const response = await fetch(`${apiEndpoint}/images`, {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({ id, check })
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return await response.json();
}
