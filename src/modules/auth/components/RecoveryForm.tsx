// src/modules/auth/components/RecoveryForm.tsx
import React, { useRef, useState } from "react";
import { Box, IconButton, InputAdornment, TextField} from "@mui/material"
import { useFormik } from "formik";
import * as Yup from 'yup';
import { toast } from "react-toastify";
import { Heading1, InputError } from "@theme/textStyles";
import { greyColor, redColor, shadow } from "@theme/theme";
import { ColorButton } from "@shared/components/buttons/ColorButton";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { supabase } from "@/api/apiClient";

const validationSchema = Yup.object({
  password: Yup.string()
  .min(8, 'Mínimo 8 caracteres')
  .matches(/[A-Z]/, 'Debe tener al menos una mayúscula')
  .matches(/[a-z]/, 'Debe tener al menos una minúscula')
  .matches(/\d/, 'Debe tener al menos un número')
  .required('Requerido'),
  confirmPassword: Yup.string().required('Requerido').oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
});

export const RecoveryForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);

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
        const { data, error } = await supabase.auth.updateUser({
          password: values.password
        })
        console.log(data)
        if (error) throw error;            
        toast.success('¡La contraseña ha sido renovada!')
        resetForm();
        // TODO: hacer la logica para el registro
      } catch (error) {
        toast.error('Error al renovar la contraseña')
        console.log('Error al renovar la contraseña', error);
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
          NUEVA CONTRASEÑA
        </Heading1>

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
    </Box>
  )
}