import sendgrid from "@sendgrid/mail";

export interface EmailAttachment {
    content: string;
    filename: string;
    type: string;
    disposition: string;
}

const {APP_NAME, SITE_URL, NO_REPLY_EMAIL_ADDRESS = "noreply@email.com", SENDGRID_API_KEY = "SENDGRID_APY_KEY"} = process.env;
sendgrid.setApiKey(SENDGRID_API_KEY);

export const sendEmail = async (from: string = NO_REPLY_EMAIL_ADDRESS, to: string | string[], subject: string, text: string, html?: string, attachments?: EmailAttachment[]) => {
    let message = {
        from,
        to,
        subject,
        text,
        html: html ?? text
    };
    // if there is at least 1 attachment
    if (attachments?.length) {
        Object.assign(message, {attachments});
    }
    if (typeof to === 'string') {
        return await sendgrid.send(message);
    } else if (Array.isArray(to)) {
        return await sendgrid.sendMultiple(message);
    }
};

export const emailPasswordResetLink = async (email: string, hash: string, resetToken: string) => {
    const subject = `${APP_NAME} - Password Reset Link`;
    let content = `<p>Please, use the following link to reset your password:</p>`;
    content += `<br><a href="${SITE_URL}/reset-password/${hash}/${resetToken}" target="_blank"><h2>RESET MY PASSWORD</h2></a>`;
    return await sendEmail(undefined, email, subject, content);
};
