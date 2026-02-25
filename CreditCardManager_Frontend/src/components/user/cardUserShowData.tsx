import { User } from "lucide-react";

import type { CardUserDTO } from "../../api/dtos/cardUsersDtos";

import { formatCurrencyValue } from "../../utils/formatters";

import useModalContext from "../../hooks/useModalContext";
import CardUserDefinitions from "./cardUserDefinitions";

function CardUserShowData({ cardUser }: { cardUser: CardUserDTO }) {
	const { openModal } = useModalContext();

	const formattedTotalAmount = formatCurrencyValue(cardUser.totalAmount);
	const formattedAmountToPay = formatCurrencyValue(cardUser.amountToPay);

	const handleClick = () => {
		openModal(<CardUserDefinitions cardUser={cardUser} />);
	};

	return (
		<li className="rounded-lg border-2 delay-150 hover:scale-105 transition-all duration-200 ease-in-out border-light-gray dark:border-dark-slate hover:bg-light-gray dark:hover:bg-dark-slate shadow-opaque shadow-md">
			<button
				type="button"
				onClick={handleClick}
				className="block w-30 h-42 px-2 pt-2 pb-1 cursor-pointer ">
				<figure>
					<User className="mx-auto" size={"4rem"} />
				</figure>
				<div className="text-center text-sm [&>p]:mt-1 [&>p]:overflow-hidden [&>p]:text-ellipsis [&>p]:whitespace-nowrap">
					<p title={cardUser.userName}>{cardUser.userName}</p>
					<p>
						<strong>{formattedTotalAmount}</strong>
					</p>
					<p>
						<strong className="text-red">
							{formattedAmountToPay}
						</strong>
					</p>
				</div>
			</button>
		</li>
	);
}

export default CardUserShowData;
