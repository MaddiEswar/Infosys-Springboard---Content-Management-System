/**
 * prompt controller
 */

// import { factories } from '@strapi/strapi'

// export default factories.createCoreController('api::prompt.prompt');




// import { Context } from 'koa';
// import generateImage from '../services/imageGenerator';

// const create = async (ctx: Context) => {
//   const { prompt } = ctx.request.body;

//   if (!prompt) {
//     return ctx.badRequest('Prompt is required');
//   }

//   try {
//     const imageUrl = await generateImage(prompt);

//     const newPrompt = await strapi.entityService.create('api::prompt.prompt', {
//       data: { prompt, generatedImage: imageUrl },
//     });

//     ctx.send(newPrompt);
//   } catch (error) {
//     ctx.throw(500, 'Failed to generate image');
//   }
// };

// export default { create };



// ./src/api/image-request/controllers/image-request.ts

import { factories } from '@strapi/strapi';
import { Context } from 'koa';
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const promptController = factories.createCoreController('api::prompt.prompt', ({ strapi }) => ({
  async generateImage(ctx: Context) {
    const { prompt } = ctx.request.body;

    if (!prompt) {
      ctx.badRequest('Prompt input is required');
      return;
    }

    try {
      const response = await axios.post(
        'https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2',
        { inputs: prompt },
        {
          headers: {
            Authorization: `Bearer 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`,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        }
      );

      if (response.status !== 200) {
        
        ctx.throw(response.status, `Error generating image: ${response.data}`);
      }

      // The response should contain the blob data
      const imageBuffer = Buffer.from(response.data, 'binary');

      // Define the path to save the image
      const uploadDir = path.join(__dirname, '../../../public/uploads');
      const imageName = `${uuidv4()}.png`;
      const imagePath = path.join(uploadDir, imageName);

      // Ensure the upload directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Save the image to the uploads directory
      fs.writeFileSync(imagePath, imageBuffer);

      // Register the image in Strapi's media library
      const uploadedImage = await strapi.plugin('upload').service('upload').upload({
        data: {
          fileInfo: {
            name: imageName,
            alternativeText: prompt,
            caption: prompt,
          },
        },
        files: {
          path: imagePath,
          name: imageName,
          type: 'image/png',
        },
      });

      // Save the image request with generated image URL in Strapi
      const newImageRequest = await strapi.service('api::prompt.prompt').create({
        data: {
          prompt,
          imageUrl: uploadedImage[0].url,
        },
      });

      ctx.send(newImageRequest);
    } catch (error) {
      if (error.response) {
        // Server responded with a status code different from 2xx
        console.error('Error response:', error.response.data);
        ctx.send({ error: `Request failed with status code ${error.response.status}: ${error.response.data}` });
      } else if (error.request) {
        // Request was made but no response received
        console.error('Error request:', error.request);
        ctx.send({ error: 'No response received from the server' });
      } else {
        // Something else happened in making the request
        console.error('Error message:', error.message);
        ctx.send({ error: `Request failed: ${error.message}` });
      }
    }
  },
}));

export default promptController;
