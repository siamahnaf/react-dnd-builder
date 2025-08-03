import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AppProgressBar } from "@siamf/next-progress";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "React Drag and Drop Builder",
  description: "Created by Siam Ahnaf",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster
          containerStyle={{
            zIndex: 9999999999
          }}
        />
        <AppProgressBar
          color="#2563EB"
          height={4}
          showSpinner={false}
          zIndex={999999}
          delay={250}
        />
        {children}
      </body>
    </html>
  );
}

export default RootLayout;