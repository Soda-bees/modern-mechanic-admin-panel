type Props = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    workshop?:IWorkshop
};

type addWorkshopform = {
    name: string;
    email: string;
    phone_number: string;
    zipcode: string;
    website_link: string;
    address: string;
    description: string;
    image?: string | null;
    id?:string
}

type IWorkshop = {
    id: number;
    email: string;
    name: string;
    address: string;
    description: string;
    image: string;
    phone_number: string;
    website_link: string;
    zipcode: string;
    created_at?:string;
}

type IWorkshopDeleteModal = { 
    title: string; 
    description: string; 
    open: boolean;
    setOpen: (open: boolean) => void;
    onClick: () => void 
}