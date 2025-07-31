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


type GetAllScanResponse = {
    data: {
        message: string;
        success: boolean;
        data: Scan[]
    };
};


type GetAllComplaintsResponse = {
    data: {
        message: string;
        success: boolean;
        data: Complaint[]
    };
};
