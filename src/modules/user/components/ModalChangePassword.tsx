// src/modules/user/components/ModalChangePassword.tsx
import React, { useState } from "react";
import { Box, IconButton, InputAdornment, Modal, TextField } from "@mui/material";
import { Closebutton } from "@shared/components/buttons/Closebutton";
import { OnlyTextButton } from "@shared/components/buttons/OnlyTextButton";
import { Heading5, InputError, InputLabel } from "@theme/textStyles";
import { greyColor, paddingModal, redColor, shadow } from "@theme/theme";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { supabase } from "@/api/apiClient";

const validationSchema = Yup.object({
  currentPasswordModal: Yup.string().required('Requerido'),
  passwordModal: Yup.string()
  .min(8, 'Mínimo 8 caracteres')
  .matches(/[A-Z]/, 'Debe tener al menos una mayúscula')
  .matches(/[a-z]/, 'Debe tener al menos una minúscula')
  .matches(/\d/, 'Debe tener al menos un número')
  .required('Requerido'),
  confirmPasswordModal: Yup.string().required('Requerido').oneOf([Yup.ref('password')], 'Las contraseñas no coinciden'),
});

interface IModalChangePassword{
  isOpen: boolean,
  onClose: () => void,
  email: string;
}
export const ModalChangePassword: React.FC<IModalChangePassword> = ({isOpen, onClose, email}) => {
  
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const handleClickShowCurrentPassword = () => setShowCurrentPassword(!showCurrentPassword);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);

  const formik = useFormik({
    initialValues: {
      currentPasswordModal: '',
      passwordModal: '',
      confirmPasswordModal: '',
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting}) => {

    try {
      // 1. Reautenticar con la contraseña actual
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: email,
        password: values.currentPasswordModal,
      });

      if (signInError) throw new Error("La contraseña actual no es correcta");

      // 2 Actualizar la contraseña
      const { error: updateError } = await supabase.auth.updateUser({
        password: values.passwordModal,
      });

      if (updateError) throw updateError;
      
      toast.success('Se guardaron los cambios con éxito')
      onClose();
    } catch (error) {
      toast.error('Error al registrar los cambios')
      console.log('Error al registrar los cambios', error);
    } finally {
      setSubmitting(false);
    }
  }
  });

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "345px",
        minHeight: "375px",
        borderRadius: "8px",
        border: `1px solid ${greyColor[950]}`,
        backgroundColor: greyColor[50],
        color: greyColor[950],
        overflow: "hidden",
        ...shadow.modal
      }}
      >
        <Box sx={{
          width: "100%", 
          minHeight: "375px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          ...paddingModal
        }}>
          <Closebutton id="bti-close-modal-email" closeModal={onClose} />
          <Heading5 sx={{textAlign: "center"}}>CAMBIAR CONTRASEÑA</Heading5>
          <Box sx={{display: "flex", flexDirection: "column", gap: "24px", flexGrow: 1}}>
            <Box>
              <InputLabel id="label-currentPasswordModal" sx={{marginBottom: "4px"}}>Ingresá tu contraseña</InputLabel>
              <TextField
                fullWidth
                id="currentPasswordModal"
                name="currentPasswordModal"
                type={showCurrentPassword ? "text" : "password"}
                value={formik.values.currentPasswordModal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.passwordModal && Boolean(formik.errors.currentPasswordModal)}
                sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}
                slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        id="bti-profile-show-current-password"
                        onClick={handleClickShowCurrentPassword} 
                        edge="end" 
                        sx={{ border: "none", marginRight: "0.25rem", color: greyColor[800] }}
                      >
                        {showCurrentPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                    )
                  }
                }}
              />
              <InputError sx={{width: "100%", textAlign:"left", color: redColor[400], paddingX: "12px", position: "absolute"  }}>
                {formik.touched.currentPasswordModal && formik.errors.currentPasswordModal}
              </InputError>
            </Box>
            <Box>
              <InputLabel id="label-passwordModal" sx={{marginBottom: "4px"}}>Ingresá tu contraseña</InputLabel>
              <TextField
                fullWidth
                id="passwordModal"
                name="passwordModal"
                type={showPassword ? "text" : "password"}
                value={formik.values.passwordModal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.passwordModal && Boolean(formik.errors.passwordModal)}
                sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}
                slotProps={{
                input: {
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        id="bti-profile-show-new-password"
                        onClick={handleClickShowPassword} 
                        edge="end" 
                        sx={{ border: "none", marginRight: "0.25rem", color: greyColor[800] }}
                      >
                        {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                    )
                  }
                }}
              />
              <InputError sx={{width: "100%", textAlign:"left", color: redColor[400], paddingX: "12px", position: "absolute"  }}>
                {formik.touched.passwordModal && formik.errors.passwordModal}
              </InputError>
            </Box>
            <Box>
              <InputLabel id="label-confirmPasswordModal" sx={{marginBottom: "4px"}}>Ingresá tu contraseña</InputLabel>
              <TextField
                fullWidth
                id="confirmPasswordModal"
                name="confirmPasswordModal"
                type={showConfirmPassword ? "text" : "password"}
                value={formik.values.confirmPasswordModal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.confirmPasswordModal && Boolean(formik.errors.confirmPasswordModal)}
                sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}
                slotProps={{
                  input: {
                    endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        id="bti-register-show-confirm-new-password"
                        onClick={handleClickShowConfirmPassword} 
                        edge="end" 
                        sx={{ border: "none", marginRight: "0.25rem", color: greyColor[800] }}
                      >
                        {showConfirmPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                      </IconButton>
                    </InputAdornment>
                    )
                  }
                }}
              />
              <InputError sx={{width: "100%", textAlign:"left", color: redColor[400], paddingX: "12px", position: "absolute"  }}>
                {formik.touched.confirmPasswordModal && formik.errors.confirmPasswordModal}
              </InputError>
            </Box>

          </Box>
                                              
        
          <Box sx={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
            <OnlyTextButton
              id={`bt-profile-pass-cancel`}
              type="primaryButton"
              size="L"
              onClick={onClose}
              text="cancelar"
              isFetching={false}
              disabled={false}
              sx={{paddingX: "12px"}}
            />
            <OnlyTextButton 
              id={`bt-profile-pass-save`}
              type="primaryButton"
              size="L"
              onClick={() => {
                console.log("click en guardar");
                if (formik.isValid && formik.dirty) {
                  formik.submitForm();
                }
              }}
              text="Guardar"
              isFetching={false}
              disabled={!formik.dirty || !formik.isValid || formik.isSubmitting}
              sx={{paddingX: "12px"}}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}