import { toast } from "sonner";
import { openGmailReply } from "../service/mailService";


export const useMessageActions = (updateStatus: any) => {
  
  const sendReply = async (
    activeMessage: any,
    replySubject: string,
    replyBody: string,
    setActiveMessage: any,
    setIsReplyOpen: any
  ) => {
    if (!activeMessage) return;

    if (!replyBody.trim()) {
      toast.error("Please enter a reply message");
      return;
    }

    // Open Gmail
    openGmailReply(activeMessage, replySubject, replyBody);

    try {
      await updateStatus({
        id: activeMessage.id || activeMessage._id,
        status: "replied",
      }).unwrap();

      toast.success("Reply sent via Gmail");

      setActiveMessage((prev: any) => ({
        ...prev,
        status: "replied",
      }));
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }

    setIsReplyOpen(false);
  };

  return { sendReply };
};