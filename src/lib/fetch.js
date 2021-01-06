const apiEndpoint = 'http://ec2-100-26-246-133.compute-1.amazonaws.com:5000';

export async function getCaptcha() {
  const response = await fetch(`${apiEndpoint}/retrieve-image`);

  if (!response.ok) {
    throw new Error('something went wrong..');
  }

  // type assertion to ImageRequest
  const { id, imageString } = await response.json();

  return {
    id: id.S,
    image: `data:image/png;base64,${imageString.S.slice(2, -1)}`
  };
}

export async function submitCaptcha(id, check) {
  const url = new URL(`${apiEndpoint}/check-answer`);
  const params = {
    id,
    answer: check
  };

  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

  const response = await fetch(url.toString(), {
    method: 'POST'
  });

  if (!response.ok) {
    throw new Error(response.status.toString());
  }

  return await response.statusText;
}
