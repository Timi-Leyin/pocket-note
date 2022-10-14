import { BodyProps } from "@interfaces/index";
import "@styles/index.css";
const Body = ({ title, children }: BodyProps) => {
  return (
    <>
      {/* <!DOCTYPE html> */}
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <meta name="viewport" content="width=device-width" />
          <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
          <meta name="generator" content="" />
          <title>{title}</title>
        </head>
        <body>{children}</body>
      </html>
    </>
  );
};
export default Body;
