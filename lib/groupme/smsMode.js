/**********************************
*                                 *
*     Functions for SMS Mode:     *
*                                 *
**********************************/

//  Create:
const enableSMSMode = (data, settings, callback) => {
    //POST message
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/users/sms_mode?token=${settings.token}`,
        method: 'POST'
    };

    let body = {
        duration: data.duration,
        registration_id: data.registrationID || null
    };
    
    makeRequest(options, body, callback);
};
//  Delete:
const disableSMSMode = (data, settings, callback) => {
    //POST message
    let options = {
        hostname: settings.hostname,
        path: `${settings.path}/users/sms_mode/delete?token=${settings.token}`,
        method: 'POST'
    };

    let body = {};
    
    makeRequest(options, body, callback);
};