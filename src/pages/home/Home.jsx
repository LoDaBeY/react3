import Header from "../../comp/header";
import Footer from "../../comp/Footer";
import Loading from "../../comp/Loading";
import Erroe404 from "../erroe404";
import { Helmet } from "react-helmet-async";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/config";
import { Link } from "react-router-dom";
import { sendEmailVerification } from "firebase/auth";
// Level 3
import "./Home.css";
import { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { MdOutlineTaskAlt } from "react-icons/md";
import Modal2 from "./Modal2";
import DataBaseViewer from "./DataBaseViewer";
import { useTranslation } from "react-i18next";

const Home = () => {
  const [array, setarray] = useState([]);
  const [subTask, setsubTask] = useState("");
  const [subTitle, setsubTitle] = useState("");
  const [ShowLoading, setShowLoading] = useState(false);
  const [TaskMassge, setTaskMassge] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [user, loading, error] = useAuthState(auth);
  const [ShowWarningMassge, setShowWarningMassge] = useState(false);
  const TimeId = new Date().getTime();
  const { t } = useTranslation();

  //Functions..........................
  const closeModal = () => {
    setshowModal(false);
  };

  const InputTitle = (eo) => {
    setsubTitle(eo.target.value);
  };

  const InputArray = (eo) => {
    setsubTask(eo.target.value);
  };

  const addBTN = (eo) => {
    eo.preventDefault();
    setShowWarningMassge(false);

    if (array.includes(subTask)) {
      setShowWarningMassge(true);
    } else array.push(subTask);
    console.log(array);
    setsubTask("");
  };

  const InputSubmit = async (eo) => {
    eo.preventDefault();
    setShowLoading(true);
    await setDoc(doc(db, user.uid, `${TimeId}`), {
      Title: subTitle,
      details: array,
      id: TimeId,
      completed: false,
    });

    setarray([]);
    setsubTitle("");
    setsubTask("");
    setShowLoading(false);
    setshowModal(false);
    setTaskMassge(true);
    setTimeout(() => {
      setTaskMassge(false);
    }, 3000);
  };

  const sendAgain = () => {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email verification sent!");
      // ...
    });
  };

  //.............................

  if (error) {
    return <Erroe404 />;
  }

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <>
        <Helmet>
          <title>HOME Page</title>
          <style type="text/css">{`.Light main h1 span{color: #222}   `}</style>
        </Helmet>

        <Header />

        <main>
          <p dir="auto" className="pls">
            {t("Please")} {""}
            <Link style={{ fontSize: "30px" }} to="/signin">
            {t("Sign-in")}
            </Link>{" "}
            {t("to continue")}...{" "}
            <span>
              <i className="fa-solid fa-heart"></i>
            </span>
          </p>
        </main>

        <Footer />
      </>
    );
  }

  if (user) {
    if (!user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
            <meta name="description" content="HOMEEEEEEEEEEEE" />
          </Helmet>

          <Header />

          <main>
            <p>
              {" "}
              Welcome: {user.displayName}{" "}
              <span>
                <i className="fa-solid fa-heart"></i>{" "}
              </span>
            </p>

            <p>Please verify your email to continue ✋ </p>
            <button
              onClick={() => {
                sendAgain();
              }}
              className="delete"
            >
              Send email
            </button>
          </main>

          <Footer />
        </>
      );
    }

    if (user.emailVerified) {
      return (
        <>
          <Helmet>
            <title>HOME Page</title>
          </Helmet>

          <Header />

          <main className="home">
            {/* OPIONS (filtered data) */}

            {/* SHOW all tasks */}
            <DataBaseViewer user={user} />

            {/* Add new task BTN */}
            <section className="mt">
              <button
                onClick={() => {
                  setshowModal(true);
                }}
                className="add-task-btn"
                dir="auto"
              >
                {t("Add new task")} <i className="fa-solid fa-plus"></i>
              </button>
            </section>

            {showModal && (
              <Modal2
                InputSubmit={InputSubmit}
                addBTN={addBTN}
                InputArray={InputArray}
                InputTitle={InputTitle}
                closeModal={closeModal}
                subTitle={subTitle}
                subTask={subTask}
                array={array}
                ShowLoading={ShowLoading}
                ShowWarningMassge={ShowWarningMassge}
              />
            )}
          </main>

          <p
            style={{ right: TaskMassge ? "20px" : "-1000px" }}
            className="TaskAlert"
          >
            {" "}
            {t("Task Added Successfully")} <MdOutlineTaskAlt />{" "}
          </p>

          <Footer />
        </>
      );
    }
  }
};

export default Home;
