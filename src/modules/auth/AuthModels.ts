export interface AuthState {
  isLoading: boolean;
  register: {
    error: boolean;
    status: number;
    message: string;
  };
  login: {
    error: boolean;
    status: number;
    data: {
      token: string;
    };
  };
}
