export type LoginParams = {
  username: string;
  password: string;
};

export type RegisterParams = {
  username: string;
  name: string;
  password: string;
};

export type ContactsParams = {
  name: string;
  phone: string;
};

export type MessagesParams = {
  content: string;
  contacts: string[];
};

export type RefreshTokenParams = {
  refresh_token: string;
};
