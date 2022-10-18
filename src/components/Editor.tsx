const Editor = () => {
  return (
    <div className="">
      <div className="editor-wrapper">
        <div className="text-editor px-12 py-6" contentEditable="true">
          <h1 className="text-5xl">My First Pocket Note</h1>
          <h4> - Table of content</h4>
        </div>
      </div>
      <div className="editor-footer"></div>
    </div>
  );
};
export default Editor;
