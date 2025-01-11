import { useMediaQuery } from "@uidotdev/usehooks";

export const useIsMobile = () => {
	const isMobile = useMediaQuery("(max-width: 640px)");

	return isMobile;
};
