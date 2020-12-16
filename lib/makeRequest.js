require('isomorphic-fetch');

export default makeRequest = (options, body, callback) => {
    try{
        let request = https.request(options, function(res) {
            logger.info(`Making ${options.method} request to ${options.hostname}${options.path}`);
            
            let json = "";
            
            res.on('error', function(err) {
               logger.info("  Error sending request: " + JSON.stringify(err) + "\r\n");
            });
            res.on('timeout', function(err) {
               logger.info("  Timeout sending request: " + JSON.stringify(err) + "\r\n");
            });
            res.on('data', function(chunk){
                json += chunk;
            });
            res.on('end', function() {
                data = {};
                try {
                    data = JSON.parse(json);
                } catch(e) {
                    logger.error(e);
                    data = json;
                }
                if(callback) {
                    callback(data);
                } else {
                    logger.info("Nothing was done with the data");
                }
            });
        });
        
        request.end(JSON.stringify(body));
    } catch(err) {
        logger.error(err);
    }
};