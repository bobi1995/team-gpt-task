import { NotificationsDef } from "@/lib/defs";
import React from "react";
import {
  GearIcon,
  AvatarIcon,
  EyeOpenIcon,
  EyeNoneIcon,
} from "@radix-ui/react-icons";

//Знам, дизайнът е скапан, особено за индивидуалните страници.

const NotificationContent = ({
  notification,
  text,
}: {
  notification: NotificationsDef;
  text: string;
}) => {
  return (
    <div>
      <div className="flex justify-between">
        {notification.type === "platform-update" ? (
          <GearIcon className="h-6 w-6" />
        ) : (
          <AvatarIcon className="h-6 w-6" />
        )}
        <p className="font-semibold ">{notification.type}</p>
        {notification.read ? (
          <EyeOpenIcon className="h-6 w-6" />
        ) : (
          <EyeNoneIcon className="h-6 w-6" />
        )}
      </div>
      <p className="text-gray-600 break-words w-64">
        {notification.type === "platform-update"
          ? text
          : `${notification.name} ${text}`}
      </p>
      <p className="text-white text-sm">
        {new Date(notification.date).toLocaleString()}
      </p>
    </div>
  );
};

export default NotificationContent;
