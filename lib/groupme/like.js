const {gmRequest} = require('../gmRequest');

/*******************************
*                              *
*     Functions for Likes:     *
*                              *
*******************************/

//  Create:
const addLike = (conversationID, messageID, data, callback) => {
    //POST message
    let options = {
        method: 'POST'
    };

    let body = {};
    
    return gmRequest(`messages/${conversationID}/${messageID}/like?token=${process.env.apitoken}`, options, body, callback);
};
//  Destroy:
const removeLike = (conversationID, messageID, data, callback) => {
    //POST message
    let options = {
        method: 'POST'
    };

    let body = {};
    
    return gmRequest(`messages/${conversationID}/${messageID}/unlike?token=${process.env.apitoken}`, options, body, callback);
};

module.exports = {
    addLike,
    removeLike
}