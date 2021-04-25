const http = require('http');
const app = require('./app');

const port = process.env.PORT || 8000;

console.log(port)

const server = http.createServer(app);
/*server = http.createServer(function (req, res)
{
    var ip = req.ip || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    // exit if it's a particular ip
    console.log("FOUNF IP",ip)
    Hacked.findOne({ ip: ip }).then(test=>{
        console.log("FOUNF test",test)
        if(test!==null){
            res.end();
        }
        else{
            server = http.createServer(app);
        }
    })
        
})*/

server.listen(port);
