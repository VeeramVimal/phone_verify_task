const app = require("./app");
const config = require("./config/config");
const PORT = config.PORT || 8000;

app.get("/", (req, res) => {
    res.send("check ruote")
})
let Server;

 Server = app.listen(PORT, function(){
    try {
        console.log("server is connecting on: ", PORT);
    } catch (error) {
        console.error("Something is wrong err: ", error);
        
    }
});

