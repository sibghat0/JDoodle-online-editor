import axios from "axios";

const JDoodleBackendURL = "http://localhost:3001";

export async function submitProgramAPI(data) {
  const response = await axios.post(`${JDoodleBackendURL}/execute`, data);
  return response;
}
