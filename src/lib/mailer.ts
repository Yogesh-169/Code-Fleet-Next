import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST as string;
const port = Number(process.env.SMTP_PORT || 465);
const secure = String(process.env.SMTP_SECURE || 'true') === 'true';
const user = process.env.SMTP_USER as string;
const pass = process.env.SMTP_PASS as string;

if (!host || !user || !pass) {
  throw new Error('SMTP configuration is incomplete');
}

export const transporter = nodemailer.createTransport({
  host,
  port,
  secure,
  auth: { user, pass },
});

export async function sendEmail(options: { to: string; subject: string; html: string }) {
  return transporter.sendMail({ from: `CodFleet <${user}>`, ...options });
}


