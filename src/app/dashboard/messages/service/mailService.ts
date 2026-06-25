// import { buildEmailBody } from "../utils/emailBuilder";


// export const openGmailReply = (activeMessage: any, replySubject: string, replyBody: string) => {
//     const subject = `Re: ${activeMessage.subject || "Portfolio Inquiry"}`;

//     const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${activeMessage.email
//         }&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(
//             buildEmailBody(activeMessage, replyBody)
//         )}`;

//     window.open(gmailUrl, "_blank");
// };

import { buildEmailBody } from "../utils/emailBuilder";

export const openGmailReply = (
  activeMessage: any,
  replySubject: string,
  replyBody: string
) => {
  const gmailUrl =
    `https://mail.google.com/mail/?view=cm&fs=1` +
    `&to=${encodeURIComponent(activeMessage.email)}` +
    `&su=${encodeURIComponent(
      `Re: ${activeMessage.subject || "Portfolio Inquiry"}`
    )}` +
    `&body=${encodeURIComponent(
      buildEmailBody(activeMessage, replyBody)
    )}`;

  window.open(gmailUrl, "_blank");
};