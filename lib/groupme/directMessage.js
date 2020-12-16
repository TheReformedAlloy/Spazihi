/*****************************************
*                                        *
*     Functions for Direct Messages:     *
*                                        *
*****************************************/

//  Index:
const getDirectMessages = (data, settings, callback) => {
    //GET message
    //TODO fix this and all functions with optional parameters. Perhaps change all parameters to be separate variables in the options object.
    //settings object must contain hostname, path, and token
    //data object can contain before_id or since_id
    
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/direct_messages?token=${settings.token}&other_user_id=${data.otherUserID}`
        + (data.beforeID ? `&before_id=${data.beforeID}` : '')
        + (data.sinceID ? `&since_id=${data.sinceID}`  : ''),
        method: 'GET'
    }
    
    makeRequest(options, null, callback);
};
//  Create:
const sendDirectMessage = (data, settings, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID, source_guid, and text or attachments
    //  sourceGUID can be botID
    //  text required unless at least one attachment included
    //  attachments not required, polymorphic array
    
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/direct_messages?token=${settings.token}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }

    let body = {
        "direct_message": {
            "source_guid": randGUID++,
            "text": data.text,
            "recipient_id": data.recipientID,
            "attachments": data.attachments || null
        }
    };
    
    makeRequest(options, body, callback);
};