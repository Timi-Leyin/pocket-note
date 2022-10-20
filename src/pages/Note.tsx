import Editor from "@/components/Editor";
import Header from "@/components/Header";
import Tools from "@/components/Tools";

const NotePage = () => {
  return (
    <>
      <div className="bg-gray-900 px-8">
        <Header title="TestTitle" />
      </div>
      <Tools />
      <Editor />
    </>
  );
};
export default NotePage;
