/**
 * Generates an email verification template for the Bloom platform.
 * @param name - The user's name
 * @param verifyUrl - The unique URL for email verification
 */
export const generateVerificationEmail = (name: string, verifyUrl: string) => {
  const html = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        .container { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #333; }
        .logo { color: #10b981; font-size: 28px; font-weight: bold; margin-bottom: 20px; text-align: center; }
        .button { background-color: #10b981; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; margin: 25px 0; }
        .footer { font-size: 13px; color: #9ca3af; margin-top: 30px; border-top: 1px solid #f3f4f6; padding-top: 20px; line-height: 1.5; }
        .link { color: #10b981; word-break: break-all; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">Bloom</div>
        <h2>Hello ${name},</h2>
        <p>Welcome to <strong>Bloom</strong>! We're excited to have you join our community of learners and experts.</p>
        <p>To get started, please confirm your email address by clicking the button below:</p>
        
        <div style="text-align: center;">
          <a href="${verifyUrl}" class="button">Verify My Email</a>
        </div>
        
        <p>If the button above doesn't work, you can also click or copy this link into your browser:</p>
        <p><a href="${verifyUrl}" class="link">${verifyUrl}</a></p>
        
        <div class="footer">
          <p>You received this email because an account was created on Bloom with this email address. If you didn't sign up, you can safely ignore this message.</p>
          <p>&copy; 2026 Bloom Tutoring Platform</p>
        </div>
      </div>
    </body>
    </html>
  `;

  const text = `
    Welcome to Bloom, ${name}!

    Thank you for joining our community. Please verify your email address by visiting the link below:

    ${verifyUrl}

    If you did not create an account on Bloom, you can safely ignore this email.
    
    © 2026 Bloom
  `;

  return { html, text };
};
