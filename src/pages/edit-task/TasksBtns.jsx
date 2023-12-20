import { useTranslation } from "react-i18next";

function TasksBtns({ DeleteAllTask, userId, user }) {
  const { t } = useTranslation();

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
          {t( "Delete task")}
        </button>
      </div>
    </section>
  );
}

export default TasksBtns;
