'use strict';

import axios from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import { Strapi } from '@strapi/strapi';

// Assuming you have some way to get the Strapi instance
declare const strapi: Strapi;

module.exports = {
  async afterCreate(event: { result: { prompt: string, id: number } }) {
    const { result } = event;

    try {
      // Send POST request to Flask backend
      const response = await axios.post('http://127.0.0.1:3030/getai', {
        prompt: result.prompt,
      });

      if (response.data.error) {
        console.error('Error from Flask backend:', response.data.error);
        return;
      }

      const imageUrl: string = response.data.image_url;

      // Download the image
      const imageResponse = await axios.get(imageUrl, { responseType: 'stream' });
      const imageFileName = path.basename(imageUrl);
      const uploadDir = path.join(__dirname, '..../public/uploads'); // Adjust the path to match your Strapi project structure

      // Ensure the upload directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const imagePath = path.join(uploadDir, imageFileName);

      // Save the image to the upload directory
      const writer = fs.createWriteStream(imagePath);
      imageResponse.data.pipe(writer);

      // Wait for the download to complete
      await new Promise<void>((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
      });

      // Upload the image to Strapi's media library
      const formData = new FormData();
      formData.append('files', fs.createReadStream(imagePath), imageFileName);
      const uploadResponse = await axios.post('http://127.0.0.1:1337/api/upload', formData, {
        headers: formData.getHeaders(),
      });

      if (uploadResponse.data.length > 0) {
        const imageId: number = uploadResponse.data[0].id;

        // Update the prompt entry with the uploaded image
        await strapi.entityService.update('api::prompt.prompt', result.id, {
          data: { generatedImage: imageId },
        });

        // Clean up the temporary file
        fs.unlinkSync(imagePath);
      }
    } catch (error) {
      console.error('Error processing image:', error);
    }
  },
};
