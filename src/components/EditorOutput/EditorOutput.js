import React, { useState } from "react";
import { submitProgramAPI } from "../../service/service.api";
import { clientData } from "../../constants/JDoodleConstant";
import { colorChange } from "../../utils/jDoodle.utils";

export default function EditorOutput({ colorMode, script, codeLanguage }) {
  const [output, setOutput] = useState();

  const jDoodleData = {
    clientId: clientData.CLIENTID,
    clientSecret: clientData.CLIENTSECRET,
    script: script,
    language: codeLanguage,
    stdin: output,
    versionIndex: "0",
  };

  const handleInput = async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      const responseOutput = await submitProgramAPI(jDoodleData);
      setOutput([...output, responseOutput?.data?.output]);
    }
  };
  const filteredArray =
    Array.isArray(output) && output?.filter((item) => item !== undefined);
  return (
    <div>
      <textarea
        rows="5"
        cols="50"
        value={
          !Array.isArray(output)
            ? output
            : `${filteredArray?.slice(0, -1).join("")}\n${
                filteredArray[filteredArray?.length - 1]
              }`
        }
        onKeyDown={handleInput}
        onChange={(e) => setOutput(e.target.value)}
        className={colorChange(colorMode, "vs-dark")}
      />
    </div>
  );
}
