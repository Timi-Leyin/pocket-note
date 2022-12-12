import Back2Top from "@/components/Back2Top";
import Header from "@/components/Header";
import Notes from "@/components/Notes";
const Dashboard = () => {
  return (
    <>
      <Header />
      <section className="py-1">
        <div className="relative">
          <Notes />
        </div>
      </section>
      <Back2Top />
    </>
  );
};
export default Dashboard;
