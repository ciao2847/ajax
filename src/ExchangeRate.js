import React, { useState, useEffect } from "react";

const ExchangeRateApp = () => {
  const [rateList, setRateList] = useState([]); // 保存匯率資料
  const [selectedCurrency, setSelectedCurrency] = useState(""); // 保存選中的貨幣名稱
  const [selectedRate, setSelectedRate] = useState(null); // 保存選中的匯率資料

  useEffect(() => {
    fetch("./ExchangeRate.json") //匯率 JSON 路徑
      .then((response) => {
        if (!response.ok) throw new Error("連線失敗");
        return response.json();
      })
      .then((res) => {
        //fetch成功執行以下程式
        const ratesArray = Object.entries(res).map(([currency, data]) => ({
          currency,
          ...data,
        }));
        setRateList(ratesArray);
        setSelectedCurrency(ratesArray[0]?.currency || "");
        setSelectedRate(ratesArray[0] || null);
      })
      .catch(() => alert("讀取匯率資料失敗!"));
  }, []);

  const handleCurrencyChange = (currency) => {
    const rate = rateList.find(({ currency: c }) => c === currency);
    setSelectedCurrency(currency);
    setSelectedRate(rate);
  };

  return (
    <div>
      <h1 className="">匯率查詢</h1>
      <select
        onChange={(e) => handleCurrencyChange(e.target.value)}
        value={selectedCurrency}
      >
        {rateList.map(({ currency }) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>

      {selectedRate && (
        <div>
          <h2>{selectedRate.currency}</h2>
          <p>匯率：{selectedRate.Exrate}</p>
          <p>更新時間：{selectedRate.UTC}</p>
        </div>
      )}
    </div>
  );
};

export default ExchangeRateApp;
