import React, { useState } from "react";
import styles from "./Calculator.module.css";

const Calculator = () => {
  const [displayValue, setDisplayValue] = useState("");
  const [expression, setExpression] = useState("");
  const [isResult, setIsResult] = useState(false);

  const handleButtonClick = (value) => {
    if (isResult) {
      if (value === "=") {
        return;
      }
      setDisplayValue(value);
      setExpression(value);
      setIsResult(false);
    } else {
      setExpression(expression + value);
      setDisplayValue(displayValue + value);
    }
  };

  const calculateResult = () => {
    try {
      const result = evaluateExpression(displayValue);
      setDisplayValue(result.toString());
      setIsResult(true);
    } catch (error) {
      setDisplayValue("Ошибка");
      setIsResult(true);
    }
  };

  const evaluateExpression = (expression) => {
    let result = 0;
    let currentNumber = "";
    let currentOperator = "+";

    for (let i = 0; i < expression.length; i++) {
      const char = expression.charAt(i);

      if (char.match(/[0-9]/)) {
        currentNumber += char;
      } else if (char === "+" || char === "-") {
        result = calculate(result, parseInt(currentNumber), currentOperator);
        currentNumber = "";
        currentOperator = char;
      } else {
        throw new Error("Ошибка");
      }
    }

    result = calculate(result, parseInt(currentNumber), currentOperator);

    return result;
  };

  const calculate = (first, second, operator) => {
    if (operator === "+") {
      return first + second;
    } else if (operator === "-") {
      return first - second;
    }
  };

  const clearDisplay = () => {
    setExpression("");
    setDisplayValue("");
    setIsResult(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.display}>
        {isResult ? (
          <span className={styles.result}>{displayValue}</span>
        ) : (
          displayValue
        )}
      </div>
      <div className={styles.buttons}>
        {[1, 2, 3, "+", 4, 5, 6, "-", 7, 8, 9, "=", 0, "C"].map((item) => (
          <div
            key={item}
            className={styles.button}
            onClick={() => {
              if (Number.isInteger(item)) {
                handleButtonClick(item.toString());
              } else if (item === "+") {
                handleButtonClick("+");
              } else if (item === "-") {
                handleButtonClick("-");
              } else if (item === "=") {
                calculateResult();
              } else if (item === "C") {
                clearDisplay();
              }
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
