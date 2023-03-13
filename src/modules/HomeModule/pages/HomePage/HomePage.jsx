import { React, useState, useEffect } from "react";
import refresh from "../../../../assets/images/refresh.png";
import copy from "../../../../assets/images/copy.png";
import "./HomePage.scss";

const HomePage = () => {
  const [checkbox, setCheckbox] = useState(3);
  const [password, setPassword] = useState("");
  const [checkboxName, setCheckboxName] = useState([
    "uppercase",
    "numers",
    "symbols",
  ]);
  const [range, setRange] = useState(6);
  const [strength, setStrength] = useState("");

  useEffect(() => {
    generatePassword(range);
  }, [checkboxName]);

  useEffect(() => {
    checkStrength();
  }, [range, checkboxName]);

  const checkFunction = (event) => {
    if (event.target.checked) {
      setCheckbox(checkbox + 1);
      setCheckboxName((current) => [...current, event.target.name]);
    } else if (!event.target.checked && checkbox > 1) {
      setCheckbox(checkbox - 1);
      const filteredArray = checkboxName.filter(
        (item) => item !== event.target.name
      );
      setCheckboxName(filteredArray);
    }
    if (checkbox <= 1) {
      event.target.checked = true;
    }
  };

  const generatePassword = (value) => {
    const UpLetters = "ABCDEFGHIJKLMNOPRQRSTUVWYXYZ";
    const LowLetters = "abcdefghijklmnopqrstuvwxyz";
    const numers = "1234567890";
    const symbols = "!@#$%^&*()";
    let length = value || 6;
    let chartSettings = "";

    checkboxName.some((element) => {
      if (element === "uppercase") {
        chartSettings += UpLetters;
      }
      if (element === "lowercase") {
        chartSettings += LowLetters;
      }
      if (element === "numers") {
        chartSettings += numers;
      }
      if (element === "symbols") {
        chartSettings += symbols;
      }
    });

    let pass = "";

    for (let i = 1; i <= length; i++) {
      let randomNumber = Math.floor(Math.random() * chartSettings.length);
      pass += chartSettings.substring(randomNumber, randomNumber + 1);
    }

    setPassword(pass);
  };

  const checkStrength = () => {
    const els = document.getElementsByClassName("active");
    if (els.length <= 2) {
      Array.from(els).forEach((el) => {
        el.classList.add("red");
        el.classList.remove("yellow");
        el.classList.remove("green");
      });
      setStrength("Low password strength");
    } else if (els.length == 3) {
      Array.from(els).forEach((el) => {
        el.classList.add("yellow");
        el.classList.remove("green");
        el.classList.remove("red");
      });
      setStrength("Average password strength");
    } else if (els.length == 4) {
      Array.from(els).forEach((el) => {
        el.classList.add("green");
        el.classList.remove("red");
        el.classList.remove("yellow");
      });
      setStrength("High password strength");
    }
  };

  const onChangeFunction = (e) => {
    const el = e.target;
    el.style.setProperty("--value", el.value);
    el.style.setProperty("--min", el.min === "" ? "0" : el.min);
    el.style.setProperty("--max", el.max === "" ? "100" : el.max);
    el.style.setProperty("--value", el.value);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(password);
  };

  return (
    <div className="generator">
      <div className="generator__generator-container">
        <div className="generator__header">
          <h1>Password Generator</h1>
        </div>
        <div className="generator__bar-container">
          <div className="generator__bar-container-top">
            <div>Character Length</div>
            <div style={{ fontSize: "24px" }}>{range}</div>
          </div>
          <div className="generator__range">
            <input
              onChange={(e) => {
                generatePassword(e.target.value),
                  setRange(e.target.value),
                  onChangeFunction(e);
              }}
              value={range}
              type="range"
              id="slider"
              className="styled-slider"
              min={6}
              max={16}
            />
          </div>
        </div>

        <div className="generator__options-container">
          <form>
            <div className="generator__options-container-element">
              <div>
                <input
                  onChange={(e) => {
                    checkFunction(e);
                    if (checkbox > 1) {
                      generatePassword(range);
                    }
                  }}
                  type="checkbox"
                  defaultChecked
                  id="uppercase"
                  name="uppercase"
                />
              </div>
              <div>Include Uppercase Letter</div>
            </div>
            <div className="generator__options-container-element">
              <div>
                <input
                  onChange={(e) => {
                    checkFunction(e);
                    if (checkbox > 1) {
                      generatePassword(range);
                    }
                  }}
                  type="checkbox"
                  id="lowercase"
                  name="lowercase"
                />
              </div>
              <div>Include Lowercase Letter</div>
            </div>
            <div className="generator__options-container-element">
              <div>
                <input
                  onChange={(e) => {
                    checkFunction(e);
                    if (checkbox > 1) {
                      generatePassword(range);
                    }
                  }}
                  type="checkbox"
                  defaultChecked
                  id="numers"
                  name="numers"
                />
              </div>
              <div>Include Numers</div>
            </div>
            <div className="generator__options-container-element">
              <div>
                <input
                  onChange={(e) => {
                    checkFunction(e);
                    if (checkbox > 1) {
                      generatePassword(range);
                    }
                  }}
                  type="checkbox"
                  defaultChecked
                  id="symbols"
                  name="symbols"
                />
              </div>
              <div>Include Symbols</div>
            </div>
          </form>
        </div>

        <div className="generator__bar-strenght">
          <div className="generator__bar-strenght-top">
            <div>Strengtht</div>
            <div style={{ color: "#808080", fontSize: "14px" }}>{strength}</div>
          </div>
          <div className="generator__bar">
            <div
              className={`generator__bar-element ${
                checkboxName.length >= 1 && range >= 9 ? "active" : ""
              }`}
            />
            <div
              className={`generator__bar-element ${
                checkboxName.length >= 2 && range >= 12 ? "active" : ""
              }`}
            />
            <div
              className={`generator__bar-element ${
                checkboxName.length >= 3 && range >= 14 ? "active" : ""
              }`}
            />
            <div
              className={`generator__bar-element ${
                checkboxName.length == 4 && range >= 16 ? "active" : ""
              }`}
            />
          </div>
        </div>

        <div className="generator__result-container">
          <div className="generator__result">
            <div>{password}</div>
            <button
              onClick={() => generatePassword(range)}
              className="generator__result-button"
            >
              <img src={refresh} />
            </button>
          </div>
        </div>

        <div className="generator__submit-button">
          <button onClick={copyPassword}>
            <div>
              <img src={copy} />
            </div>
            <div>Copy password</div>
          </button>
        </div>
      </div>
    </div>
  );
};

export { HomePage };
