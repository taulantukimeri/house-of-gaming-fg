import { StoreShell } from "@/components/store-shell";
import { getProductById } from "@/lib/products";

const INITIAL_CART_IDS = ["lg-gp2", "sb-ar"];

export default async function StoreLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialCart = (
    await Promise.all(INITIAL_CART_IDS.map((id) => getProductById(id)))
  ).filter((p): p is NonNullable<typeof p> => p != null);

  return <StoreShell initialCart={initialCart}>{children}</StoreShell>;
}
