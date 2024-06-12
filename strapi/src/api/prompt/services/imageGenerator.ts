
import axios from 'axios';

const generateImage = async (prompt: string): Promise<string> => {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
      { inputs: prompt },
      { headers: { Authorization: `Bearer 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` } }
    );

    // Assuming the API returns an array of generated images
    if (response.data && response.data.length > 0) {
      return response.data[0].url;
    } else {
      throw new Error('No image URL returned');
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw new Error('Failed to generate image');
  }
};

export default generateImage;
