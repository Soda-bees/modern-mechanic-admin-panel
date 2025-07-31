interface ILogin {
    email: string;
    password: string;
}

type LoginResponse = {
    data: {
        message: string;
        token: string;
        adminData: {
            email: string;
        };
        success: boolean;
    };
};

type GetAllUserResponse = {
    data: {
        message: string;
        success: boolean;
        data: User[]
    };
};

type uploadImg = {
    data: {
        message: string;
        success: boolean;
        url: string
    }
}

type addWorkshopResponse = {
    data: {
        message: string;
        success: boolean;
        data: IWorkshop
    }
}

type getAllWorkshopResponse = {
    data: {
        message: string;
        success: boolean;
        data: IWorkshop[]
    }
}
