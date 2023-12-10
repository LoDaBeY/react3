import "./editTask.css";
import { Helmet } from "react-helmet-async";
import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import TaskTitle from "./TaskTitle";
import Tasks from "./Tasks";
import TasksBtns from "./TasksBtns";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const EditTask = () => {
const [user] = useAuthState(auth);

const navigate = useNavigate();
useEffect(() => {
  if (!user) {
    navigate("/")
  }
});

let { userId } = useParams();

if (user) {
  return (
    <div>
      <Helmet>
        <title>edit task Page</title>
      </Helmet>

      <Header />
      <div className="edit-task">
        {/* Title */}
        <TaskTitle userId={userId} user={user}   />

        {/* Sub-tasks section */}
        <Tasks userId={userId} user={user}/>

        {/* Add-more BTN && Delete BTN */}
        <TasksBtns userId={userId} user={user} />
    
      </div>

      <Footer />
    </div>
  );
}


};

export default EditTask;
