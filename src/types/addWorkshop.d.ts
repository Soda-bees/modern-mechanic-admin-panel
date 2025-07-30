type Props = {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
}

type IWorkshop = {
    id: number;
    email: string;
    name: string;
    address: string;
    created_at: string;
    description: string;
    image: string;
    phone_number: string;
    website_link: string;
    zipcode: string;
}