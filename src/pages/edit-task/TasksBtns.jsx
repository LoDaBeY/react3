
function TasksBtns({userId, user}) {
  return (
    <section className="center mtt">
          <button className="add-more-btn">
            Add more <i className="fa-solid fa-plus"></i>
          </button>

          <div>
            <button className="delete">Delete task</button>
          </div>
        </section>
  )
}

export default TasksBtns