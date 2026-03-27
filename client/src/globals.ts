/* eslint-disable @typescript-eslint/no-unused-vars, no-unused-vars */
interface PlainObject {
  [key: string]: any;
}

interface ChatObject extends PlainObject {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: MessageObject;
  unreadMessagesCount?: number;
}

interface MessageObject extends PlainObject {
  id: string;
  content: string;
  userId: string;
  createdAt: string;
}

interface ClickEvent {
  preventDefault: () => void;
}

interface CustomEventData extends Event {
  detail: string;
}

interface SubmitEvent extends Event {
  readonly submitter: HTMLElement | null;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace Intl {
  interface DateTimeFormatOptions {
    dateStyle?: 'full' | 'long' | 'medium' | 'short';
    timeStyle?: 'full' | 'long' | 'medium' | 'short';
  }
}
