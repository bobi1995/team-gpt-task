"use server";
import { sql } from "@vercel/postgres";
import { unstable_noStore } from "next/cache";
import { readByType } from "./actions";

export const getAll = async () => {
  unstable_noStore();
  try {
    const notifications = await sql`SELECT * from Notifications`;
    return notifications.rows;
  } catch (error) {
    throw new Error("Failed to fetch notifications");
  }
};

export const getByType = async (type: string) => {
  unstable_noStore();
  try {
    const notifications =
      await sql`SELECT * from Notifications where type = ${type}`;

    return notifications.rows;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch notifications");
  }
};

export const getUnread = async () => {
  //трябва да го добавя, за да не кешира резултатите
  unstable_noStore();
  try {
    const data =
      await sql`SELECT COUNT(*) FROM Notifications WHERE read = FALSE`;

    return data.rows[0].count;
  } catch (error) {
    throw new Error("Failed to count unread notifications");
  }
};
