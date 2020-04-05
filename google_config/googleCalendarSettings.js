// Sample CalendarAPI settings
const SERVICE_ACCT_ID = 'ssd-service-account@ship-supplies-direct.iam.gserviceaccount.com';
const TIMEZONE = 'UTC+08:00';
const CALENDAR_ID = {
    'primary': 'service@fleetshare.ai'
};

module.exports.serviceAcctId = SERVICE_ACCT_ID;
module.exports.timezone = TIMEZONE;
module.exports.calendarId = CALENDAR_ID;

// Example for using json keys
const key = require('./ship-supplies-direct-27003520f646.json').private_key;
module.exports.key = key;