import { useTranslation } from "react-i18next";
import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <div className="myfooter">
      <footer className="ali   ">
      {t("Footer")}
        <span>
          {" "}
          <i className="fa-solid fa-heart"></i>{" "}
        </span>
      </footer>
    </div>
  );
};

export default Footer;
