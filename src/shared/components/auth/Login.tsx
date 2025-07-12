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

const validationSchema: Yup.ObjectSchema<{email: string, password: string}> = Yup.object({
  email: Yup.string().email('Correo inválido').required('Requerido'),
  password: Yup.string().required('Requerido'),
});

type LoginProps = {
  isModal?: boolean;
  handleClose?: () => void;
  setIsOpenDrawer?: (isOpen: boolean) => void;
  setIsOpenForgetPass?: (isOpen: boolean) => void;
}


export const Login: React.FC<LoginProps> = ({
  isModal = false, 
  handleClose = () => {}, 
  setIsOpenDrawer = () => {}, 
  setIsOpenForgetPass = () => {} 
}) => {
  // const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const formRef = useRef<HTMLFormElement>(null);

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
      console.log(values);
      try {        
        toast.success('Login exitoso')
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
        width: !isModal ? "100%" : {xs: "100%", sm: 400},
        minHeight: !isModal ?  "80dvh" : "auto" ,
        padding: !isModal ? {xs: "1rem 2rem", md: "1rem 35dvw"}: "1rem 2rem",
      }}
    >
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
      <InputError sx={{ mb: 2, color: redColor[400], paddingLeft: "12px" }}>
        {formik.touched.email && formik.errors.email}
      </InputError>


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
      <InputError sx={{ mb: 2, color: redColor[400], paddingLeft: "12px" }}>
        {formik.touched.password && formik.errors.password}
      </InputError>
      <Box sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", gap: "1rem" }}>
      <OnlyTextButton
        id="bt-forget-pass"
        text="OLVIDÉ MI CONTRASEÑA" 
        isFetching={formik.isSubmitting}
        disabled={formik.isSubmitting}
        type="blueButton"
        fetchingText="...recuperando"
        sx={{

          minWidth:'50%',
          marginX: "auto",
          "& p" : {fontSize: "0.80rem"}, 
        }}
        onClick={() => setIsOpenForgetPass(true)}
      />
      <ColorButton
        id="bt-header-login"
        type="blueButton"
        fetchingText="...enviando"
        isFetching={formik.isSubmitting}
        disabled={formik.isSubmitting}
        sx={{ marginX: "auto" }}
        text="Iniciar sesión"
        onClick={() => formik.handleSubmit()}
      />
      <OnlyTextButton
        id="bt-header-register"
        text="Registrarme" 
        isFetching={formik.isSubmitting}
        disabled={formik.isSubmitting} 
        type="blueButton"
        sx={{width:'50%', marginX: "auto"}}
        onClick={handleGoToRegister}
        />
      </Box>
    </Box>
  );
};