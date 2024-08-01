import NotificationContent from "@/components/notification-content";
import { color_link } from "@/components/notification-list";
import { readByType } from "@/lib/actions";
import { getByType } from "@/lib/data";
import React from "react";

const WorkspacePage = async () => {
  await readByType("join-workspace");

  const data = await getByType("join-workspace");

  return (
    <div>
      {data.length > 0 &&
        data.map((el: any) => (
          <div className="border-black border-2 m-10" key={el.id}>
            <NotificationContent
              notification={el}
              text={color_link(el.type).text}
            />
          </div>
        ))}
    </div>
  );
};

export default WorkspacePage;
