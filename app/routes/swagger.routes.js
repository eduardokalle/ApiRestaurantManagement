
//require swagger
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");

module.exports = app => {

    const options = {
        definition: {
        openapi: "3.0.0",
        info: {
            title: "API Base with Swagger",
            version: "0.1.0",
            description:
            "This is a API application base and documented with Swagger",
            license: {
            name: "MIT",
            url: "https://github.com/eduardokalle",
            },
            contact: {
            name: "edocalle",
            url: "https://github.com/eduardokalle",
            email: "eduardokallek@email.com",
            },
            
        },
        servers: [
            {
            url: "http://localhost:8080/api/",
            },
        ],
        },
        apis: [
               "./app/docs/schemaTask.yaml", 
               "./app/docs/getTask.yaml" ,
               "./app/docs/getTaskById.yaml"
        ]
       

        
    };

    const specs = swaggerJsdoc(options);
    app.use(
    "/api-docs-swagger",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
    );

}

