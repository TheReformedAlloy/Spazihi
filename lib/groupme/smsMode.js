const {gmRequest} = require('../gmRequest');


/**********************************
*                                 *
*     Functions for SMS Mode:     *
*                                 *
**********************************/

//  Create:
const enableSMSMode = (data, callback) => {
    //POST message
    let options = {
        method: 'POST'
    };

    let body = {
        duration: data.duration,
        registration_id: data.registrationID || null
    };
    
    return gmRequest(`users/sms_mode?token=${process.env.apitoken}`, options, body, callback);
};
//  Delete:
const disableSMSMode = (data, callback) => {
    //POST message
    let options = {
        method: 'POST'
    };

    let body = {};
    
    return gmRequest(`users/sms_mode/delete?token=${process.env.apitoken}`, options, body, callback);
};

module.exports = {
    disableSMSMode,
    enableSMSMode
}