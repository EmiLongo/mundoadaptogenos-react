import React, { useRef } from "react";
import { Box, TextField } from "@mui/material";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { redColor } from "@/theme/theme";
import { InputError } from "@/theme/textStyles";
import { ColorButton } from "../buttons/ColorButton";



const validationSchema: Yup.ObjectSchema<{email: string}> = Yup.object({
  email: Yup.string().email('Correo inválido').required('Requerido'),
});

interface IForgetPassProps {
  handleClose?: () => void;
  isModal?: boolean;
  setIsOpenDrawer?: (isOpen: boolean) => void;
}


export const ForgetPass: React.FC<IForgetPassProps> = ({ isModal = false, setIsOpenDrawer = () => {}, handleClose = () => {} }) => {
  // const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting }) => {
      if (!formRef.current) return;
      console.log(values);
      try {        
        toast.success('Login exitoso')
        resetForm();
        if (isModal) {
          setIsOpenDrawer(false);
          handleClose();
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

      <ColorButton
        id="bt-forget-password"
        type="blueButton"
        fetchingText="...enviando correo"
        isFetching={formik.isSubmitting}
        disabled={formik.isSubmitting}
        sx={{ marginX: "auto" }}
        text="OLVIDÉ MI CONTRASEÑA"
        onClick={() => formik.handleSubmit()}
      />
    </Box>
  );
};