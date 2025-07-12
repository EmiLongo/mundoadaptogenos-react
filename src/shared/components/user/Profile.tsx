// src/shared/components/user/Profile.tsx
import { Heading1, InputError, Heading2 } from "@/theme/textStyles";
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, InputAdornment, TextField } from "@mui/material";
import { useFormik } from "formik";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from 'yup';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { redColor } from "@theme/theme";
import { ColorButton } from "../buttons/ColorButton";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const validationSchema = Yup.object({
  name: Yup.string(),
  email: Yup.string().email('Correo inválido'),
  password: Yup.string(),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
});

export const Profile: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const inputSx = {
    width: {xs: "100%", md: "100%"},
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
        <Heading1 sx={{ 
          marginTop: "2rem",
          marginBottom: "1rem",
          textAlign: "center",
        }}>
          PERFIL
        </Heading1>
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
        <InputError sx={{ mb: 2, color: redColor[400], paddingLeft: "12px" }}>
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
        <InputError sx={{ mb: 2, color: redColor[400], paddingLeft: "12px" }}>
          {formik.touched.email && formik.errors.email}
        </InputError>




              {/* Debe tener 8 caracteres, sin espacios, uno o más números, minúsculas,
              mayúsculas, y carácteres especiales (@#$%^&+=)
              Las contraseñas coinciden
              No coinciden */}

        <ColorButton
          id="bt-profile-changes"
          type="blueButton"
          onClick={() => formik.handleSubmit()}
          text="GUARDAR CAMBIOS"
          isFetching={formik.isSubmitting}
          disabled={formik.isSubmitting}
          sx={{ width: "200px", marginTop: "1rem", marginBottom: {xs: "2rem", md:"1rem"} }}
        />



      <Accordion sx={{ width: {xs: '100%', sm: '420px', xl: '580px'}, marginBottom: {xs: "1rem", md: "2rem"} }}>
      <AccordionSummary
        expandIcon={<ArrowDownwardIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Heading2>Cambiar la contraseña</Heading2>
      </AccordionSummary>
      <AccordionDetails sx={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
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
        <InputError sx={{ mb: 2, color: redColor[400], paddingLeft: "12px" }}>
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
        <InputError sx={{ mb: 2, color: redColor[400], paddingLeft: "12px" }}>
          {formik.touched.confirmPassword && formik.errors.confirmPassword}
        </InputError>
      </AccordionDetails>
    </Accordion>
    </Box>
  </Box>
  </>
  )
}