/*******************************
*                              *
*     Functions for Chats:     *
*                              *
*******************************/
//Chats refer to direct message chats.

//  Index:
const getChats = (data, settings, callback) => {
    //GET message
    //settings object must contain hostname, path, and token
    //data object can contain page and per_page
    //  limit must be within 20 to 100
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/chats?token=${settings.token}`
        + (data.page ? `&page=${data.page}` : '')
        + (data.perPage ? `&per_page=${data.perPage}` : ''),
        method: 'GET'
    }
    
    makeRequest(options, null, callback);
};