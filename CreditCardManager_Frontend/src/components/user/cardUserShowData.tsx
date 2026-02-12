import { useState } from "react";
import { User } from "lucide-react";

import type { CardUserDTO } from "../../api/dtos/cardUsersDtos";
import AbsoluteContainer from "../absoluteContainer";
import CardUserDefinitions from "./cardUserDefinitions";

interface CardUserShowDataProps {
	cardUser: CardUserDTO;
}

function CardUserShowData({ cardUser }: CardUserShowDataProps) {
	const [showCardUserDefinitions, setShowCardUserDefinitions] =
		useState<boolean>(false);
	return (
		<li className="max-w-32 h-fit rounded-lg border-2 border-light-gray dark:border-dark-slate shadow-lg">
			<button
				type="button"
				onClick={() => setShowCardUserDefinitions(true)}
				className="block w-full h-full cursor-pointer px-2 pt-2 pb-1">
				<figure>
					<User className="mx-auto" size={"4rem"} />
				</figure>
				<div className="text-center [&>p]:mt-1 [&>p]:overflow-hidden [&>p]:text-ellipsis">
					<p>{cardUser.userName}</p>
					<p>{cardUser.debtsCount} registros</p>
					<p className="text-red">
						{cardUser.pendingDebts} Dívidas Pendentes
					</p>
				</div>
			</button>

			{showCardUserDefinitions && (
				<AbsoluteContainer>
					<CardUserDefinitions
						cardUserData={cardUser}
						handleCardUserDefinitions={() =>
							setShowCardUserDefinitions(false)
						}
					/>
				</AbsoluteContainer>
			)}
		</li>
	);
}

export default CardUserShowData;
