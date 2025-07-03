import { Box, IconButton, InputAdornment, TextField } from "@mui/material"
import imageReg from "@img/register/register-side.webp"
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import { Title1, InputError } from "@/theme/textStyles";
import { errorColor } from "@theme/theme";
import * as Yup from 'yup';
import { ColorButton } from "@shared/components/buttons/ColorButton";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';

const validationSchema = Yup.object({
  name: Yup.string().required('Requerido'),
  email: Yup.string().email('Correo inválido').required('Requerido'),
  password: Yup.string().required('Requerido'),
  confirmPassword: Yup.string().required('Requerido').oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
});

export const RegisterPage: React.FC = () => {

  const formRef = useRef<HTMLFormElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const inputSx = {
    width: {xs: "100%", md: "50%"},
    maxWidth: {xs: "300px", md:"400px", lg: "500px"},
    backgroundColor: 'background.paper',
    borderRadius: 1,
    marginX: "auto",
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      if (!formRef.current) return;
      console.log(values);
      try {        
        toast.success('Registro exitoso')
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
    <>
      <Box sx={{ display: "flex", flexDirection:{xs: "column-reverse", md: "row"} }} >
        <Box sx={{ 
          flex: {xs: "", md: 1},
          width: { xs: "100%", md: "50%" },
          height: { xs: "70dvh", md: "calc(100vh - 250px)" },
        }}>
          <Box sx={{
              width: "100%", 
              height: "100%", 
              backgroundImage: `url(${imageReg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
          }}/>
        </Box>
        <Box 
          id="contact-form" 
          ref={formRef}
          component="form" 
          onSubmit={formik.handleSubmit} 
          noValidate
          sx={{ 
            background: "white", 
            flex: 1,
          }}
        >
          <Box sx={{ 
            display: "flex",
            flexDirection: "column",
            alignItems: "center", 
            justifyContent: "center" 

          }}>
            <Title1 sx={{ 
              marginTop: {xs: "2rem", md:"4rem" },
              marginBottom: "1rem",
              textAlign: "center",
            }}>
              REGISTRO
            </Title1>
            {/* Nombre y Apellido */}
            <TextField
              fullWidth
              label="Nombre y Apellido"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              // helperText={formik.touched.name && formik.errors.name}
              sx={inputSx}
            />
            <InputError sx={{ mb: 2, color: errorColor[400], paddingLeft: "12px" }}>
              {formik.touched.name && formik.errors.name}
            </InputError>
            {/* Correo Electrónico */}
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
            <InputError sx={{ mb: 2, color: errorColor[400], paddingLeft: "12px" }}>
              {formik.touched.email && formik.errors.email}
            </InputError>

            {/* Contraseña */}
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
                    <IconButton onClick={handleClickShowPassword} edge="end" sx={{ border: "none", marginRight: "0.25rem" }}>
                      {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                  )
                }
              }}
            />
            <InputError sx={{ mb: 2, color: errorColor[400], paddingLeft: "12px" }}>
              {formik.touched.password && formik.errors.password}
            </InputError>
            {/* Confirme contraseña */}
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
                    <IconButton onClick={handleClickShowConfirmPassword} edge="end" sx={{ border: "none", marginRight: "0.25rem" }}>
                      {showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                    </IconButton>
                  </InputAdornment>
                  )
                }
              }}
            />
            <InputError sx={{ mb: 2, color: errorColor[400], paddingLeft: "12px" }}>
              {formik.touched.confirmPassword && formik.errors.confirmPassword}
            </InputError>

 
                  {/* Debe tener 8 caracteres, sin espacios, uno o más números, minúsculas,
                  mayúsculas, y carácteres especiales (@#$%^&+=)
                  Las contraseñas coinciden
                  No coinciden */}

            <ColorButton
              type="blueButton"
              onClick={() => formik.handleSubmit()}
              text="REGISTRARME"
              isFetching={formik.isSubmitting}
              disabled={formik.isSubmitting}
              sx={{ width: "200px", marginTop: "1rem", marginBottom: {xs: "2rem", md:"1rem"} }}
            />
          </Box>
        </Box>
      </Box>
    </>
  )
}