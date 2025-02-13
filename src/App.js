import React, { Component } from "react";
import "./App.css";
/* 
function App() {
  const [content, setContent] = useState("");

  function getData(PageName) {
    const req = new XMLHttpRequest();
    req.open("get", "./" + PageName);
    req.onload = function () {
      setContent(this.responseText);
    };
    req.send();
  }

  // 使用 useEffect 模擬 onLoad 行為
  useEffect(() => {
    getData("Popular.html"); // 組件載入時載入 Popular.html
  }, []); // 空依賴陣列，確保只執行一次

  return (
    <div className="App">
      <span onClick={() => getData("Popular.html")}>熱門</span>
      <span onClick={() => getData("New.js")}>最新</span>
      <hr />
      <div id="content">{content}</div>
    </div>
  );
} */

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      percent: "30%",
    };
    this.changePercent = this.changePercent.bind(this);
  }

  changePercent() {
    this.setState({ percent: "70%" });
  }

  render() {
    return (
      <div>
        {/* <div
          className="progress-back"
          style={{
            backgroundColor: "rgba(0,0,0,0.2)",
            width: "200px",
            height: "7px",
            borderRadius: "10px",
          }}
        >
          <div
            className="progress-bar"
            style={{
              backgroundColor: "#fe5196",
              width: this.state.percent,
              height: "100%",
              borderRadius: "10px",
            }}
          ></div>
        </div>
        <button onClick={this.changePercent}>轉換百分比 </button> */}
      </div>
    );
  }
}

export default App;
