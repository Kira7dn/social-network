export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="flex-1 w-6/12 max-w-4xl">{children}</section>;
}
