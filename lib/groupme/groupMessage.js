const {gmRequest} = require('../gmRequest');


/**********************************
*                                 *
*     Functions for Messages:     *
*                                 *
**********************************/

//  Index:
const getMessages = (groupID, query, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain groupID
    //  data object can contain before_id, since_id, after_id, and limit
    //      limit must be within 20 to 100
    let options = {
        method: 'GET'
    }
    
    return gmRequest(`groups/${groupID}/messages?${new URLSearchParams({token: Process.env.apiToken, ...query})}`, options, null, callback);
};
//  Create:
const sendGroupMessage = (data,callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID, source_guid, and text or attachments
    //  sourceGUID can be botID
    //  text required unless at least one attachment included
    //  attachments not required, polymorphic array
    
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let body = {
        message: {
            source_guid: `${randGUID++}`,
            text: data.text,
            attachments: data.attachments || []
        }
    };
    
    return gmRequest(`groups/${groupID}/messages?token=${process.env.apitoken}`, options, body, callback);
};

module.exports = {
    getMessages,
    sendGroupMessage
}