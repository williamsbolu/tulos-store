import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ecommerce Backend",
  description: "Manage your inventories",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
