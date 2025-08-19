// src/modules/user/components/ModalChangeEmail.tsx
import { supabase } from "@/api/apiClient";
import { Closebutton } from "@/shared/components/buttons/Closebutton";
import { OnlyTextButton } from "@/shared/components/buttons/OnlyTextButton";
import { Heading5, InputError, InputHelper, InputLabel } from "@/theme/textStyles";
import { greyColor, paddingModal, redColor, shadow } from "@/theme/theme";
import { Box, Modal, TextField } from "@mui/material";
import { useFormik } from "formik";
import React from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  emailModal: Yup.string().email('Correo inválido').required('Requerido'),
  emailConfirmModal: Yup.string().email('Correo inválido').oneOf([Yup.ref('emailModal')], 'Los Emails no coinciden').required('Requerido'),
});
interface IModalChangeEmail{
  isOpen: boolean,
  onClose: () => void,
  email: string;
}
export const ModalChangeEmail: React.FC<IModalChangeEmail> = ({isOpen, onClose, email}) => {

    const formik = useFormik({
      initialValues: {
        emailModal: email,
        emailConfirmModal: email,
      },
      validationSchema,
      onSubmit: async (values, { setSubmitting}) => {
        console.log(values);
  
      try {
        const { error } = await supabase.auth.updateUser({
          email: values.emailModal
        })
        
        if (error) throw error
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
          ...paddingModal,
          width: "100%", 
          minHeight: "375px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          gap: "12px"
        }}>
          {/* inputs */}
          <Closebutton id="bti-close-modal-email" closeModal={onClose} />
          <Heading5 sx={{textAlign: "center"}}>CAMBIAR EMAIL</Heading5>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem", flex: 1 }}>
            {/* email nuevo */}
            <Box>
              <InputLabel id="label-emailModal" sx={{marginBottom: "4px"}}>Ingresá tu nuevo mail</InputLabel>
              <TextField
                fullWidth
                id="emailModal"
                name="emailModal"
                type="email"
                value={formik.values.emailModal}
                // onChange={(e) => formik.setFieldValue("emailModal", e.target.value)}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.emailModal && Boolean(formik.errors.emailModal)}
                sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}
              />
              <InputError sx={{width: "100%", textAlign:"right", color: redColor[400], paddingRight: "12px" }}>
                {formik.touched.emailModal && formik.errors.emailModal}
              </InputError>
            </Box>
            {/* confirmar email nuevo */}
            <Box>
              <InputLabel id="label-emailConfirmModal" sx={{marginBottom: "4px"}}>Confirma tu nuevo mail</InputLabel>
              <TextField
                fullWidth
                id="emailConfirmModal"
                name="emailConfirmModal"
                type="email"
                value={formik.values.emailConfirmModal}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.emailConfirmModal && Boolean(formik.errors.emailConfirmModal)}
                sx={{ backgroundColor: 'background.paper', borderRadius: 1 }}
              />
              <InputError sx={{width: "100%", textAlign:"right", color: redColor[400], paddingRight: "12px" }}>
                {formik.touched.emailConfirmModal && formik.errors.emailConfirmModal}
              </InputError>
            </Box>
          </Box>
          <InputHelper>Te llegará un correo de confirmación a tu email antes del cambio.</InputHelper>
          {/* botones */}
          <Box sx={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
            <OnlyTextButton
              id={`bt-profile-email-cancel`}
              type="primaryButton"
              size="L"
              onClick={onClose}
              text="cancelar"
              isFetching={false}
              disabled={false}
              sx={{paddingX: "12px"}}
            />
            <OnlyTextButton 
              id={`bt-profile-email-save`}
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
              disabled={formik.values.emailModal === email || !formik.isValid || formik.isSubmitting}
              sx={{paddingX: "12px"}}
            />
          </Box>
        </Box>
      </Box>
    </Modal>
  )
}