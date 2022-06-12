const http = require("http");
const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");


const host = '192.168.7.117';
const port = 8000;
/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
const requestListener = function (req, res) {
    //console.log(req.socket.remoteAddress); //we should be using this later to ratelimit
    
    //we will override this if we need to
    res.setHeader("Content-Type","text/html");
    if(req.method == "POST")
        handleAPIPOSTCall(req,res);

    if(req.method != "GET") //idk why anyone would be using any of the other REST types on the server...
        return

    if(req.url.startsWith("/api/"))//if its calling the api
        handleAPIGETCall(req,res)

    if(req.url.startsWith("/v/")) //if its getting a game
        handlepageGETCall(req,res);
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
function handleAPIGETCall(req,res){
    res.setHeader("Content-Type","application/json");
    var v1 = {
        name:"among us",
        isImpostor: true,
        engineVersion:"unity",
    }
    res.writeHead(200);
    res.end(JSON.stringify(v1));
    return;
}

/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
function handleAPIPOSTCall(req,res){
    if(req.url == "/192.168.7.117:8000/api/"){
        console.log(req.body)
        req.on("data",(data)=>{
            theText = data.toString();
            console.log(theText);
        });
        req.on("end",()=>{
            res.end();
        })
    }
}
/**
 * 
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
function handlepageGETCall(req,res){
    var contents = fs.readFileSync("./page.html");
    res.writeHead(200);
    res.end(contents);
}