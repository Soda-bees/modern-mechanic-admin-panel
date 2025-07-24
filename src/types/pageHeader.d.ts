interface PageHeaderProps {
    title: string;
    buttonTitle?: string
    showFilter?: boolean;
    onFilterClick?: () => void;
    addShowButton?: boolean;
    onAddShowClick?: () => void;
}
