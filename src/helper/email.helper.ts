import fs from 'fs';
import nodemailer from 'nodemailer';
import path from 'path';
let emailConfig = null;

// Initialize the email configuration.
emailConfig = {
    host: global.config.SMTP_CONFIG && global.config.SMTP_CONFIG.host ? global.config.SMTP_CONFIG.host : 'localhost',
    port: global.config.SMTP_CONFIG && global.config.SMTP_CONFIG.port ? global.config.SMTP_CONFIG.port : 25,
    //secure: global.config.SMTP_CONFIG && global.config.SMTP_CONFIG?.secure ? global.config.SMTP_CONFIG.secure : false,
    auth: {
        user: global.config.SMTP_CONFIG && global.config.SMTP_CONFIG.username ? global.config.SMTP_CONFIG.username : null,
        pass: global.config.SMTP_CONFIG && global.config.SMTP_CONFIG.password ? global.config.SMTP_CONFIG.password : null,
    }
};

/**
 * Send an email using the configured email settings.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} message - HTML content for the email message.
 * @returns {Promise<void>} A Promise that resolves when the email is sent successfully.
 */
function sendEmail(to: any, subject: string, message: any) {
    return new Promise<void>((resolve, reject) => {
        let transporter = null;

        if (global.config.SMTP == true) {
            if (!emailConfig) {
                return Promise.reject(new Error('Email configuration is not initialized. update the config file to set up the email configuration.'));
            }
            // Create a Nodemailer transporter with the provided email configuration
            transporter = nodemailer.createTransport(emailConfig);
        }
        else {
            transporter = nodemailer.createTransport({
                sendmail: true,
                newline: 'unix',
                path: '/usr/sbin/sendmail'
            })
        }
        // Email data with HTML message
        const mailOptions = {
            from: global.global.config.SMTP_CONFIG && global.global.config.SMTP_CONFIG.username ? global.global.config.SMTP_CONFIG.username : 'noreply@example.com',
            to: to,
            subject: subject,
            html: message
        };

        // Send the email
        transporter.sendMail(mailOptions, (error: any, info: { response: any; }) => {
            if (error) {
                console.error('Email could not be sent:', error);
                reject(error);
            } else {
                console.log('Email sent:', info.response);
                resolve();
            }
        });
    });
}

export {
    sendEmail,
};
