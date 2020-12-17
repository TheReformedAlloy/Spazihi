require('isomorphic-fetch');

exports.gmRequest = async (path, options, body, callback) => {
    fetch(`https://api.groupme.com/v3/${path}`, options, body)
        .then(response => response.json())
        .then(data => {
            if(callback) {
                callback(data);
            } else {
                console.log("Nothing was done with the response.");
            }
        })
        .catch(error => {
            console.error('Error: ', error);
        });
};