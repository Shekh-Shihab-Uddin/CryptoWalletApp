import { useState } from "react";
import "./Main.css";

function SendEther({web3, account}) {


  const [receipt, setReceipt] = useState({});
  const [toggle, setToggle] = useState(false);

const sendEther = async (event)=>{

    event.preventDefault();
    console.log(account)
    console.log("Ok")
    const _to = document.querySelector("#to");
    const _value = document.querySelector("#value");
    const weiValue = web3.utils.toWei(_value.value,"ether");

    // console.log(weiValue);

    web3.eth.sendTransaction({
      from: account,
      to: _to.value,
      value: weiValue,
    }).then(function(receipt){
      setReceipt(receipt);
      setToggle(true);
    })
  }
  return (
    <>
      <form className="box" onSubmit={sendEther}>
        <p className="label">
          <label htmlFor="">Enter Receiver's Address</label>
          <input className="receiver" type="text" id="to"></input>
        </p>

        <p className="label">
          <label htmlFor="">Enter Amount to Send (Ether)</label>
          <input className="receiver" type="text" id="value"></input>
        </p>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      <div className="box">
  <pre className="json">
    <h3>(Json Response)</h3>
    <code>
      {toggle &&
        JSON.stringify(
          {
            transactionHash: receipt.transactionHash,
            blockHash: receipt.blockHash,
            blockNumber: receipt.blockNumber.toString(), // Convert BigInt to string
            gasUsed: receipt.gasUsed.toString(), // Convert BigInt to string
          },
          null,
          2
        )}
    </code>
  </pre>
</div>

    </>
  );
}

export default SendEther;
