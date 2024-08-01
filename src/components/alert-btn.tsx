"use client";
import { NotificationsDef } from "@/lib/defs";
import React from "react";
import NotificationContent from "./notification-content";
import { readPlatformNotification } from "@/lib/actions";

const AlertBtn = ({
  notification,
  text,
}: {
  notification: NotificationsDef;
  text: string;
}) => {
  const clickHandle = async () => {
    await readPlatformNotification(notification.id);
    alert(notification.release);
    //Нямах време да добавя по-добра фунцкия след прочитане
    window.location.reload();
  };
  return (
    <button onClick={clickHandle} className="text-left">
      <NotificationContent notification={notification} text={text} />
    </button>
  );
};

export default AlertBtn;
