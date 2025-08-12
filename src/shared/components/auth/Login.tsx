import React, { useRef } from "react";
import { Box, TextField } from "@mui/material";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { redColor } from "@/theme/theme";
import { InputError } from "@/theme/textStyles";
import { ColorButton } from "../buttons/ColorButton";
import { OnlyTextButton } from "../buttons/OnlyTextButton";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/shared/hooks/api/auth/useAuth";
import { GoogleLoginButton } from "../buttons/GoogleLoginButton";

const validationSchema: Yup.ObjectSchema<{email: string, password: string}> = Yup.object({
  email: Yup.string().email('Correo inválido').required('Requerido'),
  password: Yup.string().required('Requerido'),
});

type LoginProps = {
  isModal?: boolean;
  handleClose?: () => void;
  setIsOpenDrawer?: (isOpen: boolean) => void;
  setIsOpenForgetPass?: (isOpen: boolean) => void;
  sx?: object
}


export const Login: React.FC<LoginProps> = ({
  isModal = false, 
  handleClose = () => {}, 
  setIsOpenDrawer = () => {}, 
  setIsOpenForgetPass = () => {},
  sx = {}
}) => {
  // const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);
  const { signIn } = useAuth();

  const handleGoToRegister = () => {
    handleClose();
    setIsOpenDrawer(false);
    navigate("/register");
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      if (!formRef.current) return;
      try {
        signIn(values)
        resetForm();
        if (isModal) {
          handleClose();
          setIsOpenDrawer(false);
        }
      } catch (error) {
        toast.error('Error al iniciar sesión')
        console.log('Error al iniciar sesión', error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <Box 
      id="contact-form" 
      ref={formRef}
      component="form" 
      onSubmit={formik.handleSubmit} 
      noValidate
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        width: "100%",
        minHeight: !isModal ?  "80dvh" : "auto" ,
        padding: !isModal ? {xs: "1rem 2rem", md: "1rem 35dvw"}: "0",
        position: "relative",
        gap: "24px",
        ...sx
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Box>
          <TextField
            fullWidth
            label="Correo Electrónico"
            id="email"
            name="email"
            type="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}
          />
          <InputError sx={{width: "100%", textAlign:"right", color: redColor[400], paddingRight: "12px", position: "absolute" }}>
            {formik.touched.email && formik.errors.email}
          </InputError>
        </Box>
        <Box>
          <TextField
            fullWidth
            label="Contraseña"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}
          />
          <InputError sx={{width: "100%", textAlign:"right", color: redColor[400], paddingRight: "12px", position: "absolute"  }}>
            {formik.touched.password && formik.errors.password}
          </InputError>
        </Box>
          <OnlyTextButton
            id="bt-forget-pass"
            text="Olvidé mi contraseña" 
            isFetching={formik.isSubmitting}
            disabled={formik.isSubmitting}
            type="primaryButton"
            fetchingText="...enviando mail"
            isLowerCase={true}
            onClick={() => setIsOpenForgetPass(true)}
            sx={{ marginLeft: "1rem"}}
          />
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", gap: "8px" }}>
      <ColorButton
        id="bt-header-login"
        type="brownButton"
        fetchingText="...enviando"
        isFetching={formik.isSubmitting}
        disabled={formik.isSubmitting}
        sx={{ width: "100%" }}
        text="Iniciar sesión"
        onClick={() => formik.handleSubmit()}
      />
      <GoogleLoginButton isFetching={formik.isSubmitting} disabled={formik.isSubmitting} sx={{width: "100%"}}/>
      <OnlyTextButton
        id="bt-header-register"
        text="Registrarme" 
        isFetching={formik.isSubmitting}
        disabled={formik.isSubmitting} 
        type="primaryButton"
        size="M"
        isUnderline={false}
        sx={{marginX: "auto"}}
        onClick={handleGoToRegister}
        />
      </Box>
    </Box>
  );
};