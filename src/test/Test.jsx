import { useState } from "react";

export default function Test() {
  const [file, setFile] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(file);
  }

  function handleFileChange(e) {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(URL.createObjectURL(selectedFile));
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="image">Image </label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">click</button>
      </form>
      {file && <img src={URL.createObjectURL(file)} alt="Uploaded" />}
    </div>
  );
}
