import React, { useState, useEffect } from "react";
import "tailwindcss/tailwind.css";

const ExchangeRateApp = () => {
  const [rateList, setRateList] = useState([]); // 保存匯率資料
  const [selectedCurrency, setSelectedCurrency] = useState(""); // 保存選中的貨幣名稱
  const [selectedRate, setSelectedRate] = useState(null); // 保存選中的匯率資料

  const [val, setVal] = useState(""); // 保存輸入的金額
  const [result, setResult] = useState(0); // 保存換算後的金額

  useEffect(() => {
    fetch("/ExchangeRate.json") //匯率 JSON 路徑
      .then((response) => {
        if (!response.ok) throw new Error("連線失敗");
        return response.json();
      })
      .then((res) => {
        //fetch成功執行以下程式
        const ratesArray = Object.entries(res).map(([currency, data]) => ({
          //將物件轉換為陣列
          currency,
          ...data,
        }));
        setRateList(ratesArray); //將資料存入rateList
        setSelectedCurrency(ratesArray[0]?.currency || ""); //如果有資料就選擇第一筆資料，否則選擇空字串
        setSelectedRate(ratesArray[0] || null); //如果有資料就選擇第一筆資料，否則選擇null
      })
      .catch(() => alert("讀取匯率資料失敗!"));
  }, []);

  const handleCurrencyChange = (currency) => {
    const rate = rateList.find(({ currency: c }) => c === currency); //找出選中的那一筆資料
    setSelectedCurrency(currency); //設定選中的貨幣名稱
    setSelectedRate(rate); //設定選中的匯率資料
  };

  return (
    <div className=" my-5 px-2 text-center max-w-[576px] mx-auto">
      <div className=" py-5 rounded-3 bg-[#91ad70]">
        <h1 className="my-3 fs-lg-1 fw-bolder text-white">匯率查詢</h1>
        <select
          className="my-2 p-1 rounded w-[180px]"
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
            <h2 className="text-white">{selectedRate.currency}</h2>
            <p className="text-white">匯率：{selectedRate.Exrate}</p>
            <p className="text-white">更新時間：{selectedRate.UTC}</p>
            <div className="d-flex justify-content-center items-align-center">
              <div className="d-flex justify-content-center items-align-center px-2 rounded-start bg-white">
                <p className="m-1">USD</p>
              </div>
              <div className="flex">
                <input
                  className=""
                  type="number"
                  value={val}
                  onChange={(e) => setVal(e.target.value)}
                  placeholder="請輸入金額"
                />

                <button
                  className=" rounded-end bg-[#f0f0f0]"
                  onClick={() => setResult(val * selectedRate.Exrate)}
                >
                  計算
                </button>
              </div>
            </div>
            <p className="my-3 text-white">
              換算結果：{result.toFixed(2)} {selectedRate.currency.slice(-3)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExchangeRateApp;
