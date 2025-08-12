import React, { useRef, useState } from "react";
import { Box, IconButton, InputAdornment, TextField, useMediaQuery, useTheme } from "@mui/material"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { Heading1, InputError } from "@/theme/textStyles";
import { greyColor, redColor, shadow } from "@theme/theme";
import { ColorButton } from "@shared/components/buttons/ColorButton";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { supabase } from "@/api/apiClient";
import { GoogleLoginButton } from "@/shared/components/buttons/GoogleLoginButton";
import { OnlyTextButton } from "@/shared/components/buttons/OnlyTextButton";
import { ModalLogin } from "@/shared/components/auth/ModalLogin";

const validationSchema = Yup.object({
  name: Yup.string().required('Requerido'),
  email: Yup.string().email('Correo inválido').required('Requerido'),
  password: Yup.string()
  .min(8, 'Mínimo 8 caracteres')
  .matches(/[A-Z]/, 'Debe tener al menos una mayúscula')
  .matches(/[a-z]/, 'Debe tener al menos una minúscula')
  .matches(/\d/, 'Debe tener al menos un número')
  .required('Requerido'),
  confirmPassword: Yup.string().required('Requerido').oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
});

export const RegisterForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const formRef = useRef<HTMLFormElement>(null);

  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isOpenForgetPass, setIsOpenForgetPass] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const inputSx = {
    width: "100%",
    backgroundColor: 'background.paper',
    borderRadius: 1,
    marginX: "auto",
  }
  const helperSx = {
    color: redColor[400],
    paddingX: "14px",
    width: "100%",
    position: "absolute",
    top: "100%",
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (!formRef.current) return;
      console.log(values);
      try {

        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: {
              full_name: values.name
            }
          }
        });
  
        if (error) throw error;            
        toast.success('¡Revisa tu email para confirmar tu cuenta!')
        resetForm();
        // TODO: hacer la logica para el registro
      } catch (error) {
        toast.error('Error al registrar')
        console.log('Error al registrar', error);
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
        width: {xs: "90vw", sm: "550px", md: "383px", lg: "441px", xl: "470px"},
        height: {xs: "auto", md: "474px"}
      }}
      >
      <Box sx={{ 
        display: "flex",
        flexDirection: "column",
        alignItems: "center", 
        justifyContent: "center",
        backgroundColor: greyColor[50],
        borderRadius: "8px",
        padding: "16px",
        gap: "24px",
        ...shadow.card
      }}>
        <Heading1 sx={{textAlign: "center",}}>
          REGISTRARME
        </Heading1>
        {/* Nombre y Apellido */}
        <Box sx={{width: "100%", display: "flex", flexDirection: "column", gap: "4px", position: "relative"}}>
          <TextField
            fullWidth
            label="Nombre y Apellido"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            sx={inputSx}
          />
          <InputError sx={{...helperSx}}>
            {formik.touched.name && formik.errors.name}
          </InputError>
        </Box>
        {/* Correo Electrónico */}
        <Box sx={{width: "100%", display: "flex", flexDirection: "column", gap: "4px", position: "relative"}}>
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
            sx={inputSx}
          />
          <InputError sx={{...helperSx}}>
            {formik.touched.email && formik.errors.email}
          </InputError>
        </Box>

        {/* Contraseña */}
        <Box sx={{width: "100%", display: "flex", flexDirection: "column", gap: "4px", position: "relative"}}>
          <TextField
            fullWidth
            label="Contraseña"
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            sx={inputSx}
            slotProps={{
              input: {
                endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    id="bti-register-show-password"
                    onClick={handleClickShowPassword} 
                    edge="end" 
                    sx={{ border: "none", marginRight: "0.25rem" }}
                  >
                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
                )
              }
            }}
          />
          <InputError sx={{...helperSx, color: formik.errors.password ? redColor[700] : greyColor[900], }}>
            {formik.touched.password ? formik.errors.password : "Debe contener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número."}
          </InputError>
        </Box>
        {/* Confirme contraseña */}
        <Box sx={{width: "100%", display: "flex", flexDirection: "column", gap: "4px", position: "relative", marginTop: "20px"}}>
          <TextField
            fullWidth
            label="Confirme contraseña"
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            sx={inputSx}
            slotProps={{
              input: {
                endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    id="bti-register-show-confirm-password"
                    onClick={handleClickShowConfirmPassword} 
                    edge="end" 
                    sx={{ border: "none", marginRight: "0.25rem" }}
                  >
                    {showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
                )
              }
            }}
          />
          <InputError sx={{...helperSx}}>
            {formik.touched.confirmPassword && formik.errors.confirmPassword}
          </InputError>
        </Box>
        <ColorButton
          id="bt-register-page"
          type="brownButton"
          onClick={() => formik.handleSubmit()}
          text="REGISTRARME"
          isFetching={formik.isSubmitting}
          disabled={formik.isSubmitting}
          sx={{ width: "260px",}}
        />
      </Box>
      {isMobile && <GoogleLoginButton sx={{ width: "260px", marginX: "auto", marginTop: "2rem"}}/>}
        <OnlyTextButton
          id="bt-register-open-login"
          type="primaryButton"
          onClick={() => setIsLoginModalOpen(true)}
          size="M"
          text="YA TENGO CUENTA"
          isUnderline={false}
          isFetching={false}
          disabled={false}
          sx={{ width: "260px", marginX: "auto", marginTop: {xs:"1rem", md: "2rem"}}}
        />
        <ModalLogin
          isOpenLogin={isLoginModalOpen}
          handleClose={() => setIsLoginModalOpen(false)}
          setIsOpenDrawer={setIsLoginModalOpen}
          isOpenForgetPass={isOpenForgetPass}
          setIsOpenForgetPass={setIsOpenForgetPass}
        />
    </Box>
  )
}