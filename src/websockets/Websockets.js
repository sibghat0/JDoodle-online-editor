import React, { useEffect, useState } from "react";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";

const Websockets = () => {
  const [socketClient, setSocketClient] = useState(null);
  const [wsNextId, setWsNextId] = useState(0);
  const [output, setOutput] = useState("");

  useEffect(() => {
    const client = webstomp.over(
      new SockJS("https://api.jdoodle.com/v1/stomp"),
      { heartbeat: false, debug: true }
    );
    setSocketClient(client);

    const onWsConnection = () => {
      console.log("connection succeeded");

      client.subscribe("/user/queue/execute-i", (message) => {
        const msgId = message.headers["message-id"];
        const msgSeq = parseInt(msgId.substring(msgId.lastIndexOf("-") + 1));
        const statusCode = parseInt(message.headers.statusCode);

        if (statusCode === 201) {
          setWsNextId(msgSeq + 1);
          return;
        }

        if (statusCode >= 200 && statusCode < 300) {
          setOutput((prevOutput) => prevOutput + message.body);
        } else {
          console.error(`Error: ${statusCode}`);
        }

        setWsNextId(msgSeq + 1);
      });

      const script = `import java.util.Scanner;
import java.util.NoSuchElementException;

public class MyClass {
  public static void main(String args[]) {
    Scanner scanner = new Scanner(System.in);

    try {
      System.out.println("Type a Line and enter....");
      String txt = scanner.nextLine();
      System.out.println("You have typed...");
      System.out.println(txt);
    } catch (NoSuchElementException e) {
      System.out.println("Type something in the Stdin box above....");
    }
  }
}`;

      const data = JSON.stringify({
        script: script,
        language: "java",
        versionIndex: 4,
        token:
          "eyJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJKRE9PRExFIiwic3ViIjoiV1MtQVBJLVRPS0VOIiwiY2xpZW50LWlkIjoiMjIzYTM2ZGFlNmU0MmJkMGRlZDI4NzVlZDc0OWQ5NWIiLCJpYXQiOjE3MDU3MDgwMzEsImV4cCI6MTcwNTcwODIxMX0.ZYMDVT4F_z4wUUP7v1bzbfahJlT6lY2B8C1mxZLpqNc",
      });

      client.send("/app/execute-ws-api-token", data, {
        message_type: "execute",
      });
    };

    const onWsConnectionFailed = (e) => {
      console.log("connection failed");
      console.error(e);
    };

    client.connect({}, onWsConnection, onWsConnectionFailed);

    // Clean up the connection on component unmount
    return () => {
      if (client) {
        client.disconnect();
      }
    };
  }, []);

  const handleInput = (e) => {
    let key = e.key;
    if (e.key === "Enter") {
      key = "\n";
    }
    socketClient?.send("/app/execute-ws-api-token", key, {
      message_type: "input",
    });
  };

  return (
    <div>
      output <br />
      <textarea
        rows="5"
        cols="100"
        value={output}
        onKeyPress={handleInput}
        onChange={(e) => setOutput(e.target.value)}
      />
    </div>
  );
};

export default Websockets;
