import { ComponentMultiStyleConfig } from "@chakra-ui/react";

const Modal: ComponentMultiStyleConfig = {
     parts: [
          "overlay",
          "dialogContainer",
          "dialog",
          "header",
          "closeButton",
          "body",
          "footer",
     ],
     baseStyle: {
          overlay: {
               backdropBlur: "12px",
          },
          dialog: {
               bgColor: "primary.main",
               borderRadius: "16px",
          },
          header: {
               fontSize: "20px",
               fontWeight: "700",
               lineHeight: "24px",
          },
          closeButton: {
               bgColor: "#707384",
               borderRadius: "9999px",
               width: "20px",
               height: "20px",
               fontSize: "8px",
               fontWeight: "600",
               color: "#101118",
               mt: "0.6rem",
               mr: "0.6rem",
          },
     },
};

export default Modal;
