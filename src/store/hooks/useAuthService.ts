import {
  checkAuthAPI,
  forgotPasswordAPI,
  loginAPI,
  resetPasswordAPI,
  signupAPI,
} from "@src/api/auth";
import { useAccessControlContext } from "@src/context/AccessControl";
import { usePartnerDropdownContext } from "@src/context/PartnerDropdown";
import { useToasterContext } from "@src/context/Toaster";
import { AuthServiceOperators, ForgotPasswordInput, ResetPasswordInput, User } from "@src/lib/types/auth";
import { AlertType } from "@src/lib/types/toaster";
import { UserObjectType } from "@src/lib/types/users";
import { LoginValue } from "@src/utils/api/types";
import { handleApiError } from "@src/utils/handle-api-error";
import * as TokenHelper from "@src/utils/token-helper";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export const useAuthService = (): Readonly<AuthServiceOperators> => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { triggerOpen } = useToasterContext();
  const { handleFormReset } = usePartnerDropdownContext();
  const { handlesetAccessControl } = useAccessControlContext();

  const { data } = useQuery({
    queryKey: ["current-user"],
  });

  const onCheckAuth = useMutation({
    mutationKey: ["on-check-auth"],
    mutationFn: checkAuthAPI,
    onSuccess: (data: any) => {
      queryClient.setQueryData(["current-user"], data);
      handlesetAccessControl(data.userTypeID);
    },
    onError: (error: any) => {
      TokenHelper.removeAccessToken();
      TokenHelper.removeRefreshToken();

      handleApiError(error);
    },
    retry: false,
  });

  const onSignin = useMutation({
    mutationFn: loginAPI,
    onSuccess: (user: User, params: LoginValue) => {
      if(params.rememberMe){
        TokenHelper.setEmail(user.emailAddress);
      }
      queryClient.setQueryData(["current-user"], user);
      handlesetAccessControl(user.userTypeID);
      navigate("/dashboard");
    },
    onError: (error: any) => {
      triggerOpen({
        type: AlertType.error,
        title: "Login Failed",
        message: error?.message,
      });
    },
  });

  const onSignup = useMutation({
    mutationKey: ['signup'],
    mutationFn: signupAPI,
    onSuccess: () => {
      triggerOpen({
        type: AlertType.success,
        title: "Signup",
        message: "Successfully signed up"
      });
    },
    onError: (error: any) => {
      triggerOpen({
        type: AlertType.error,
        title: "Signup Failed",
        message: error?.message,
      });
    },
  })

  const onForgotPassword = useMutation<
    ForgotPasswordInput,
    Error,
    ForgotPasswordInput
  >({
    mutationFn: forgotPasswordAPI,
    onSuccess: () => {
      navigate("/forgot-password-success");
    },
    onError: (error: any) => {
      triggerOpen({
        type: AlertType.error,
        title: "Reset Password Request",
        message: error?.message,
      });
    },
  });

  const onResetPassword = useMutation<
    ResetPasswordInput,
    Error,
    ResetPasswordInput
  >({
    mutationFn: resetPasswordAPI,
    onSuccess: () => {
      navigate("/reset-password-success");
    },
    onError: (error: any) => {
      triggerOpen({
        type: AlertType.error,
        title: "Reset Password",
        message: error?.message,
      });
    },
  });

  const onLogout = () => {
    TokenHelper.removeAccessToken();
    TokenHelper.removeRefreshToken();
    queryClient.clear();
    navigate("/login");
    handleFormReset();
  };

  return {
    currentUser: data as UserObjectType,
    onCheckAuth,
    onSignin,
    onForgotPassword,
    onResetPassword,
    onLogout,
    onSignup,
  };
};

export default useAuthService;
