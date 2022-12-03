import Header from "@/components/Header";
import Notes from "@/components/Notes";
import Sidebar from "@/components/Sidebar";

const Dashboard = () => {
  return (
    <>
      <Header />
      <section className="flex pt-5rem">
        {/*
        <Sidebar />
        I took everything here to the Notes Files: Line 29-33;
        */}
        <div className="relative flex-1 px-15 ">
          <Notes />
        </div>
      </section>
    </>
  );
};
export default Dashboard;
