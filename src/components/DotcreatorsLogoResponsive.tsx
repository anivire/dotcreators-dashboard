import { FC } from "react";

interface Props {
	width: number;
	height: number;
	color?: string;
}

export const DotcreatorsLogoResponsive: FC<Props> = ({
	width,
	height,
	color,
}) => {
	return (
		<svg
			width="100"
			height="80"
			viewBox={`0 0 100 80`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			style={{ width: width, height: height }}
		>
			<path
				d="M0 0H40V20H20V40H40V60H60V40H80V20H60V0H100V40H80V60H60V80H40V60H20V40H0V0Z"
				fill={color ? color : "#FA4545"}
			/>
		</svg>
	);
};
