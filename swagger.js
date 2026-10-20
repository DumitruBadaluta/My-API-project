const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "User API",
      version: "1.0.0",
      description: "Sample Node.js API with Swagger"
    },
    servers: [
      {
        url: "http://localhost:3000"
      }
    ]
  },
  apis: ["./routes/*.js"]
};

module.exports = swaggerJsdoc(options);