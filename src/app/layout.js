import CartDrawer from "@/components/CartDrawer/CartDrawer";
import "./globals.css";
import { Providers } from "./providers";

export const metadata = {
  title: "Aquamarina",
  icons: {
    icon: "/AquamarinaLogo.png", // path relative to the `public` folder
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <CartDrawer />
          {children}
          </Providers>
      </body>
    </html>
  );
}
