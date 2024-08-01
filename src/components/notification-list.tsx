import { getAll } from "@/lib/data";
import { NotificationsDef } from "@/lib/defs";
import React from "react";
import Link from "next/link";
import AlertBtn from "./alert-btn";
import { AvatarIcon } from "@radix-ui/react-icons";
import NotificationContent from "./notification-content";

export const color_link = (type: string) => {
  switch (type) {
    case "platform-update":
      return {
        color: "bg-red-300",
        link: "alert",
        text: "New features - see what’s new",
      };
    case "comment-tag":
      return {
        color: "bg-blue-300",
        link: "/comments",
        text: "tagged you in a comment",
      };
    case "access-granted":
      return {
        color: "bg-green-300",
        link: "/chats",
        text: "shared a chat with you",
      };
    case "join-workspace":
      return {
        color: "bg-orange-300",
        link: "/workspace",
        text: "joined your workspace",
      };
    default:
      return {
        color: "bg-gray-300",
        link: "/",
        text: "",
      };
  }
};

const NotificationLayout = ({
  notification,
}: {
  notification: NotificationsDef;
}) => {
  const { color, link, text } = color_link(notification.type);
  // по някаква причина това(bgColor) не работи на PROD деплоймент и не мога да установя защо
  //Обектите ми връщаха само цвят и спрямо read определях по-светъл/тъмен цвят.
  const bgColor = notification.read ? `bg-${color}-200` : `bg-${color}-400`;

  return (
    <div
      className={`mb-2 p-2 border-b border-gray-200 ${color} hover:cursor-pointer`}
    >
      {link.startsWith("/") ? (
        <Link href={link}>
          <NotificationContent notification={notification} text={text} />
        </Link>
      ) : (
        <AlertBtn notification={notification} text={text} />
      )}
    </div>
  );
};

const NotificationList = async () => {
  const notifications = await getAll();

  return (
    <div className="h-96 overflow-y-auto border border-gray-300 rounded-lg">
      {notifications.length > 0 &&
        notifications.map((el: any) => {
          return <NotificationLayout notification={el} key={el.id} />;
        })}
    </div>
  );
};

export default NotificationList;
