import { useDocument } from "react-firebase-hooks/firestore";
 import { doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";
import Moment from "react-moment";
function Tasks({userId, user}) {
  const [value, loading, error] = useDocument(doc(db, user.uid, userId));

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
      <p className="time">Created: <Moment fromNow date={value.data().id}/> </p>  
      <div>
        <input id="checkbox" type="checkbox" />
        <label htmlFor="checkbox">Completed </label>
      </div>
    </div>

    <ul>
{value.data().details.map((item) => { 
  return (
    <li key={item} className="card-task flex">
    <p> {item} </p>
    <i className="fa-solid fa-trash"></i>
  </li>
  )
 })}


    </ul>
  </section>
  )
}
}

export default Tasks