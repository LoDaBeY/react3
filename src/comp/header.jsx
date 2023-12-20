import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { MdDone } from "react-icons/md";
import { useTranslation } from "react-i18next";

const Header = () => {
  const [user] = useAuthState(auth);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { t, i18n } = useTranslation();

  return (
    <div className="myheader">
      <header className="hide-when-mobile ali ">
        <h1>
          <Link to="/"> {t("LoDaBeyTestSite")} </Link>
        </h1>

        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>

        <ul className="flex">
          <li className="main-list lang">
            <p>{t("Language")}</p>
            <ul className="Lang">
              <li
                onClick={() => {
                  i18n.changeLanguage("AR");
                }}
                className="flex"
                dir="rtl"
              >
                العربية {i18n.language === "AR" ? <MdDone /> : null}
              </li>
              <li
                onClick={() => {
                  i18n.changeLanguage("EN");
                }}
              >
                English {i18n.language === "EN" ? <MdDone /> : null}
              </li>
              <li
                onClick={() => {
                  i18n.changeLanguage("TR");
                }}
              >
                Turkish {i18n.language === "TR" ? <MdDone /> : null}
              </li>
            </ul>
          </li>

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                {t("Sign-in")}
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                {t("Sign-up")}
              </NavLink>
            </li>
          )}

          {user && (
            <li
              onClick={() => {
                signOut(auth)
                  .then(() => {
                    console.log("Sign-out successful.");
                  })
                  .catch((error) => {
                    // An error happened.
                  });
              }}
              className="main-list"
            >
              <button className="main-link signout">{t("Sign-out")}</button>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/about">
                {t("About")}
              </NavLink>
            </li>
          )}

          {user && (
            <li className="main-list">
              <NavLink className="main-link" to="/profile">
                {t("Profile")}
              </NavLink>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
