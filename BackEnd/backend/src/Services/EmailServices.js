const nodemailer = require('nodemailer');

const emailConfig = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'javisiubd@gmail.com',
        pass: ''
    }
});

const sendEmail = async (to) => {
    try {
        const mailOption = {
            from: 'javisiubd@gmail.com',
            to: to,
            subjet: 'Gracias por suscribirte',
            html: '<h1> Gracias por tu suscripción </h1>'
        }
        await emailConfig.sendMail(mailOption)
    } catch (error) {
        console.log('No te has podido registrar')
    }
};

module.exports = sendEmail;