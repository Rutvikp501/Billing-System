const cron = require("node-cron");

exports.startJobs = () => {


    cron.schedule("* * * * *", async () => {
        console.log("This task will run every minute");
    });
    
    cron.schedule("0 * * * *", async () => {
        console.log("This task will run every hour");
    });
    
    cron.schedule("0 0 * * *", async () => {
        console.log("This task will run every day at midnight");
    });
    
    cron.schedule("0 0 * * 0", async () => {
        console.log("This task will run every Sunday at midnight");
    });
    
    cron.schedule("0 0 1 * *", async () => {
        console.log("This task will run on the first day of every month at midnight");
    });
};


exports.specific_times = () => {
// Run at 2 AM
cron.schedule("0 2 * * *", async () => {
    console.log("This task will run at 2 AM");
});

// Run at 2 PM
cron.schedule("20 14 * * *", async () => {
    console.log("This task will run at 2:20 PM");
});

// Run at 3:30 PM
cron.schedule("30 15 * * *", async () => {
    console.log("This task will run at 3:30 PM");
});

};