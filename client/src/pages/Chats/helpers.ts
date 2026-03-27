import moveArrayElement from '../../utils/moveArrayElement';

/**
 * Resets chat unread messages counter.
 */
export const resetChatUnreadMsgsCount = (context: PlainObject, chatId: string) => {
  const indexOfTargetChat = context.props.chatsList.map((item: ChatObject) => item.id).indexOf(chatId);

  const newChatsList = [...context.props.chatsList];

  newChatsList[indexOfTargetChat].unreadMessagesCount = 0;
  context.setProps({ chatsList: newChatsList });
};

/**
 * Updates chat with the latest message,
 * puts it on top of chats list and updates unread messages counter.
 */
export const rearrangeChatsList = (
  context: PlainObject,
  receivedMessage: { chatId: string, data: MessageObject },
) => {
  const indexOfTargetChat = context.props.chatsList.map((item: ChatObject) => item.id).indexOf(receivedMessage.chatId);

  const newChatsList = moveArrayElement(context.props.chatsList, indexOfTargetChat, 0);

  if (newChatsList && newChatsList[0]) {
    newChatsList[0].lastMessage = receivedMessage.data;

    if (
      (receivedMessage.chatId !== context.props.chatId)
      && (receivedMessage.data.userId !== sessionStorage.getItem('userId'))
    ) {
      const currentUnread = newChatsList[0].unreadMessagesCount;
      newChatsList[0].unreadMessagesCount = Number.isInteger(currentUnread) ? (currentUnread + 1) : 1;
    }

    context.setProps({ chatsList: newChatsList });
  }
};
