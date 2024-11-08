import sass from './mySidebar.module.sass'

import { useState } from 'react';
import { Sidebar } from 'primereact/sidebar';

export const MySidebar = ({ children, position }) => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			<Sidebar
				className={sass.sidebar + " " + sass[position || "left"]}
				position={position}
				visible={visible}
				onHide={() => setVisible(false)}
				onMouseLeave={() => setVisible(false)}
				transitionOptions={{ timeout: { enter: 300, exit: 100 } }}
			>
				{children}
			</Sidebar>
			<div
				className={sass.button + " " + sass[position || "left"]}
				onMouseMove={() => setVisible(true)}
			/>
		</>
	)
}
