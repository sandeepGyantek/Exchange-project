import { Tabs, Tab } from "react-bootstrap";
import { useState, useEffect } from "react";


export default function MarketHistory() {
  const [data, setData] = useState();
  function msToTime(duration) {
    var milliseconds = parseInt((duration % 1000) / 100),
      seconds = Math.floor((duration / 1000) % 60),
      minutes = Math.floor((duration / (1000 * 60)) % 60),
      hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    return hours + ":" + minutes + ":" + seconds;
  }
  useEffect(() => {
    setInterval(function () {
      const fetchData = async () =>{
        const response = await fetch("https://api3.binance.com/api/v3/trades?symbol=BTCUSDT")
        const res = await response.json();
        // console.log(res);
        setData(res);
      }
      fetchData();
    }, 10000);

  }, []);
  return (
    <>
      <div className='market-history'>
        <Tabs defaultActiveKey='recent-trades'>
          <Tab eventKey='recent-trades' title='Recent Trades'>
            <table className='table'>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Price(BTC)</th>
                  <th>Amount(ETH)</th>
                </tr>
              </thead>
              <tbody>
                {!data ? (
                  <p>loading...</p>
                ) : (
                  data.map((data, index) => {
                    return (
                      <tr>
                        <td>{msToTime(data.time)}</td>
                        <td className='red'>{data.price}</td>
                        <td>{data.qty}</td>
                      </tr>
                    );
                  })
                )}
                {/* <tr>
                  <td>13:03:53</td>
                  <td className='red'>0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className='green'>0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className='green'>0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className='red'>0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className='green'>0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className='green'>0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className='green'>0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className='red'>0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className='red'>0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className='green'>0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className='green'>0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className='red'>0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className='green'>0.020191</td>
                  <td>0.2155045</td>
                </tr>
                <tr>
                  <td>13:03:53</td>
                  <td className='red'>0.020191</td>
                  <td>0.2155045</td>
                </tr> */}
              </tbody>
            </table>
          </Tab>
        </Tabs>
      </div>
    </>
  );
}
