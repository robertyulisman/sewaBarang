const CONFIG = require('../google_config/googleCalendarSettings');
const CalendarAPI = require('node-google-calendar');
let cal = new CalendarAPI(CONFIG);
const calendarId = "service@fleetshare.ai";

module.exports = {
    updateJobCalendarDetails: async(job) => {
        let startDateTime, endDateTime;
        if (job.vesselLoadingLocation === 'PSA') {
            if (job.psaBerthingDateTime !== "" && job.psaUnberthingDateTime !== "") {
                startDateTime = job.psaBerthingDateTime;
                endDateTime = job.psaUnberthingDateTime;
            } else if (job.vesselLoadingDateTime !== "") {
                startDateTime = job.vesselLoadingDateTime;
                endDateTime = job.vesselLoadingDateTime;
            }
        } else if (job.vesselLoadingLocation === 'Jurong Port') {
            if (job.vesselLighterDateTime !== "") {
                startDateTime = job.vesselLighterDateTime;
                endDateTime = job.vesselLighterDateTime;
            } else if (job.vesselLoadingDateTime !== "") {
                startDateTime = job.vesselLoadingDateTime;
                endDateTime = job.vesselLoadingDateTime;
            }
        } else {
            if (job.vesselLoadingDateTime !== "") {
                startDateTime = job.vesselLoadingDateTime;
                endDateTime = job.vesselLoadingDateTime;
            }
        }

        let itemString = job.jobItems.length > 0? `${job.jobItems[0].quantity} ${job.jobItems[0].uom}`: '';
        for(let i = 1; i < job.jobItems.length; i++) {
            const jobItem = job.jobItems[i];
            itemString += `, ${jobItem.quantity} ${jobItem.uom}`
        }

        let offlandItemString = job.jobOfflandItems && job.jobOfflandItems.length > 0? `${job.jobOfflandItems[0].quantity} ${job.jobOfflandItems[0].uom}`: '';
        if(job.jobOfflandItems) {
            for(let i = 1; i < job.jobOfflandItems.length; i++) {
                const jobOfflandItem = job.jobOfflandItems[i];
                offlandItemString += `, ${jobOfflandItem.quantity} ${jobOfflandItem.uom}`
            }
        }

        const description = `Company: ${job.user.companyName}\n\nItems to Deliver: ${itemString}${job.jobOfflandItems && job.jobOfflandItems.length > 0? `\n\nItems to Offland: ${offlandItemString}`: ''}${job.vesselLoadingLocation === "Jurong Port"? `\n\nLighter Name: ${job.vesselLighterName}\nLighter Date and Time: ${moment(job.vesselLighterDateTime).tz("Asia/Singapore").format('MMMM Do YYYY, h:mm:ss a')}\nLighter Location: ${job.vesselLighterLocation}`: ''}${job.remarks !== ""? `\n\nRemarks: ${job.remarks}`: ''}`;

        const event = {
            'start': {
                'dateTime': startDateTime,
                'timeZone': 'Asia/Singapore'
            },
            'end': {
                'dateTime': endDateTime,
                'timeZone': 'Asia/Singapore'
            },
            'location': job.vesselLoadingLocation,
            'summary': `${job.vessel.vesselName}`,
            'description': description
        };

        const optionalQueryParams = {
            sendNotifications: true
        };

        // Update google calendar event if exists, or else create one
        if(job.googleCalendarId !== undefined && job.googleCalendarId !== "") {
            return await cal.Events.update(calendarId, job.googleCalendarId, event, optionalQueryParams);
        } else {
            return await cal.Events.insert(calendarId, event, optionalQueryParams);
        }


    },
    getJobCalendarDetails: async(job) => {
        return await cal.Events.get(calendarId, job.googleCalendarId, {
            timeZone: 'Asia/Singapore'
        });
    }
};