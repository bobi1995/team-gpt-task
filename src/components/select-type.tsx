"use client";
import React from "react";
import * as Select from "@radix-ui/react-select";
import { CheckIcon, ChevronDownIcon } from "@radix-ui/react-icons";
import { useNotification } from "@/context/new-notification";

const SelectType = () => {
  const { type, setType } = useNotification();
  return (
    <Select.Root value={type} onValueChange={setType}>
      <Select.Trigger
        className="inline-flex items-center justify-between w-full px-4 py-2 bg-white border border-gray-300  focus:outline-none"
        aria-label="Select Notification Type"
      >
        <Select.Value placeholder="Select type..." />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="bg-white border border-gray-300">
          <Select.Viewport className="p-2">
            <Select.Item
              value="platform-update"
              className="relative select-none pl-3  py-2 cursor-pointer hover:bg-gray-100"
            >
              <Select.ItemText>Platform Update</Select.ItemText>
            </Select.Item>
            <Select.Item
              value="comment-tag"
              className="relative select-none pl-3 py-2 cursor-pointer hover:bg-gray-100 "
            >
              <Select.ItemText>Comment Tag</Select.ItemText>
            </Select.Item>
            <Select.Item
              value="access-granted"
              className="relative select-none pl-3 py-2 cursor-pointer hover:bg-gray-100 "
            >
              <Select.ItemText>Access granted</Select.ItemText>
            </Select.Item>
            <Select.Item
              value="join-workspace"
              className="relative select-none pl-3 py-2 cursor-pointer hover:bg-gray-100 "
            >
              <Select.ItemText>Join workspace</Select.ItemText>
            </Select.Item>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
};

export default SelectType;
