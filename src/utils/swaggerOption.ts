const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "UKS Moklet - Backend",
      version: "1.0.0",
      description: "API for UKS Moklet Application",
      contact: {
        name: "Kusindra Aji Rabbany",
        url: "https://benspace.xyz",
        email: "me@benspace.xyz",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/routes/*.ts"],
};

export default options;
