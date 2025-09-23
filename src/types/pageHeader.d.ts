interface PageHeaderProps {
    title: string;
    buttonTitle?: string
    showFilter?: boolean;
    onFilterClick?: () => void;
    addShowButton?: boolean;
    onAddShowClick?: () => void;
    isLoading?: boolean;
    showReload?: boolean,
    onReloadClick?: () => void;
    zipcodes?: string[];
    selectedZips?: string[];
    onZipSelect?: (zips: string[]) => void;
}
