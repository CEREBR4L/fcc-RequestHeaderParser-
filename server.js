var express = require("express"),
        app = express();

var si = require("systeminformation");
        
        
app.use('/', express.static('public'));

app.get('/api', function(req, res){
    
    var ip = null,
      lang = null, 
       sys = null; 
    
    si.networkInterfaces(function(data){
        ip = data[1].ip4;
    });
    
    lang = req.headers["accept-language"].split(",");
    lang = lang[0];
    
    sys = req.headers["user-agent"].match(/\((.*?)\)/);
    sys = sys[1];
    
    var toObj = { "ip": ip, "language": lang, "software": sys };
    res.send(JSON.stringify(toObj));
    
});

app.use(function(req, res) {
    res.status(404).end('(404) Opps, seems you have got a little lost! There is nothing here.');
});

app.listen('8080', function(){
  console.log('App now live and running on port 8080!');
});