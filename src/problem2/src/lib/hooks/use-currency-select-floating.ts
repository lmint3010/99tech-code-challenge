import {
	useFloating,
	offset,
	shift,
	autoPlacement,
	useClick,
	useDismiss,
	useInteractions,
	type UseFloatingOptions,
} from "@floating-ui/react";

export const useCurrencySelectFloating = (options: UseFloatingOptions) => {
	const { refs, floatingStyles, context } = useFloating({
		...options,
		middleware: [
			offset(8),
			shift(),
			autoPlacement({
				allowedPlacements: ["right-start", "right-end", "right"],
			}),
			...(options.middleware ?? []),
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
