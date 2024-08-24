import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";


export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className=" w-[89%] h-[90vh] mt-2 p-2 rounded-md border border-gray-300">
          <span className="text-3xl font-semibold">Welcome! Jane Doe</span>
        </div>
      </div>
    </div>
  );
}
