import "@/styles/admin.css";

export const metadata = {
  title: "Admin — House of Gaming FG",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="admin-root">{children}</div>;
}
