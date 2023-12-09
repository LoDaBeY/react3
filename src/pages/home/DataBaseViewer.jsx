import { useCollection } from "react-firebase-hooks/firestore";
import { collection } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import Moment from "react-moment";

//this is the file to show the tasks one by one

function DataBaseViewer({ user }) {
  const [value, loading, error] = useCollection(collection(db, user.uid));

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

  // when you find a data in the data base, please note that you need to do a 2.map inside the first map to get the data of the details from the data base.

  if (value) {
    return (
      <section className="flex all-tasks mt">
        {value.docs.map((item) => {
          return (
            //put the key in the biggest item
            <article key={item.id} dir="auto" className="one-task">
              <Link to={"/edit-task"}>
                <h2> {item.data().Title} </h2>
                <ul>
                  {item.data().details.map((item, index) => {
                    if (index < 3) {
                      return <li key={index}> {item} </li>;
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
    );
  }
}

export default DataBaseViewer;
