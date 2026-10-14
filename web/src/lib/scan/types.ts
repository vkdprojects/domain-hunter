export type DomainStatus = 'available' | 'taken';

export interface ScanResult {
	domain: string;
	status: DomainStatus;
	/** Cheapest first-year price in USD, only for available domains. */
	price?: number;
	registrar?: string;
}
