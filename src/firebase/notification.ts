// src/notifications/sendNotification.ts

import admin from "../firebase/firebase";

interface NotificationPayload {
  title: string;
  message : string;
}

export async function sendPushNotification(
  fcmToken: string,
  payload: NotificationPayload
) {
  try {
    const message = {
      token: fcmToken,
      notification: {
        title: payload.title,
        body: payload.message ,
      },
      data: {
        // Optional: custom key-value data
        screen: 'chat',
        userId: '123',
      },
    };

    const response = await admin.messaging().send(message);
    return response
  } catch (error) {
    console.error('❌ Error sending notification:', error);
    throw error;
  }
}