
function portfolio(app) {
    app.get("/portfolio", (request, response) => {
        let responseMessage = "<h1>This is UC's portfolio page</h1>";
        
        
        response
            .status(200)
            .sendFile(path.join(_dirname, "project/portfolio.html"))
            // HTTP Status Code 418: Display portfolio
            //.send(responseMessage);
    
    });

}
module.exports = portfolio;