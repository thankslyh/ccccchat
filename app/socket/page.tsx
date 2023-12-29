"use client"

import { Textarea, Button } from "@nextui-org/react";
import { useState } from "react";
import useWebSocket from "react-use-websocket";

export default function SocketPage() {
  const [text, setText] = useState<string>("");
  const [list, setList] = useState<Array<string>>([]);
  const {sendMessage, sendJsonMessage} = useWebSocket("ws://localhost:10001/ws", {
    onMessage(event) {
      console.log(event);
      if (event.data === "pong") return;
      setList((prev) => [...prev, event.data]);
    },
  });

  const handleKeyDown = () => {
    sendMessage(text);
    setList((prev) => [...prev, text]);
    setText("");
  }
	return (
		<div className="w-full flex flex-col justify-center items-center">
      <Button color="primary" onClick={() => sendJsonMessage("connect", true)}>连接</Button>
      <div className="mt-10">
        {list.map((item, index) => (
          <div className="m-1" key={index}>{item}</div>
        ))}
      </div>
      <Textarea className="pt-12 w-10/12" value={text} placeholder="说点什么吧" onValueChange={(val) => setText(val)} />
      <Button className="mt-10" color="primary" onClick={handleKeyDown}>发送</Button>
		</div>
	);
}
