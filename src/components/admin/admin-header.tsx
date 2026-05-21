import Link from "next/link";
import { LogoutButton } from "@/components/admin/logout-button";

export function AdminHeader({
  title,
  children,
}: {
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="admin-header">
      <div>
        <div className="t-eyebrow">▲ HOUSE OF GAMING · ADMIN</div>
        <h1 className="admin-title">{title}</h1>
      </div>
      <div className="admin-nav">
        {children}
        <Link href="/" className="btn btn--ghost btn--sm">
          View store
        </Link>
        <LogoutButton />
      </div>
    </header>
  );
}
