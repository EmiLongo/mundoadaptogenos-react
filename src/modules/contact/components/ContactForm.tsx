// src\modules\contact\components\ContactForm.tsx
import React from "react";
import { Box, FormControl, TextField } from "@mui/material";
import { Heading5 } from "@/theme/textStyles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ColorButton } from "@/shared/components/buttons/ColorButton";
import {
  emailJsPublicKey,
  emailJsServiceId,
  emailJsTemplateIdContact,
} from "@/api/utils";
import emailjs from "@emailjs/browser";
import { supabase } from "@/api/apiClient";
import contactImage from "@img/contact/dibujo-sobre-contacto-corto.webp";

const validationSchema = Yup.object({
  name: Yup.string().required("Requerido"),
  email: Yup.string().email("Correo inválido").required("Requerido"),
  message: Yup.string().max(3000).required("Por favor, escriba un mensaje"),
});

export const ContactForm: React.FC = () => {
  const formRef = React.useRef<HTMLFormElement>(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (!formRef.current) return;
      const { error } = await supabase.from("contacts").insert([
        {
          name: values.name,
          email: values.email,
          message: values.message,
        },
      ]);
      if (error) throw error;

      emailjs
        .sendForm(
          emailJsServiceId,
          emailJsTemplateIdContact,
          formRef.current,
          emailJsPublicKey
        )
        .then(() => {
          toast.success("Mensaje enviado con éxito");
          resetForm();
        })
        .catch(() => {
          toast.error("Error al enviar el mensaje");
          console.log("Error al enviar el mensaje", values);
        })
        .finally(() => setSubmitting(false));
    },
  });
  return (
    <Box
      component="form"
      id="contact-form"
      ref={formRef}
      onSubmit={formik.handleSubmit}
      sx={{
        height: "90vh",
        width: "100%",
        maxWidth: "1100px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        backgroundImage: `url(${contactImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: {xs:"32px", md:"48px 64px"},
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: "24px",
          borderRadius: "8px",
          width: "100%",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: {xs: "column", md: "row"}, gap: "16px", width: "100%" }}>
          <FormControl sx={{ flex: 1}}>
            <Heading5 marginBottom={"4px"}>Nombre y apellido</Heading5>
            <TextField
              fullWidth
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              placeholder="Juan Pérez"
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </FormControl>
          <FormControl sx={{ flex: 1 }}>
            <Heading5 marginBottom={"4px"}>Email</Heading5>
            <TextField
              fullWidth
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="tumail@ejemplo.com"
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
          </FormControl>
        </Box>
      </Box>
      <Box>
        <FormControl sx={{ width: "100%" }}>
          <Heading5 marginBottom={"4px"}>Mensaje</Heading5>
          <TextField
            fullWidth
            multiline={true}
            rows={4}
            id="message"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            placeholder="Escribí acá lo que nos quieras consultar."
            sx={{ "& .MuiOutlinedInput-root": { padding: "16px 20px" },
              "& .MuiFormHelperText-root": { paddingLeft: "20px" },
            }}
            error={formik.touched.message && Boolean(formik.errors.message)}
            helperText={Boolean(formik.errors.message) && formik.touched.message ? formik.errors.message : `${formik.values.message.length}/3000` }
          />
        </FormControl>
      </Box>
      <ColorButton
        id="bt-contact-form"
        type="brownButton"
        onClick={() => formik.submitForm()}
        text="Enviar"
        isFetching={formik.isSubmitting}
        disabled={formik.isSubmitting}
        sx={{ width: "100%", maxWidth: "383px", marginX: "auto" }}
      />
    </Box>
  );
};
