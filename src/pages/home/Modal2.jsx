import ReactLoading from "react-loading";
import Modal from "../../shared/Modal";
import { t } from "i18next";
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
  ShowWarningMassge
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
            {t("Add")}
          </button>
        </div>

        <ul>
          {array.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {ShowWarningMassge && (<p className="TextWarning"> {t("This Data has been already added before.")} </p>)}

        <button
          onClick={async (eo) => {
            InputSubmit(eo);
          }}
          dir="auto"
        >
          {ShowLoading ? (
            <ReactLoading
              type={"spinningBubbles"}
              color={"Blue"}
              height={20}
              width={20}
            />
          ) : t("Submit")}
        </button>
      </div>
    </Modal>
  );
}
