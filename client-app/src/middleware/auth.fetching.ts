import instance from "../axios-config";

export type SignUpData = {
  email: string;
  password: string;
  userName: string;
};

export type SignInData = Omit<SignUpData, "userName">;

type Response = {
  token: string;
}

export const fetchSignUp = async (data: SignUpData) => {
  try {
    const response = await instance.post<Response>("/auth/register", data);
    return response.data as Response;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const fetchSignIn = async (data: SignInData) => {
  try {
    const response = await instance.post<Response>("/auth/login", data);
    return response.data as Response;
  } catch (error) {
    console.error(error);
    return null;
  }
};
