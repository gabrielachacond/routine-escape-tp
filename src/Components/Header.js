import React from 'react';


function Header(props) {

	return (
		<header className="header-style-1">
			<div className="top-bar-style2" id="top-bar" >
				<div className="container border-bottom padding-25px-bottom xs-padding-10px-bottom">
					<div className="d-flex align-items-center justify-content-center justify-content-md-between">
						<div>
							<div className="xs-text-center">
								<h3>HOTELES</h3>
								<div>{props.headerDescriptionFrom} {props.headerDescriptionTo}</div>  {/* state: desde y hasta. Esta en App para que se renderice en el header  */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}

export default Header;
