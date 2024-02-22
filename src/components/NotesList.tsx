//note: do ignore the type errors for now since we always pass an input for items

//fetch the latest data from the database -> send GET request to Node server

import { useState, useEffect } from "react";

function NotesList() {
  const [notesList, setNotesList] = useState([]);
  //set editing mode
  const [isEditing, setIsEditing] = useState(false);
  //set appearance of the delete button
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);

  const handleCheckboxChange = (event, checkboxId) => {
    if (event.target.checked) {
        setSelectedCheckboxes([...selectedCheckboxes, checkboxId]);
    } else {
        setSelectedCheckboxes(selectedCheckboxes.filter((id) => id !== checkboxId));
    }
  };

  const handleSelectBtn = (event) => {
    setIsEditing(!isEditing);
    if (!isEditing) {
        setSelectedCheckboxes([]);
    }
  };

  const handleDelete = () => {
    fetch('http://localhost:3000/delete-notes', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      // You may need to include an authorization header if required
    },
    body: JSON.stringify({ ids: selectedCheckboxes }),
  })
    .then(response => {
      if (response.ok) {
        // Handle successful deletion
      } else {
        // Handle errors
      }
    })
    .catch(error => {
      // Handle network errors
    });
  };

  //useEffect to fetch data boi. Loads of data les goooo
  const apiUrl = "http://localhost:3000";
  useEffect(() => {
    fetch(`${apiUrl}/get-notes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to retrieve the data");
        }
        return response.json();
      })
      .then((notes) => {
        setNotesList(notes);
      })
      .catch((error) => {
        console.log(`Error: ${error}`);
      });
  });

  return (
    <>
      <div className="mt-3 container flex flex-col justify-center border border-sky-500 rounded-lg">
        <div className="flex flex-row space-x-9 h-13">
          <h1 className="ml-8 text-left text-emerald-400 mt-3 text-3xl">
            All Notes
          </h1>
          <button
            className="mt-3 text-sm bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 h-9 rounded-full"
            onClick={handleSelectBtn}
          >
            {isEditing ? 'Cancel' : 'Select'}
          </button>

          {isEditing && selectedCheckboxes.length > 0 && 
          <button
            className="mt-3 text-sm bg-red-600 hover:bg-red-700 text-white font-bold px-4 h-9 rounded-full"
            onClick = {handleDelete}
          >
            Delete
          </button>}
          
        </div>
        {notesList.length > 0 && (
          <ul className="mt-3 list-none">
            {notesList.map((note) => (
              <li
                key={note.id}
                className="grid grid-rows-1 grid-flow-col gap-4"
              >
                {isEditing && (
                  <div className="mt-2 col-span-1 flex justify-start items-top">
                    <input type="checkbox" id={note.id} name={note.id} 
                    onChange={(event) => handleCheckboxChange(event, note.id)}></input>
                  </div>
                )}

                {/* Adding delete option. Conditionally render if any note is selected for deletion */}

                <div className="col-span-12 flex flex-col">
                  <h4>{note.title}</h4>
                  <p>{note.content}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default NotesList;
