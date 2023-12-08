import ReactLoading from "react-loading";
import Modal from "../../shared/Modal";
export default function Modal2({
  InputSubmit,
  addBTN,
  InputArray,
  InputTitle,
  closeModal,
  subTitle,
  subTask,
  array,
  ShowLoading,
}) {
  return (
    <Modal closeModal={closeModal}>
      <div style={{ textAlign: "left" }}>
        <input
          value={subTitle}
          onChange={(eo) => {
            InputTitle(eo);
          }}
          required
          placeholder=" Add title : "
          type="text"
        />

        <div>
          <input
            value={subTask}
            onChange={(eo) => {
              InputArray(eo);
            }}
            placeholder=" details "
            type="email"
          />

          <button
            onClick={(eo) => {
              addBTN(eo);
            }}
          >
            Add
          </button>
        </div>

        <ul>
          {array.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <button
          onClick={async (eo) => {
            InputSubmit(eo);
          }}
        >
          {ShowLoading ? (
            <ReactLoading
              type={"spinningBubbles"}
              color={"Blue"}
              height={20}
              width={20}
            />
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </Modal>
  );
}
