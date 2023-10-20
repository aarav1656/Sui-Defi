import { DeepBookClient } from "@mysten/deepbook";
import { useState } from "react";

const DepositBaseComponent = () => {
    const client = new DeepBookClient(); // Initialize your SDK
    const [token1, setToken1] = useState("");
    const [token2, setToken2] = useState("");
    const [poolId, setPoolId] = useState("");
    const [coin, setCoin] = useState("");
    const[amount, setAmount] = useState("");
    const [accountCap, setAccountCap] = useState("");
    const [transactionSent, setTransactionSent] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const handleDeposit = async () => {
        try {
            // Call depositBase function with the provided parameters
            const transactionBlock = client.deposit(poolId, coin, BigInt(amount));

           console.log(transactionBlock);

            setTransactionSent(true);
            setError(null);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div>
            <h1>Deposit Base Asset</h1>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="token1">Token 1</label>
                    <input
                        type="text"
                        id="token1"
                        value={token1}
                        onChange={(e) => setToken1(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="token2">Token 2</label>
                    <input
                        type="text"
                        id="token2"
                        value={token2}
                        onChange={(e) => setToken2(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="poolId">Pool ID</label>
                    <input
                        type="text"
                        id="poolId"
                        value={poolId}
                        onChange={(e) => setPoolId(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="coin">Coin</label>
                    <input
                        type="text"
                        id="coin"
                        value={coin}
                        onChange={(e) => setCoin(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="coin">Amount</label>
                    <input
                        type="text"
                        id="coin"
                        value={coin}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="accountCap">Account Capacity</label>
                    <input
                        type="text"
                        id="accountCap"
                        value={accountCap}
                        onChange={(e) => setAccountCap(e.target.value)}
                    />
                </div>
                <button onClick={handleDeposit}>Deposit Base Asset</button>
            </form>
            {transactionSent && <p>Transaction sent successfully!</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default DepositBaseComponent;
