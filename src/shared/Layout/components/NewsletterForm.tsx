import React, { useRef } from "react";
import { Box, TextField } from "@mui/material";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { ColorButton } from "@shared/components/buttons/ColorButton";



const validationSchema: Yup.ObjectSchema<{email: string}> = Yup.object({
  email: Yup.string().email('Correo inválido').required('Requerido'),
});

export const NewsletterForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

    //TODO: manejar la lógica y agregar mail al posible carrito
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      if (!formRef.current) return;
      console.log(values);
      try {        
        toast.success('Envío exitoso')
        resetForm();
      } catch (error) {
        toast.error('Error al enviar')
        console.log('Error al enviar', error);
      } finally {
        setSubmitting(false);
      }
    },
  });
  return (
    <Box 
      id="newsletter-form" 
      ref={formRef}
      component="form" 
      onSubmit={formik.handleSubmit} 
      noValidate
      sx={{ 
        display: 'flex',
        alignItems: 'start', 
        gap: "8px", 
      }}
    >
      <TextField
        label="Correo Electrónico"
        id="email"
        name="email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        sx={{ height: "40px", backgroundColor: 'background.paper', borderRadius: "30px" }}
      />
      <ColorButton
        id="bt-footer-newsletter"
        type="blueButton"
        text="ENVIAR"
        isFetching={formik.isSubmitting}
        disabled={formik.isSubmitting}
        onClick={() => formik.handleSubmit()}
      />
    </Box>
  );
};