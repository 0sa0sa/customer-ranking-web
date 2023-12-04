import Link from "next/link";

export default function Home() {
  return (
    <main style={{ display: "flex", flexDirection: "column" }}>
      Home
      <Link href="/customer/1">customer1</Link>
      <Link href="/customer/2">customer2</Link>
      <Link href="/customer/3">customer3</Link>
      <Link href="/customer/4">customer4</Link>
    </main>
  );
}
