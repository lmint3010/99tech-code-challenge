import {
	useFloating,
	offset,
	shift,
	autoPlacement,
	useClick,
	useDismiss,
	useInteractions,
} from "@floating-ui/react";

export const useCurrencySelectFloating = (
	isOpen: boolean,
	setIsOpen: (open: boolean) => void,
) => {
	const { refs, floatingStyles, context } = useFloating({
		open: isOpen,
		onOpenChange: setIsOpen,
		middleware: [
			offset(8),
			shift(),
			autoPlacement({
				allowedPlacements: ["right-start", "right-end", "right"],
			}),
		],
	});

	const click = useClick(context);
	const dismiss = useDismiss(context);

	const { getReferenceProps, getFloatingProps } = useInteractions([
		click,
		dismiss,
	]);

	return { refs, floatingStyles, getReferenceProps, getFloatingProps };
};
