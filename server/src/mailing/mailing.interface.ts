export interface MailData {
  email: string;
  subject: string;
  message: string;
}

export interface PostrgessMail {
  area_id: number;
  user_id: string;
}

export type SelectEmailData = MailData & PostrgessMail;
