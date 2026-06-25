
export const buildEmailBody = (
    activeMessage: any,
    replyBody: string
) => {
    return `Hi ${activeMessage.name},

${replyBody}

────────────────────────────────────────────

📩 ORIGINAL MESSAGE

👤 Name    : ${activeMessage.name}
📧 Email   : ${activeMessage.email}
📝 Subject : ${activeMessage.subject}
📅 Date    : ${new Date(activeMessage.createdAt).toLocaleString()}

────────────────────────────────────────────

${activeMessage.message}

────────────────────────────────────────────

Kind regards,

Rabbinur Muktar
Full Stack Developer

🌐 Portfolio
https://rabbinurmuktar.vercel.app

💼 LinkedIn
https://www.linkedin.com/in/md-rabbinur-muktar-89a364232/

💬 WhatsApp
+8801685111860

────────────────────────────────────────────

Thank you for contacting me.
I appreciate your time and will be happy to assist you.
`;
};

