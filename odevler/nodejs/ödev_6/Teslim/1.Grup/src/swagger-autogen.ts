import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: 'TeamTask API',
    description: 'TeamTask API Documentation',
    version: '1.0.0'
  },
  host: 'localhost:5000', 
  schemes: ['http']
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/server.ts'];

swaggerAutogen({
  openapi: '3.0.0',
  autoHeaders: false,
  autoQuery: false,
  autoBody: false // JSDoc'dan okuyacak
})(outputFile, endpointsFiles, doc);