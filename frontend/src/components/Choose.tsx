import PlaceLimitOrderComponent from "./LimitOrder";
import PlaceMarketOrderComponent from "./MarketOrder";
import { useState } from "react";
import { PrimaryButton } from "../ethos_components";
const Choose = () => {

    const[isLimitOrder, setIsLimitOrder] = useState(true);
    return (
        <div>
            <h1>Place Order</h1>
            <div className="flex gap-8">
                <PrimaryButton onClick={() => setIsLimitOrder(true)}>Place Limit Order</PrimaryButton>
                <PrimaryButton onClick={() => setIsLimitOrder(false)}>Place Market Order</PrimaryButton>
            </div>
            { isLimitOrder ? <PlaceLimitOrderComponent /> : <PlaceMarketOrderComponent />}
        </div>
    );
};

export default Choose;
