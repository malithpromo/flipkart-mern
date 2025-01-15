const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Create the transporter using SMTP
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,       // E.g., 'smtp.gmail.com'
        port: process.env.SMTP_PORT,       // E.g., 587 (TLS) or 465 (SSL)
        secure: process.env.SMTP_PORT === "465", // Use true for port 465, false for others
        auth: {
            user: process.env.SMTP_MAIL,    // Your email address
            pass: process.env.SMTP_PASSWORD // Your email password or app-specific password
        },
    });

    // Define the email options
    const mailOptions = {
        from: process.env.SMTP_MAIL,        // Sender email
        to: options.email,                  // Recipient email
        subject: options.subject,           // Email subject
        html: options.message,              // HTML message body
    };

    try {
        // Send the email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw new Error('Email not sent');
    }
};

module.exports = sendEmail;
