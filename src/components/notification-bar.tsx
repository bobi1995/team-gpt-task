import React from "react";
import { BellIcon } from "@radix-ui/react-icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import NotificationDialog from "./notification-dialog";
import DialogWrapper from "./notification-dialog";
import { getUnread } from "@/lib/data";
import NotificationList from "./notification-list";

const NotificationBar = async () => {
  const notification_number = await getUnread();
  return (
    <div className="w-full flex justify-between p-4 bg-gray-100">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>Manage</DropdownMenu.Trigger>

        <DropdownMenu.Content className="bg-white border border-gray-200 p-2">
          <DialogWrapper />
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <div className="relative">
            <BellIcon className="w-6 h-6 cursor-pointer" />
            {notification_number > 0 && (
              <span className="absolute bottom-0 right-0 w-3 h-3 flex items-center justify-center text-white bg-red-500 rounded-full text-xs">
                {notification_number}
              </span>
            )}
          </div>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="bg-white border border-gray-200 p-2 rounded-md">
          <div className="p-2">
            <NotificationList />
          </div>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};

export default NotificationBar;
