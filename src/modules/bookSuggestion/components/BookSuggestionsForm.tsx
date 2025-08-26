// src\modules\bookSuggestion\components\BookSuggestionsForm.tsx
import React from "react";
import { Box, FormControl, TextField, useMediaQuery, useTheme } from "@mui/material";
import { Heading3, Heading5 } from "@/theme/textStyles";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { ColorButton } from "@/shared/components/buttons/ColorButton";
import {
  emailJsPublicKey,
  emailJsServiceId,
  emailJsTemplateIdSuggestions,
} from "@/api/utils";
import emailjs from "@emailjs/browser";
import { supabase } from "@/api/apiClient";
import suggestionImage from "@img/book-suggestion/dibujo-cuaderno-libro-quejas.webp";
import { MessageReceivedModal } from "./MessageReceivedModal";
import { greyColor } from "@/theme/theme";

const validationSchema = Yup.object({
  name: Yup.string().required("Requerido"),
  email: Yup.string().email("Correo inválido").required("Requerido"),
  identityNumber: Yup.string().required("Requerido"),
  phone: Yup.string().required("Requerido"),
  message: Yup.string().max(3000).required("Por favor, escriba un mensaje"),
});

export const BookSuggestionsForm: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [openSentModal, setOpenSentModal] = React.useState<boolean>(false);
  const formRef = React.useRef<HTMLFormElement>(null);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      identityNumber: "",
      phone: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      if (!formRef.current) return;
      const { error } = await supabase.from("book_suggestions").insert([
        {
          name: values.name,
          email: values.email,
          identity_number: values.identityNumber,
          phone: values.phone,
          message: values.message,
        },
      ]);
      if (error) throw error;

      emailjs
        .sendForm(
          emailJsServiceId,
          emailJsTemplateIdSuggestions,
          formRef.current,
          emailJsPublicKey
        )
        .then(() => {
          setOpenSentModal(true);
          resetForm();
        })
        .catch(() => {
          toast.error("Error al enviar el mensaje");
          console.log("Error al enviar el mensaje", values);
        })
        .finally(() => setSubmitting(false));
    },
  });

  const handleCloseSentModal = () => setOpenSentModal(false);
  return (
    <>
    <Box
      component="form"
      id="contact-form"
      ref={formRef}
      onSubmit={formik.handleSubmit}
      sx={{
        width: "100%",
        maxWidth: "1100px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        borderRadius: isMobile ? "8px" : "0px",
        backgroundImage: isMobile ? "none" : `url(${suggestionImage})`,
        backgroundColor: isMobile ? greyColor[50] : "transparent",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        padding: {xs: "16px",sm:"48px 32px 32px 92px", md:"48px 32px 32px 132px"},
      }}
    >
      <Heading3 sx={{width: "100%"}}>Tus Datos</Heading3>

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
        <FormControl sx={{ flex: 1}}>
          <Heading5 marginBottom={"4px"}>Número de documento de identidad (DNI)</Heading5>
          <TextField
            fullWidth
            id="identityNumber"
            name="identityNumber"
            value={formik.values.identityNumber}
            onChange={formik.handleChange}
            placeholder="Ej.: 12334455"
            error={formik.touched.identityNumber && Boolean(formik.errors.identityNumber)}
            helperText={formik.errors.identityNumber ? formik.errors.identityNumber : "No escribas espacios, puntos ni guiones. "}
          />
        </FormControl>
        <FormControl sx={{ flex: 1 }}>
          <Heading5 marginBottom={"4px"}>Número de teléfono</Heading5>
          <TextField
            fullWidth
            id="phone"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            placeholder="Ej.: 1122334455"
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.errors.phone ? formik.errors.phone : "Incluí el código de área. No escribas espacios, puntos ni guiones."}
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
        <FormControl sx={{ width: "100%" }}>
          <Heading3 sx={{marginBottom: "16px", marginTop: "32px"}}>Dejanos tu mensaje</Heading3>
          <TextField
            fullWidth
            multiline={true}
            rows={4}
            id="message"
            name="message"
            value={formik.values.message}
            onChange={formik.handleChange}
            placeholder="Escribí acá lo que nos quieras aportar."
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
      disabled={formik.isSubmitting || !formik.isValid}
      sx={{ width: "100%", maxWidth: "383px", marginX: "auto", marginBottom: "48px" }}
    />
    <MessageReceivedModal isOpen={openSentModal} onClose={handleCloseSentModal} />
    </>
  );
};
