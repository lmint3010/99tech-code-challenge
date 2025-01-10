import { useEffect, type FC } from "react";

import { parseAsFloat, parseAsString, useQueryStates } from "nuqs";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import SwapIcon from "@/model/assets/icons/swap.svg";
import { getCurrencySwapFormSchema, type CurrencySwapFormFields } from "@/model/validations/currency-swap-form-schema";
import { OriginFieldGroup } from "@/components/origin-field-group";
import { DestinationFieldGroup } from "@/components/destination-field-group";
import { useUserBalance } from "@/lib/hooks/use-user-balance";
import { cn } from "@/lib/utils/cn";

export type CurrencySwapFormProps = object;

export const CurrencySwapForm: FC<CurrencySwapFormProps> = () => {
	const [queryStates, setQueryStates] = useQueryStates({
		originAmount: parseAsFloat,
		originCoin: parseAsString,
		destinationCoin: parseAsString,
	});

	const userBalance = useUserBalance();

	const form = useForm<CurrencySwapFormFields>({
		resolver: zodResolver(
			getCurrencySwapFormSchema({ maxAmount: userBalance })
		),
		defaultValues: {
			originAmount: queryStates.originAmount ?? undefined,
			originCoin: queryStates.originCoin ?? '',
			destinationCoin: queryStates.destinationCoin ?? '',
		},
	});

	const { watch } = form;

	useEffect(() => {
		const { unsubscribe } = watch(
			(value) => setQueryStates(value)
		);

		return () => unsubscribe();
	}, [watch]);

	const onSubmit: SubmitHandler<CurrencySwapFormFields> = async (data) => {
		console.log(data);
	};

	return (
		<FormProvider {...form}>
			<form
				className="p-8 bg-primary-backgroundLight/40 backdrop-blur rounded-3xl flex flex-col"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<OriginFieldGroup />
				<div className="w-full relative my-1">
					<div
						className={cn(
							"size-12 rounded-full bg-indigo-700 border-[6px] border-primary-background grid place-items-center",
							"absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50",
						)}
					>
						<SwapIcon className="size-8/12 rotate-90 text-white" />
					</div>
				</div>
				<DestinationFieldGroup />
				<button type="submit">CONFIRM SWAP</button>
			</form>
		</FormProvider>
	);
};
