import { useState } from "react";

function NewNote() {
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    //sending request to the nodeJS backend
    fetch("http://localhost:3000/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(noteData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Form submitted");
        //useState to reset the content
        setNoteData({ title: "", content: "" });
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNoteData({ ...noteData, [event.target.name]: event.target.value });
  };

  return (
  <>
    <div className="mt-3 container flex flex-col justify-center border border-sky-500 rounded-lg items-center">
      <h3 className="text-center text-emerald-400 mt-1 text-3xl w-1/2">
        Write a Note
      </h3>
        <form
          id="newNote"
          onSubmit={handleSubmit}
          className="flex flex-col mt-3 items-center w-full"
        >
          <input
            className="border-2 border-gray-200 rounded px-3 py-2 w-full"
            type="text"
            id="title"
            name="title"
            value={noteData.title}
            onChange={handleChange}
            placeholder="Title"
          />

          <textarea
            rows={6}
            className="mt-3 border-2 border-gray-200 rounded px-3 py-2 w-full"
            // type="text"
            id="content"
            name="content"
            value={noteData.content}
            onChange={handleChange}
            placeholder="Content here"
          />

          <button className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-full mb-2">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default NewNote;
