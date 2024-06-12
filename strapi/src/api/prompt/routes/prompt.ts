/**
 * prompt router
 */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreRouter('api::prompt.prompt');



// ./src/api/prompt/routes/prompt.ts

export default {
  routes: [
    {
      method: 'POST',
      path: '/prompts/generate-image',
      handler: 'api::prompt.prompt.generateImage',
      config: {
        policies: [],
        middlewares: [],
      },
    },
  ],
};

  