import Header from "@/components/Header";
import Notes from "@/components/Notes";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <>
      <Header />
      <section className="flex py-1">
        {/*
        <Sidebar />
        I took everything here to the Notes Files: Line 29-33;
        */}
        <div className="relative">
          <Notes />
        </div>
      </section>
    </>
  );
};
export default Dashboard;
