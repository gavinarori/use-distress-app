import { Resend } from 'resend';
import WelcomeEmail from '@/emails/welcome-email';

const resend = new Resend('re_PtTs8xba_15Hn1bA1KStA6QvN7bkZBHUP');

export async function sendWelcomeEmail(email: any) {
  const { data, error } = await resend.emails.send({
    from: 'wewearori@gmail.com',
    to: [email],
    subject: 'Welcome to our platform!',
    react: WelcomeEmail({ }),
  });

  if (error) {
    console.error('Error sending welcome email:', error);
    throw new Error('Failed to send welcome email');
  }

  console.log('Welcome email sent successfully:', data);
}
