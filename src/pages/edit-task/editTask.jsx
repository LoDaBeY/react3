import "./editTask.css";
import { Helmet } from "react-helmet-async";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import TaskTitle from "./TaskTitle";
import Tasks from "./Tasks";
import TasksBtns from "./TasksBtns";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import ReactLoading from "react-loading";

const EditTask = () => {
  const [user] = useAuthState(auth);
  let { userId } = useParams();
  const navigate = useNavigate();
  const [AfterDeletionOfTheTask, setAfterDeletionOfTheTask] = useState(false);
  //Functions for changing the state of the tasks

  const TitleChange = async (eo) => {
    await updateDoc(doc(db, user.uid, userId), {
      Title: eo.target.value,
    });
  };
  const TasksChanger = async (eo) => {
    if (eo.target.checked) {
      await updateDoc(doc(db, user.uid, userId), {
        completed: true,
      });
    } else {
      await updateDoc(doc(db, user.uid, userId), {
        completed: false,
      });
    }
  };

  const DeleteTaskBtn = async (item) => {
    await updateDoc(doc(db, user.uid, userId), {
      details: arrayRemove(item),
    });
  };

  const DeleteAllTask = async () => {
    setAfterDeletionOfTheTask(true);
    await deleteDoc(doc(db, user.uid, userId));
    navigate("/", { replace: true });
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  });

  if (user) {
    return (
      <div>
        <Helmet>
          <title>edit task Page</title>
        </Helmet>

        <Header />
        {AfterDeletionOfTheTask ? (
          <ReactLoading
            type={"cubes"}
            color={"White"}
            height={100}
            width={100}
          />
        ) : (
          <div className="edit-task">
            {/* Title */}
            <TaskTitle userId={userId} user={user} TitleChange={TitleChange} />

            {/* Sub-tasks section */}
            <Tasks
              userId={userId}
              user={user}
              TasksChanger={TasksChanger}
              DeleteTaskBtn={DeleteTaskBtn}
            />

            {/* Add-more BTN && Delete BTN */}
            <TasksBtns
              DeleteAllTask={DeleteAllTask}
              userId={userId}
              user={user}
            />
          </div>
        )}



        <Footer />
      </div>
    );
  }
};

export default EditTask;
