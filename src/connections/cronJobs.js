const cron = require('node-cron');
const messageService = require("../services/message")

cron.schedule('* * * * *', async () => {
    const pendingMessages = await messageService.getAllMessages({status: "pending"})
    pendingMessages.forEach(message => {
        console.log("Sending out this message", message._id)
    })
});

