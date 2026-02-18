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
		<li className="w-36 h-fit rounded-lg border-2 delay-150 hover:scale-105 transition-all duration-200 ease-in-out border-light-gray hover:bg-dark-slate dark:border-dark-slate shadow-lg">
			<button
				type="button"
				onClick={handleClick}
				className="block w-full h-full cursor-pointer px-2 pt-2 pb-1">
				<figure>
					<User className="mx-auto" size={"4rem"} />
				</figure>
				<div className="text-center [&>p]:mt-1 [&>p]:overflow-hidden [&>p]:text-ellipsis">
					<p>{cardUser.userName}</p>
					<p className="font-bold">{formattedTotalAmount}</p>
					<p className="font-bold">
						<span className="text-red">{formattedAmountToPay}</span>
						<br /> à pagar
					</p>
				</div>
			</button>
		</li>
	);
}

export default CardUserShowData;
