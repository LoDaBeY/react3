import { useDocument } from "react-firebase-hooks/firestore";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";
import { useState } from "react";
function Tasks({ userId, user, TasksChanger, DeleteTaskBtn }) {
  const [value, loading, error] = useDocument(doc(db, user.uid, userId));
  const [InputNewTask, setInputNewTask] = useState("");
  const [showAddNewTask, setshowAddNewTask] = useState(false);

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

  if (value) {
    return (
      <section className="sub-task mtt">
        <div className="parent-time">
          <p className="time">
            Created: <Moment fromNow date={value.data().userId} />{" "}
          </p>
          <div>
            <input
              onChange={async (eo) => {
                TasksChanger(eo);
              }}
              checked={value.data().completed}
              id="checkbox"
              type="checkbox"
            />
            <label htmlFor="checkbox">Completed </label>
          </div>
        </div>

        <ul>
          {value.data().details.map((item) => {
            return (
              <li key={item} className="card-task flex">
                <p> {item} </p>
                <i
                  onClick={() => {
                    DeleteTaskBtn(item);
                  }}
                  className="fa-solid fa-trash"
                ></i>
              </li>
            );
          })}
        </ul>
        {showAddNewTask && (
          <div className="add-new-task flex">
            <input
            value={InputNewTask}
              onChange={(eo) => {
                setInputNewTask(eo.target.value)
              }}
              className="add-task"
              type="text"
            />

            <button
              onClick={async () => {
                await updateDoc(doc(db, user.uid, userId), {
                  details: arrayUnion(InputNewTask),
                  
                });
                setInputNewTask('')
              }}
              className="add"
            >
              Add
            </button>

            <button
              onClick={() => {
                setshowAddNewTask(false);
              }}
              className="cancel"
            >
              Cancel
            </button>
          </div>
        )}
        

        <div className="center mttt">
          <button
            onClick={() => {
              setshowAddNewTask(true);
            }}
            className="add-more-btn"
          >
            Add more <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </section>
    );
  }
}

export default Tasks;
