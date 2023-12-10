import { useDocument } from "react-firebase-hooks/firestore";
 import { doc } from "firebase/firestore";
import { db } from "../../firebase/config";
import ReactLoading from "react-loading";

 
function TaskTitle({userId, user}) {
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
    <section className="title center">
    <h1>
      <input
        defaultValue={value.data().Title}
        className="title-input center"
        type="text"
        onChange={(eo) => {  }}
      />
      <i className="fa-regular fa-pen-to-square"></i>
    </h1>
  </section>
  )
}

}

export default TaskTitle