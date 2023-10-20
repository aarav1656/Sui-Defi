// Copyright (c) Mysten Labs, Inc.
// SPDX-License-Identifier: Apache-2.0

import { Tab } from '@headlessui/react';
import { formatAddress } from '@mysten/sui.js/utils';
import { useWalletKit } from '@mysten/wallet-kit';
import { useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { DeepBookClient } from "@mysten/deepbook";
import { useKioskDetails } from '../../hooks/kiosk';
import { useWithdrawMutation } from '../../mutations/kiosk';
import { TANSTACK_KIOSK_DATA_KEY } from '../../utils/constants';
import { formatSui, mistToSui } from '../../utils/utils';
import { Button } from '../Base/Button';
import { ExplorerLink } from '../Base/ExplorerLink';
import { Loading } from '../Base/Loading';
import { OwnedObjects } from '../Inventory/OwnedObjects';
import { KioskItems } from './KioskItems';
import Choose from '../Choose';
import CreatePool from '../Swap';
import DepositBaseComponent from '../DepositBaseComponent';

export function KioskData({ kioskId }: { kioskId: string }) {
	const { currentAccount } = useWalletKit();
	const client = new DeepBookClient();
	const { data: kiosk, isLoading } = useKioskDetails(kioskId);

	const queryClient = useQueryClient();

	const withdrawMutation = useWithdrawMutation({
		onSuccess: () => {
			toast.success('Profits withdrawn successfully');
			// invalidate query to refetch kiosk data and update the balance.
			queryClient.invalidateQueries([TANSTACK_KIOSK_DATA_KEY, kioskId]);
		},
	});

	const profits = formatSui(mistToSui(kiosk?.profits));

	if (isLoading) return <Loading />;
	return (
		<div className="container">
			<div className="my-12 ">
				<div className='text-2xl'>Do More With your NFTs</div>
				{kiosk && (
					<div className="gap-5 items-center">
						<div>
							Selected Kiosk: {<ExplorerLink text={formatAddress(kiosk.id)} object={kiosk.id} />}
						</div>
						<div className="mt-2">
							Owner (displayed): (
							<ExplorerLink text={formatAddress(kiosk.owner)} address={kiosk.owner} />)
						</div>
						<div className="mt-2">Items Count: {kiosk.itemCount}</div>
						<div className="mt-2">
							Profits: {profits} SUI
							{Number(kiosk.profits) > 0 && (
								<Button
									loading={withdrawMutation.isLoading}
									className=" ease-in-out duration-300 rounded border border-transparent px-4 bg-gray-200 text-xs !py-1 ml-3"
									onClick={() => withdrawMutation.mutate(kiosk)}
								>
									Withdraw all
								</Button>
							)}
						</div>
						<div className="mt-2">UID Exposed: {kiosk.allowExtensions.toString()} </div>
						<button
							className="mt-2 ease-in-out duration-300 rounded border border-transparent px-4 bg-gray-200 text-xs !py-1"
							onClick={() => {
								const ack = client.createAccount(currentAccount?.address);
								alert("Customer account created. Please check your wallet to confirm.");
								console.log(ack);
							}}
						>
							Create Custodial Account
						</button>
					</div>
				)}
			</div>

			<Tab.Group vertical defaultIndex={0}>
				<Tab.List>
					<Tab className="tab-title">My Kiosk</Tab>
					<Tab className="tab-title">My Wallet</Tab>
					<Tab className="tab-title">Place Orders</Tab>
					<Tab className="tab-title">CreatePool</Tab>
					<Tab className="tab-title">Lend</Tab>
					<Tab className="tab-title">Borrow</Tab>
					<Tab className="tab-title">My Loans</Tab>
				</Tab.List>
				<Tab.Panels>
					<Tab.Panel>{kioskId && <KioskItems kioskId={kioskId}></KioskItems>}</Tab.Panel>
					<Tab.Panel>
						{currentAccount && (
							<OwnedObjects kioskId={kioskId} address={currentAccount.address}></OwnedObjects>
						)}
					</Tab.Panel>
					<Tab.Panel> <Choose /> </Tab.Panel>
					<Tab.Panel> <CreatePool /> </Tab.Panel>
					<Tab.Panel> <DepositBaseComponent /> </Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
