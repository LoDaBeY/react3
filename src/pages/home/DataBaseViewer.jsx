import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { MdOutlineTaskAlt } from "react-icons/md";
import { useState } from "react";


//this is the file to show the tasks one by one

function DataBaseViewer({ user }) {
  const [Data, setData] = useState(
    query(collection(db, user.uid), orderBy("id"))
  );
  const [value, loading, error] = useCollection(Data);
  const [SelectValue, setSelectValue] = useState("All Tasks");
  const [Opacity, setOpacity] = useState(true);
  // you need to pass the value, loading and error every one by default in if statement and return them to the code.

  // when loading is called
  if (loading) {
    return (
      <ReactLoading
        type={"spinningBubbles"}
        color={"White"}
        height={80}
        width={80}
      />
    );
  }

  // when error has happened while loading

  if (error) {
    return (
      <ReactLoading type={"cubes"} color={"White"} height={80} width={80} />
    );
  }
  const Filter = (eo) => {
    if (eo.target.value === "All Tasks") {
      setSelectValue("All Tasks")
      setData(  query(collection(db, user.uid), orderBy("id")))
  
    }
    else if (eo.target.value === "Completed") {
      setSelectValue("Completed")
      setData(query(collection(db, user.uid), where("completed", "==", true)))
  
    } 
  else if (eo.target.value === "Not Completed ") {
    setSelectValue("Not Completed ")
  setData(  query(collection(db, user.uid), where("completed", "==", false)))
  
  }
  }

  // when you find a data in the data base, please note that you need to do a 2.map inside the first map to get the data of the details from the data base.
  if (value) {
    return (
      <div>
        <section className="parent-of-btns flex mtt">
          <button
            onClick={() => {
              setData(query(collection(db, user.uid), orderBy("id", "desc")));
              setOpacity(false);
            }}
            style={{ opacity: Opacity ? "0.5" : "1" }}
          >
            Newest first
          </button>

          <button
            onClick={() => {
              setData(query(collection(db, user.uid), orderBy("id", "asc")));
              setOpacity(true);
            }}
            style={{ opacity: Opacity ? "1" : "0.5" }}
          >
            Oldest first
          </button>
          <select
          value={SelectValue}
                    onChange={(eo) => { 
                      Filter(eo)
                    }}>
            <option value="All Tasks"> All Tasks </option>
            <option value="Completed"> Completed </option>
            <option value="Not Completed "> Not Completed </option>
          </select>
        </section>

        <section className="flex all-tasks mt">
          {value.docs.length === 0 && (
            <p>
              All Tasks Deleted Successfully <MdOutlineTaskAlt />
            </p>
          )}

          {value.docs.map((item) => {
            return (
              //put the key in the biggest item
              <article key={item.id} dir="auto" className="one-task">
                <Link className="TaskLink" to={`/edit-task/${item.data().id}`}>
                  <h2> {item.data().Title} </h2>
                  <ul>
                    {item.data().details.map((item, index) => {
                      if (index < 3) {
                        return <li key={item}> {item} </li>;
                      } else {
                        return false;
                      }
                    })}
                  </ul>

                  <p className="time">
                    {" "}
                    <Moment fromNow date={item.data().id} />
                  </p>
                </Link>
              </article>
            );
          })}
        </section>
      </div>
    );
  }
}

export default DataBaseViewer;
