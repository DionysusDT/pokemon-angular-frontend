export type AuthUser = {
  id: number;
  email: string;
  full_name: string;
  role?: string,
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type LoginDto = {
  email: string;
  password: string
};

export type SignupDto = {
  email: string;
  full_name: string;
  password: string;
};

export type LoginApiResponse = {
  success: true;
  data: {
    access_token: string;
    access_token_expiry: string;
    user_id: number;
    login_id: number;
    email: string;
    full_name: string;
  };
};

export type ProfileApiResponse = {
  success: true;
  data: {
    id: number;
    email: string;
    full_name: string;
    role: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
  };
};

