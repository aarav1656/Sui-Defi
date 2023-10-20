import { DeepBookClient } from "@mysten/deepbook"; // Import your TypeScript SDK
import { useState } from "react";

const PlaceLimitOrderComponent = () => {
    const client = new DeepBookClient(); // Initialize your SDK

    const [token1, setToken1] = useState("");
    const [token2, setToken2] = useState("");
    const [poolId, setPoolId] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [isBid, setIsBid] = useState<boolean>(true); // Default to buying
    const [expireTimestamp, setExpireTimestamp] = useState("");
    const [restriction, setRestriction] = useState("");
    const [accountCap, setAccountCap] = useState("");
    const [transactionSent, setTransactionSent] = useState(false);
    const [error, setError] = useState<string | null>(null);

    
    const handlePlaceLimitOrder = async () => {

        const a = isBid ? 'bid' : 'ask';
        try {
            // Call placeLimitOrder function with the provided parameters
            const transactionBlock = client.placeLimitOrder(
                poolId,
                BigInt(price),
                BigInt(quantity),
                a,
            );

            // Send the transaction
            console.log(transactionBlock);

            setTransactionSent(true);
            setError(null);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h1>Place Limit Order</h1>
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
                    <label htmlFor="price">Price</label>
                    <input
                        type="text"
                        id="price"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="quantity">Quantity</label>
                    <input
                        type="text"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="isBid">Is Bid (true for buying, false for selling)</label>
                    <select
                        id="isBid"
                        // @ts-ignore
                        value={isBid}
                        onChange={(e) => setIsBid(e.target.value === "true")}
                    >
                        <option value="true">Buy</option>
                        <option value="false">Sell</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="expireTimestamp">Expire Timestamp</label>
                    <input
                        type="text"
                        id="expireTimestamp"
                        value={expireTimestamp}
                        onChange={(e) => setExpireTimestamp(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="restriction">Restriction</label>
                    <input
                        type="text"
                        id="restriction"
                        value={restriction}
                        onChange={(e) => setRestriction(e.target.value)}
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
                <button onClick={handlePlaceLimitOrder}>Place Limit Order</button>
            </form>
            {transactionSent && <p>Transaction sent successfully!</p>}
            {error && <p>Error: {error}</p>}
        </div>
    );
};

export default PlaceLimitOrderComponent;
