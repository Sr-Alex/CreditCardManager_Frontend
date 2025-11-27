import { CreditCard, Moon } from "lucide-react";

function Header() {
	return (
		<header>
			<div className="flex flex-center" style={{ gap: "0.5rem" }}>
				<div
					className="icon-container rounded"
					style={{
						padding: "1rem",

						backgroundColor: "var(--color-blue)",
					}}>
					<CreditCard size={"1.5rem"} color="var(--color-white)" />
				</div>
				<div style={{ display: "inline-block" }}>
					<h1>CreditCard Manager</h1>
					<p>Controle seus gastos do cartão de crédito.</p>
				</div>
			</div>
			<button
				type="button"
				className="icon-container rounded-full box-shadow"
				style={{
					padding: "0.5rem",
					backgroundColor: "var(--color-white)",
				}}>
				<Moon size={"1.5rem"} color="var(--color-dark-slate)" />
			</button>
		</header>
	);
}

export default Header;
