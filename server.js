const http = require("http");
const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require("url");


const host = '192.168.7.159';
const port = 8000;

const requestListener = function (req, res) {
    res.setHeader("Content-Type","text/html");

    if(req.method == "GET"){
        console.log(req.url);
        if(req.url.startsWith("/api/")){
            res.setHeader("Content-Type","application/json");
            var v1 = {
                name:"among us",
                isImpostor: true,
                engineVersion:"unity",
            }
            res.writeHead(200);
            res.end("BALLS");
            return;
        }
        if(req.url.startsWith("/v")){
            var contents = fs.readFileSync("./page.html");
            res.writeHead(200);
            res.end(contents);
        }
        //res.writeHead(200);
    }
    else if(req.method == "POST"){
        if(req.url == "/192.168.7.159:8000/api/"){
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
    else{
        res.end("no bitches?");
    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

