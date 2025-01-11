export interface WalletBalance {
	currency: string;
	amount: number;
	blockchain: string;
}

export interface FormattedWalletBalance extends WalletBalance {
	formatted: string;
}

export interface Price {
	[currency: string]: number;
}

export interface BoxProps {
	children?: React.ReactNode;
	className?: string;
}
