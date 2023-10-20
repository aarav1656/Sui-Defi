import { DeepBookClient } from "@mysten/deepbook";
import { useState } from 'react';
import { PrimaryButton } from "../ethos_components";

const CreatePool = () => {
    const client = new DeepBookClient();

    const [formValues, setFormValues] = useState({
        token1: "",
        token2: "",
        tickSize: "",
        lotSize: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Call createPool with the formValues
        const { token1, token2, tickSize, lotSize } = formValues;

        // Call createPool function here with the provided formValues
        //@ts-ignore
        const transactionBlock = client.createPool(token1, token2, parseInt(tickSize), parseInt(lotSize));
        console.log(transactionBlock);
    };

    return (
        <div className="flex justify-between items-start">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="token1">Token 1</label>
                    <input
                        type="text"
                        id="token1"
                        name="token1"
                        value={formValues.token1}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="token2">Token 2</label>
                    <input
                        type="text"
                        id="token2"
                        name="token2"
                        value={formValues.token2}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="tickSize">Tick Size</label>
                    <input
                        type="text"
                        id="tickSize"
                        name="tickSize"
                        value={formValues.tickSize}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="lotSize">Lot Size</label>
                    <input
                        type="text"
                        id="lotSize"
                        name="lotSize"
                        value={formValues.lotSize}
                        onChange={handleChange}
                    />
                </div>
                <PrimaryButton type="submit">Create Pool</PrimaryButton>
            </form>
        </div>
    );
};

export default CreatePool;
