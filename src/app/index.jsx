import Button from "../components/button";
import styles from "./styles.module.scss";
import React, { useEffect, useState } from "react";
import CurrencySelect from "../components/currency-select";
import img from "../assets/icon/7133490.png";
import Input from "../components/input";
import { API, REQUEST_HEADERS } from "../api/endpoints";


function App() {
  const [fromOption, setFromOption] = useState(null);
  const [toOption, setToOption] = useState(null);
  const [symbolsOptions, setSymbolsOptions] = useState([]);
  const [amountInput, setAmountInput] = useState("");
  const [result, setResult] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false)
  const [isLoadingBtn, setIsLoadingBtn] = useState(false)




  const getSymbols = async () => {
    const res = await fetch(API.CURRENCY.symbols, REQUEST_HEADERS);
    const data = await res.json();
    return data.symbols;
  };

  const transformSymbolsDataToOptions = (symbolsObj) => {
    return Object.keys(symbolsObj).map((item) => {
      return {
        value: item,
        label: item,
      };
    });
  };

  const handleConvertCurrency = async () => {
    if (!amountInput || !toOption || !fromOption) {
      return;
    }
    try {
      setIsDisabled(true)
      setIsLoadingBtn(true)
      const res = await fetch(
        API.CURRENCY.convert(toOption.value, fromOption.value, amountInput),
        REQUEST_HEADERS
      );
      const data = await res.json();
      setResult({
        amount: data.query.amount,
        result: data.result,
        from: data.query.from,
        to: data.query.to,
      });  
    } catch (error) {
      console.error("Ошибка при обработке запроса:", error);
    } finally {
      setIsDisabled(false)
      setIsLoadingBtn(false)
    }
  };

  const handleSwitchClick = () => {
    setFromOption(toOption);
    setToOption(fromOption);
  };

  // useEffect(() => {
  //   (async () => {
  //     const symbols = await getSymbols();
  //     const options = transformSymbolsDataToOptions(symbols);
  //     setSymbolsOptions(options);
  //   })();
  // }, []);

  return (
    
    <div className={styles["currency-converter-wrap"]}>
      <div className={styles["title"]}>
        <h1 className={styles["title-text"]}>Currency Converter</h1>
      </div>
      <Input
        type="number"
        value={amountInput}
        label="Enter amount"
        onChange={e => setAmountInput(e.target.value)}
        disabled={isDisabled}
      />
      <div className={styles["custom-select-box"]}>
        <CurrencySelect
          label="From"
          value={fromOption}
          onChange={(val) => setFromOption(val)}
          options={symbolsOptions}
        />
        <div onClick={handleSwitchClick}>
          <img className={styles['switchIcon']}src={img} alt="" />
        </div>
        <CurrencySelect
          label="To"
          value={toOption}
          onChange={(val) => setToOption(val)}
          options={symbolsOptions}
        />
      </div>
      <div className={styles["result-text"]}>
      Result: {result && `${amountInput} ${result.from} = ${result.result} ${result.to}`}
      </div>
      <Button 
        disabled={!amountInput || !fromOption || !toOption || isDisabled}
        onClick={handleConvertCurrency} className={styles["convert-btn"]}
      >
        {isLoadingBtn ? <span>Please wait...</span> : <span>Convert</span> }
      </Button>
      
    </div>
  );
}

export default App;
