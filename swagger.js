const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./routes/*.js'] // Your route files path

const doc = {
  info: {
    version: "1.0.0",
      title: "Warhammer Crusade API",
      description: "API For creating and managing armies under the Warhammer 40,000 Table Top Wargaming Narrative Game Play"
  },
  host:"https://cse341-warhammer-crusade-api.onrender.com",// API host URL
  basePath: "/",
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [ // Your tags definition
    {name: 'Crusade', description: 'API for Nathan S. Hoskins Coursework'}
  ],
  securityDefinitions: { // Your security definitions
    JWT: {
      type: 'none',
      in: 'none',
      name: 'none',
      description: "",
    }
  }
}

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  require('./routes/index') 
})