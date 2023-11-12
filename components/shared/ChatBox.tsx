import React from "react";

type Props = {
  id: string;
  name: string;
  imageUrl: string;
};

function Chatbox({ id, name, imageUrl }: Props) {
  return <div>{name}</div>;
}

export default Chatbox;
