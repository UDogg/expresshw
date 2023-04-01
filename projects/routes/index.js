function index(app) {
    app.get("/", (request, response) => {
        let responseMessage = "Hello, World!";

        response
            .status(200) // HTTP Status Code 200: OK
            .send(responseMessage);
    });
}

module.exports = index;