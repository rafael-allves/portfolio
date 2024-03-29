import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import Mail from '@/services/mail';

import Component from 'mails/teste';

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    const { email, name, message } = request.body;

    const contact = new Mail(
      'rafa.dev.moc@gmail.com',
      'contato',
      `email de: ${email} mensagem: ${message}`
    );
    await contact.sendMail();

    const mail = new Mail(email, `Obrigado pelo contato ${name}`);

    await mail.renderMail(Component({}));
    await mail.sendMail();

    return new NextResponse(
      JSON.stringify({
        status: 200,
        message: 'Email sent successfully',
        email: mail.message,
      })
    );
  } catch (error: any) {
    console.error('Error sending email:', error.message);

    return new NextResponse(
      JSON.stringify({
        message: `An error occurred while sending the email: ${error.message}`,
        status: 500,
      })
    );
  }
}
