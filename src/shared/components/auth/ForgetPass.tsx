import React, { useRef } from "react";
import { Box, TextField } from "@mui/material";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { redColor } from "@/theme/theme";
import { BodyM, InputError } from "@/theme/textStyles";
import { ColorButton } from "../buttons/ColorButton";
import { OnlyTextButton } from "../buttons/OnlyTextButton";
import { supabase } from "@/api/apiClient";
import { frontendUrl } from "@/api/utils";

const validationSchema: Yup.ObjectSchema<{email: string}> = Yup.object({
  email: Yup.string().email('Correo inválido').required('Requerido'),
});

interface IForgetPassProps {
  handleClose?: () => void;
  isModal?: boolean;
  setIsOpenDrawer?: (isOpen: boolean) => void;
  setIsOpenForgetPass?: (isOpen: boolean) => void;
  sx?: object
}


export const ForgetPass: React.FC<IForgetPassProps> = ({ 
  isModal = false, 
  setIsOpenDrawer = () => {}, 
  handleClose = () => {},
  setIsOpenForgetPass = () => {},
  sx = {}
}) => {
  // const [showPassword, setShowPassword] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (!formRef.current) return;
      console.log(values);
      try {
        const { data, error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${frontendUrl}/recovery`,
        })
        if (error) throw error;
        console.log(data)
        toast.success('Mail enviado con exito')
        resetForm();
        if (isModal) {
          setIsOpenDrawer(false);
          handleClose();
        }
      } catch (error) {
        toast.error('Error al enviar el email')
        console.log('Error al enviar el email', error);
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
        ...sx
      }}
    >
      <BodyM sx={{textWrap: "balance", marginBottom: "16px" }}>Te enviaremos un enlace al mail para que puedas recuperar tu contraseña.</BodyM>
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
        sx={{ backgroundColor: 'background.paper', borderRadius: 1, marginBottom: "24px" }}
      />
      <InputError sx={{ mb: 2, color: redColor[400], paddingLeft: "12px", position: "absolute" }}>
        {formik.touched.email && formik.errors.email}
      </InputError>

      <ColorButton
        id="bt-forget-password"
        type="brownButton"
        fetchingText="...enviando correo"
        isFetching={formik.isSubmitting}
        disabled={formik.isSubmitting}
        sx={{ width: "100%",}}
        text="OLVIDÉ MI CONTRASEÑA"
        onClick={() => formik.handleSubmit()}
      />
      <OnlyTextButton
        id="bt-header-back-login"
        text="Volver" 
        isFetching={formik.isSubmitting}
        disabled={formik.isSubmitting} 
        type="primaryButton"
        size="M"
        isUnderline={false}
        sx={{marginX: "auto", marginTop: "16px" }}
        onClick={() => setIsOpenForgetPass(false)}
      />
    </Box>
  );
};