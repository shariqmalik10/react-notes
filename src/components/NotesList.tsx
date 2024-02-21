//note: do ignore the type errors for now since we always pass an input for items

//fetch the latest data from the database -> send GET request to Node server

import { useState, useEffect } from "react";

function NotesList() {

  const [notesList, setNotesList] = useState([]);

  //useEffect to fetch data boi. Loads of data les goooo
  const apiUrl = "http://localhost:3000";
  useEffect(() => {
    fetch(`${apiUrl}/get-notes`)
    .then(response => {
        if(!response.ok){
            throw new Error("Unable to retrieve the data");
        }
        return response.json();
    })
    .then(notes => {
        setNotesList(notes);
    })
    .catch(error=> {
        console.log(`Error: ${error}`);
    })
  });

  return (
    <>
        <div className="mt-3 container flex flex-col justify-center border border-sky-500 rounded-lg">
            {notesList.length > 0 && (
                <ul className="mt-3 list-none"> 
                {notesList.map((note) => (
                    <li key={note.id}>
                        <div>
                            <h4>{note.title}</h4>
                            <p>{note.content}</p>
                        </div>
                    </li>
                ))}
                </ul>
            )}
        </div>
    </>
  )
}

export default NotesList;
