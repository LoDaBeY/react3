
function TasksBtns({ DeleteAllTask, userId, user }) {

  return (
    <section className="center mtt">
      <div>
        <button
          onClick={(eo) => {
            eo.preventDefault();
            DeleteAllTask();
          }}
          className="delete"
        >
          Delete task
        </button>
      </div>
    </section>
  );
}

export default TasksBtns;
