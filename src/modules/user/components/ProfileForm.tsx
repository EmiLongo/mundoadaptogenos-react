// src/modules/user/components/ProfileForm.tsx
import { useFormik } from "formik";
import React, { useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { ColorButton } from "@shared/components/buttons/ColorButton";
import { InputLabel } from "@theme/textStyles";
import { supabase } from "@/api/apiClient";
import { Box, FormControl, OutlinedInput } from "@mui/material";
import { useUserStore } from "@/store/useUserStore";
import { OnlyTextButton } from "@/shared/components/buttons/OnlyTextButton";
import { ModalChangeEmail } from "./ModalChangeEmail";
import { ModalChangePassword } from "./ModalChangePassword";

const validationSchema = Yup.object({
  fullName: Yup.string(),
});

export const ProfileForm: React.FC = () => {
  const [openModalEmail, setOpenModalEmail] = useState<boolean>(false);
  const [openModalPassword, setOpenModalPassword] = useState<boolean>(false);
  const { user, updateUser } = useUserStore();
  const formik = useFormik({
    initialValues: {
      fullName: user?.name || '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting}) => {
      console.log(values);

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: values.fullName
        }
      })
      
      if (error) throw error
      updateUser({ name: values.fullName });
      toast.success('Se guardaron los cambios con éxito')
      resetForm({ values: { fullName: values.fullName } });
    } catch (error) {
      toast.error('Error al registrar los cambios')
      console.log('Error al registrar los cambios', error);
    } finally {
      setSubmitting(false);
    }
  }
  });

  return (
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{width: {xs: "90vw", sm: "345px", md: "416px", lg: "484px", xl: "470px"}, margin: "0 auto"}}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
          {/* Opción 1 */}
          <FormControl fullWidth>
            <InputLabel id="label-full-name" sx={{marginBottom: "4px"}}>Nombre y apellido</InputLabel>
            <OutlinedInput
              fullWidth
              id="full-name"
              name="full-name"
              value={formik.values.fullName}
              onChange={(e) => formik.setFieldValue("fullName", e.target.value)}
            />
          </FormControl>

          {/* Opción 2 */}
          <FormControl fullWidth>
            <InputLabel id="label-email" sx={{marginBottom: "4px"}}>E-mail</InputLabel>
            <OutlinedInput
              fullWidth
              id="email"
              name="email"
              value={user?.email}
              onChange={(e) => formik.setFieldValue("email", e.target.value)}
            />
            <OnlyTextButton 
              id="bt-profile-email"
              text="Cambiar E-mail"
              onClick={() => setOpenModalEmail(true)}
              size="M"
              isFetching={formik.isSubmitting}
              disabled={formik.isSubmitting}
              isUnderline={false}
            />
          </FormControl>

          {/* Opción 3 */}
          <FormControl fullWidth>
            <InputLabel id="label-password" sx={{marginBottom: "4px"}}>Contraseña</InputLabel>
            <OutlinedInput
              fullWidth
              id="password"
              name="password"
              type="password"
              value={"contraseña"}
              onChange={(e) => formik.setFieldValue("eventualDiscount3", e.target.value)}
            />
            <OnlyTextButton 
              id="bt-profile-pass"
              text="Cambiar Contraseña"
              onClick={() => setOpenModalPassword(true)}
              size="M"
              isFetching={formik.isSubmitting}
              disabled={formik.isSubmitting}
              isUnderline={false}
            />
          </FormControl>
        </Box>

        <Box sx={{display: "flex", justifyContent: "space-between", marginTop: "30px"}}>

          <ColorButton 
            id={`bt-product-options-save`}
            type="brownButton"
            onClick={() => formik.submitForm()}
            text="Guardar Cambios"
            isFetching={formik.isSubmitting}
            disabled={formik.isSubmitting || !formik.dirty}
            sx={{width: "100%", maxWidth: "383px", marginX: "auto"}}
          />
        </Box>
        {openModalEmail && <ModalChangeEmail isOpen={openModalEmail} onClose={() => setOpenModalEmail(false)} email={user?.email || ''}/>}
        {openModalPassword && <ModalChangePassword isOpen={openModalPassword} onClose={() => setOpenModalPassword(false)}/>}
      </Box>
  )
}