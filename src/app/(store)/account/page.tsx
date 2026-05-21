import { AccountScreen } from "@/screens/account-screen";
import { getAllProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const products = await getAllProducts();
  return <AccountScreen suggestedProducts={products.slice(4, 7)} />;
}
