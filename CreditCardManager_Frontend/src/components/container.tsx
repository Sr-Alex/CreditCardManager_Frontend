function Container({ Title = "", Description = "", ...children }) {
	return (
		<section className="container box-shadow">
			{Title?.trim() && (
				<div>
					<h3 className="container-title">{Title}</h3>
					<p>{Description}</p>
				</div>
			)}
			<div {...children}></div>
		</section>
	);
}
export default Container;
