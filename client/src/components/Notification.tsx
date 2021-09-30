import { store } from "react-notifications-component"

interface INotificationParams {
  title: string;
  message: string;
  type: "success" | "danger" | "info" | "default" | "warning" | undefined;
}

function createNotification({ title, message, type }: INotificationParams) {
  store.addNotification({
    title: title,
    message: message,
    type: type,
    insert: "top",
    container: "top-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
      onScreen: true
    }
  });
}

export default createNotification;
