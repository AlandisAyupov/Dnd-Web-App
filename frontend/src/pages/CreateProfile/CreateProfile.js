import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function CreateProfile() {
  const [file, setFile] = useState();

  const navigate = useNavigate();

  const submit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("image", file);
    console.log("Check.");
    await axios.post("/api/profiles", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    console.log("Check2.");
    navigate("/");
  };

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <form
        onSubmit={submit}
        style={{ width: 650 }}
        className="flex flex-col space-y-5 px-5 py-14"
      >
        <input onChange={fileSelected} type="file" accept="image/*"></input>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
