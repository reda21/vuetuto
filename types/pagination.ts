export interface PaginationProps {
	currentPage?: number;
	total?: number;
	limiteScreenPage?: number;
	limiteParPage?: number;
	onPageChange: (page: number) => void;
}
