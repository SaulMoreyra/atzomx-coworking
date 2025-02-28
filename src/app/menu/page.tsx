import MenuList from "@/components/MenuList/MenuList";

export default async function Home() {
  return (
    <div className="w-full gap-5 max-w-7xl px-10 pt-9 mx-auto flex">
      <MenuList />
      <section className="sticky top-36 bg-gray-100 rounded-lg w-[287px] p-5 pb-6 self-start mb-24">
        announcements
      </section>
    </div>
  );
}
