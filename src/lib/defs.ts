export type NotificationsDef = {
  id: string;
  type: "platform-update" | "comment-tag" | "access-granted" | "join-workspace";
  release: string;
  name: string;
  date: string;
  read: boolean;
};
