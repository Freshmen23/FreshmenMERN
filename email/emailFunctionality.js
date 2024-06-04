const nodemailer = require("nodemailer");

function sendEmail(from, to, subject, text){
    const auth = nodemailer.createTransport({
        service : "gmail",
        secure : true,
        port : 465,
        auth : {
            user: "discoverfreshmen@gmail.com",
            pass: "less secure password her"
        }
    });

    const receiver = {
        from : from,
        to : to,
        subject: subject,
        text: text
    }

    auth.sendMail(receiver, (error, emailResponse)=>{
        if (error) throw error;
        console.log(`Success! ${emailResponse}`);
    })
}

module.exports = sendEmail;