/**********************************
*                                 *
*     Functions for Messages:     *
*                                 *
**********************************/

//  Index:
const getMessages = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object must contain groupID
    //  data object can contain before_id, since_id, after_id, and limit
    //      limit must be within 20 to 100
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/messages?token=${settings.token}` + (data.beforeID ? `&before_id=${data.beforeID}` : '')
        + (data.sinceID ?  `&since_id=${data.sinceID}`   : '')
        + (data.afterID ?  `&after_id=${data.afterID}`   : '')
        + (data.limit ?  `&limit=${data.limit}`          : ''),
        method: 'GET'
    }
    
    makeRequest(options, null, callback);
};
//  Create:
const sendGroupMessage = (data, settings, callback) => {
    //POST message
    //settings object must contain hostname, path, and token
    //data object must contain groupID, source_guid, and text or attachments
    //  sourceGUID can be botID
    //  text required unless at least one attachment included
    //  attachments not required, polymorphic array
    
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/groups/${data.groupID}/messages?token=${settings.token}`,
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
    
    makeRequest(options, body, callback);
};