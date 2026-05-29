import toast from "react-hot-toast";

export function successMessage(message: string) {
  toast.success(message, {
    duration: 5000,
    style: {
      padding: "16px",
      fontSize: 18,
      color: "#eaffea",
      background: "#319431",
      border: "none",
      position: "relative",
      overflow: "hidden",
    },
    iconTheme: {
      primary: "#33ff00",
      secondary: "#319431",
    },
    className: "custom-toast",
  });
}

export function errorMessage(message: string) {
  toast.error(message, {
    duration: 5000,
    style: {
      padding: "16px",
      fontSize: 18,
      color: "#ffeaea",
      background: "#b3261e",
      border: "none",
      position: "relative",
      overflow: "hidden",
    },
    iconTheme: {
      primary: "#ff3b30",
      secondary: "#b3261e",
    },
    className: "custom-toast",
  });
}
