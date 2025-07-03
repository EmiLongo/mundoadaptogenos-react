// src/modules/admin/components/CreateAdmin.tsx
import { Box,  TextField } from "@mui/material"
import { useFormik } from "formik";
import React, { useRef } from "react";
import { toast } from "react-toastify";
import { Title1, InputError } from "@/theme/textStyles";
import { errorColor } from "@theme/theme";
import * as Yup from 'yup';
import { ColorButton } from "@shared/components/buttons/ColorButton";

const validationSchema = Yup.object({
  name: Yup.string().required('Requerido'),
  email: Yup.string().email('Correo inválido').required('Requerido'),
});

export const CreateAdmin: React.FC = () => {

  const formRef = useRef<HTMLFormElement>(null);

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
    <Box 
      id="create-admin-form" 
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
          Crear Administrador
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
        <ColorButton
          type="blueButton"
          onClick={() => formik.handleSubmit()}
          text="Crear Administrador"
          isFetching={formik.isSubmitting}
          disabled={formik.isSubmitting}
          sx={{ minWidth: "200px", marginBottom: {xs: "2rem", md:"1rem"}, paddingX: "10px" }}
        />
      </Box>
    </Box>
  )
}