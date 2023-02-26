import axios from 'axios';

export const runModel = async (imageFile) => {
  const version = '660d922d33153019e8c263a3bba265de882e7f4f70396546b6c9c8f9d47a021a';
  const imageData = imageFile.split(',')[1];

  const data = {
    version,
    input: {
      image: imageData,
    },
  };

  const apiUrl = 'https://api.swinir.com/rest?api_key=YOUR_API_KEY&model=swinir&scale=2&format=png';
  const apiToken = process.env.SWINIR_API_TOKEN;

  const headers = {
    'Authorization': `Token ${apiToken}`,
    'Content-Type': 'application/json',
  };

  const response = await axios.post(apiUrl, data, { headers });

  return response.data;
};
