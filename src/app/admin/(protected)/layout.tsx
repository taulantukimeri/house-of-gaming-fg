import { isAdminAuthenticated } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin/login");
  }
  return children;
}
