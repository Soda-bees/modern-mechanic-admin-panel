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

    message: string;
    success: boolean;
    data: User[];

};

type uploadImg = {
  data: {
    message: string;
    success: boolean;
    url: string;
  };
};

type addWorkshopResponse = {
  data: {
    message: string;
    success: boolean;
    data: IWorkshop;
  };
};

type getAllWorkshopResponse = {
    message: string;
    success: boolean;
    data: IWorkshop[];
};

type GetAllScanResponse = {
    message: string;
    success: boolean;
    data: Scan[];
};

type GetAllComplaintsResponse = {
    message: string;
    success: boolean;
    data: Complaint[];
};

type GetAllSummaryResponse = {
    total_complaints: Complaint[];
    total_scans: Scan[];
    total_users: User[];
    total_workshops: IWorkshop[];
    total_queries:Queries[]
};

type GetUserDeleteResponse = {
  data: {
    message: string;
    success: boolean;
    token?: string
  }
}

type DeleteWorkshopResponse = {
  message: string;
  success: boolean
}

type GetQueriesResponse = {
    message: string;
    success: boolean;
    queries: Queries[];
};
