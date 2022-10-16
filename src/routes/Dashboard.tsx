import Header from "@components/Header";
import Notes from "@components/Notes";
import Sidebar from "@components/Sidebar";

const Dashboard = () => {
  return (
    <section className="flex">
      <Sidebar />
      <div className="relative flex-1 px-8 ">
        <Header />
        <Notes />
      </div>
    </section>
  );
};
export default Dashboard;
