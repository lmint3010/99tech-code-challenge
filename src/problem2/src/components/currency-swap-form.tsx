import { useEffect, type FC } from "react";

import { parseAsFloat, parseAsString, useQueryStates } from "nuqs";
import { FormProvider, type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';

import { getCurrencySwapFormSchema, type CurrencySwapFormFields } from "@/model/validations/currency-swap-form-schema";
import { OriginFieldGroup } from "@/components/origin-field-group";
import { DestinationFieldGroup } from "@/components/destination-field-group";
import { useUserBalance } from "@/lib/hooks/use-user-balance";
import { useCurrencySwapper } from "@/lib/hooks/use-currency-swapper";
import { CurrencyReverseButton } from "@/components/currency-reverse-button";
import { AsyncButton } from "@/components/async-button";

export type CurrencySwapFormProps = object;

export const CurrencySwapForm: FC<CurrencySwapFormProps> = () => {
	const [queryStates, setQueryStates] = useQueryStates({
		originAmount: parseAsFloat,
		originCoinId: parseAsString,
		destinationCoinId: parseAsString,
	});

	const userBalance = useUserBalance();
	const currencySwapper = useCurrencySwapper();

	const form = useForm<CurrencySwapFormFields>({
		resolver: zodResolver(
			getCurrencySwapFormSchema({ maxAmount: userBalance })
		),
		defaultValues: {
			originAmount: queryStates.originAmount ?? undefined,
			originCoinId: queryStates.originCoinId ?? '',
			destinationCoinId: queryStates.destinationCoinId ?? '',
		},
	});

	const { watch } = form;

	useEffect(() => {
		const { unsubscribe } = watch(
			(value) => {
				setQueryStates({
					...value,
					originAmount: value.originAmount ?? null
				});
			}
		);

		return () => unsubscribe();
	}, [watch]);

	const onSubmit: SubmitHandler<CurrencySwapFormFields> = async (data) => {
		await currencySwapper.trigger(data);
		// Do something next...
	};

	const destinationAmount = form.watch('destinationAmount');

	return (
		<FormProvider {...form}>
			<form
				className="p-8 bg-primary-backgroundLight/40 backdrop-blur rounded-3xl flex flex-col"
				onSubmit={form.handleSubmit(onSubmit)}
			>
				<OriginFieldGroup />
				<div className="w-full relative my-1">
					<CurrencyReverseButton
						className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-50"
					/>
				</div>
				<DestinationFieldGroup />
				<AsyncButton
					isLoading={currencySwapper.isMutating}
					disabled={!destinationAmount}
					className="mt-4"
				>
					{currencySwapper.isMutating ? 'SWAPPING...' : 'CONFIRM'}
				</AsyncButton>
			</form>
		</FormProvider>
	);
};
