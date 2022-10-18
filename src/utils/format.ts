const format = (command: string, value?: string, showUI = false) => {
  document.execCommand(command, false, value);
};

export default format;
