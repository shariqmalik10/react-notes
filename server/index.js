import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { supabase } from "../src/utils/supabase.js";

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
//tells the server to parse incoming JSON payloads
app.use(express.json());
app.use(cors());

//this helper function was created partially using perplexity ai, amazing right ?
function getPostgreSqlCompatibleDate() {
  const today = new Date();
  const year = String(today.getFullYear());
  const month = String(today.getMonth() + 1).padStart(2, "0"); // Add leading zero if needed
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

//catch the post request sent
app.post("/submit-form", async (req, res) => {
  //to mitigate a cors error
  res.setHeader("Access-Control-Allow-Origin", "*");
  console.log("Form Recieved");

  //save the data into the database
  try {
    const currentDate = getPostgreSqlCompatibleDate();
    const { title, content } = req.body;
    const { error, data } = await supabase
      .from("notes")
      .insert([{ title, content, date_added: currentDate }]);

    if (error) {
      console.log(`Error occured while saving note: ${error.message}`);
      return res.status(500).send("Error inserting note.");
    }

    res.send("Note has been created !");
  } catch (err) {
    console.error("Error handling note submission: ", err);
    res.status(500).send("Error handling note submission.");
  }
});

//display all the data to the user
app.get("/get-notes", async (req, res) => {
  try {
    const { error, data } = await supabase.from("notes").select();

    if (error) {
      console.log(`Error occured while saving note: ${error.message}`);
      return res.status(500).send("Error inserting note.");
    }

    res.send(data);
  } catch (err) {
    console.error("Error while retrieving notes ", err);
    res.status(500).send("Error while retrieving notes");
  }
});

//delete all selected notes
app.delete("/delete-notes", async (req, res) => {
  console.log(req.body);
  try {
    const { ids } = req.body;
    console.log(ids);
    const { error, data } = await supabase
      .from("notes")
      .delete()
      .in('id', ids)

    if (error) {
      console.log(`Error occured while deleting note(s): ${error.message}`);
      return res.status(500).send("Error deleting note.");
    }

    res.send(data);
  } catch (err) {
    console.error("Error while retrieving notes ", err);
    res.status(500).send("Error while retrieving notes");
  }
});

//start and check server run
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
