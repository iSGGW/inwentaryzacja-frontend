import { useEffect } from "react";

export interface PageProps {
  title: string;
  children?: JSX.Element;
}

const Page = ({ ...props }: PageProps): JSX.Element => {
  useEffect(() => {
    document.title = props.title + " - iSGGW";
  });

  return <> {props.children} </>;
};

export default Page;
