import nodemailer from 'nodemailer';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const { name, subject, message } = req.body;

    if (!name || !message) {
        return res.status(400).json({ message: 'Name and message are required' });
    }

    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASS) {
        console.error('Missing GMAIL_USER or GMAIL_PASS environment variables');
        return res.status(500).json({ message: 'Server configuration error' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const timestamp = new Date().toLocaleString('en-IN', {
        dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Kolkata'
    });
    const senderEmail = name.includes('@') ? name : 'parthxcore@gmail.com';

    const htmlBody = `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 620px; margin: 0 auto; border: 1px solid #dee2e6; border-radius: 10px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.08);">
            <!-- Header -->
            <div style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); padding: 28px 32px;">
                <h2 style="margin: 0 0 4px; color: #ffffff; font-size: 20px; font-weight: 700; letter-spacing: -0.3px;">Professional Inquiry</h2>
                <p style="margin: 0; color: rgba(255,255,255,0.65); font-size: 12px; letter-spacing: 0.5px;">${timestamp} • via ParthAroraTSC Portfolio</p>
            </div>

            <!-- Professional Intro -->
            <div style="padding: 28px 32px 0;">
                <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.7; color: #343a40;">Dear Hiring Team,</p>
                <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.7; color: #343a40;">I hope this message finds you well. My name is <strong>Parth Arora</strong>, and I am a <strong>Frontend Developer at Techsolace</strong> with a strong passion for <strong>Cybersecurity</strong>, including SOC Analysis, VAPT, and Network Security.</p>
                <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.7; color: #343a40;">I am reaching out to express my interest in potential opportunities where I can contribute my expertise in building secure, high-performance web applications.</p>
            </div>

            <!-- Sender Details -->
            <div style="margin: 0 32px; padding: 16px 20px; background: #f8f9fa; border-radius: 8px; border: 1px solid #e9ecef;">
                <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                        <td style="padding: 6px 0; font-size: 12px; color: #868e96; font-weight: 600; width: 80px; vertical-align: top;">FROM</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #212529;">${name}</td>
                    </tr>
                    <tr>
                        <td style="padding: 6px 0; font-size: 12px; color: #868e96; font-weight: 600; vertical-align: top;">SUBJECT</td>
                        <td style="padding: 6px 0; font-size: 13px; color: #212529;">${subject || 'Opportunity Inquiry'}</td>
                    </tr>
                </table>
            </div>

            <!-- Message Content -->
            <div style="padding: 20px 32px;">
                <div style="border-left: 3px solid #E95420; padding: 14px 18px; background: #fff8f5; border-radius: 0 6px 6px 0;">
                    <p style="margin: 0 0 6px; font-size: 10px; text-transform: uppercase; letter-spacing: 1.5px; color: #E95420; font-weight: 700;">Message</p>
                    <p style="margin: 0; font-size: 14px; line-height: 1.7; color: #212529; white-space: pre-wrap;">${message}</p>
                </div>
            </div>

            <!-- Professional Closing -->
            <div style="padding: 0 32px 28px;">
                <p style="margin: 0 0 16px; font-size: 14px; line-height: 1.7; color: #343a40;">I would welcome the opportunity to discuss how my skills align with your team's needs. Please feel free to reach out at your earliest convenience.</p>
                <div style="border-top: 1px solid #e9ecef; padding-top: 16px; margin-top: 8px;">
                    <p style="margin: 0 0 2px; font-size: 14px; font-weight: 700; color: #212529;">Parth Arora</p>
                    <p style="margin: 0 0 8px; font-size: 12px; color: #868e96;">Frontend Developer | Cybersecurity Enthusiast</p>
                    <p style="margin: 0; font-size: 12px; color: #495057;">
                        📧 <a href="mailto:${senderEmail}" style="color: #0f3460; text-decoration: none;">${senderEmail}</a><br/>
                        🔗 <a href="https://partharoratsc.github.io" style="color: #0f3460; text-decoration: none;">partharoratsc.github.io</a><br/>
                        💼 <a href="https://www.linkedin.com/in/parth-arora-1343b5368/" style="color: #0f3460; text-decoration: none;">LinkedIn Profile</a>
                    </p>
                </div>
            </div>

            <!-- Footer -->
            <div style="background: #f1f3f5; padding: 14px 32px; text-align: center; border-top: 1px solid #dee2e6;">
                <p style="margin: 0; font-size: 10px; color: #adb5bd; letter-spacing: 0.5px;">SENT VIA PARTHARORATSC PORTFOLIO • <a href="https://partharoratsc.github.io" style="color: #868e96; text-decoration: none;">partharoratsc.github.io</a></p>
            </div>
        </div>
    `;

    const mailOptions = {
        from: `"Parth Arora — Portfolio" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `${subject || 'Professional Inquiry'} — Parth Arora | Frontend Dev & Cybersecurity`,
        html: htmlBody,
        text: `Dear Hiring Team,\n\nI hope this message finds you well. My name is Parth Arora, and I am a Frontend Developer at Techsolace with a strong passion for Cybersecurity.\n\nFrom: ${name}\nSubject: ${subject || 'Opportunity Inquiry'}\n\nMessage:\n${message}\n\nI would welcome the opportunity to discuss how my skills align with your team's needs.\n\nBest regards,\nParth Arora\nFrontend Developer | Cybersecurity Enthusiast\n📧 ${senderEmail}\n🔗 https://partharoratsc.github.io\n💼 https://www.linkedin.com/in/parth-arora-1343b5368/`,
        replyTo: senderEmail,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email sent successfully' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ 
            message: 'Failed to send email', 
            error: error.message,
            code: error.code 
        });
    }
}

