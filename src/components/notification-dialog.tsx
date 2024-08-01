"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import SelectType from "./select-type";
import {
  NotificationProvider,
  useNotification,
} from "@/context/new-notification";
import { createNotification } from "@/lib/actions";

//1. Тъй като трябва да използвам React-context, най-подходящо е тук, за да запазя минимализирам Client side components

const NotificationDialog = () => {
  const { type, name, number, setName, setNumber } = useNotification();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const notification = {
      type,
      release: type === "platform-update" ? number : null,
      name: type !== "platform-update" ? name : null,
    };

    try {
      await createNotification(notification);
      return window.location.reload();
    } catch (error) {
      console.error("Error creating notification:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="px-4 py-2 text-black hover:bg-gray-100">
          Add notification
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        {/**Тук съм използвал стилизацията от https://www.radix-ui.com/primitives/docs/components/dialog styles.css*/}
        <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-30" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow-lg max-w-lg w-full p-6">
          <Dialog.Title className="text-lg font-semibold mb-4">
            Create notification
          </Dialog.Title>
          <Dialog.Description className="mb-4 text-gray-600">
            Create new notification and distribute it to all users
          </Dialog.Description>
          <form onSubmit={handleSubmit}>
            <SelectType />
            {type ? (
              type === "platform-update" ? (
                <fieldset className="mb-4  items-center mt-5">
                  <label
                    className="block mb-2 font-medium items-center w-full"
                    htmlFor="release-number"
                  >
                    Release number:
                  </label>
                  <input
                    className="w-full px-2 py-2 border"
                    id="release-number"
                    placeholder="Number of release..."
                    onChange={(e) => setNumber(e.target.value)}
                    value={number}
                  />
                </fieldset>
              ) : (
                <fieldset className="mb-4  items-center mt-5">
                  <label
                    className="block mb-2 font-medium items-center w-full"
                    htmlFor="person-name"
                  >
                    Person name:
                  </label>
                  <input
                    className="w-full px-2 py-2 border"
                    id="person-name"
                    placeholder="Enter name..."
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </fieldset>
              )
            ) : null}
            <div className="flex justify-end mt-6">
              {loading ? (
                "LOADING...."
              ) : (
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  type="submit"
                >
                  Save changes
                </button>
              )}
            </div>
          </form>

          <Dialog.Close asChild>
            <button
              className="absolute top-2 right-2 p-2 text-gray-400 hover:text-gray-600"
              aria-label="Close"
            >
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

// 2. Създавам този Wrapper, защото ако използвам Provider директно в NotificationDialog, ще получа грешка, защото няма
// да мога да използвам custom hook-a там, където декларирам провайдъра
const DialogWrapper = () => {
  return (
    <NotificationProvider>
      <NotificationDialog />
    </NotificationProvider>
  );
};

export default DialogWrapper;
