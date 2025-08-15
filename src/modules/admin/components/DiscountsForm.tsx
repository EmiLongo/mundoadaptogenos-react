// src/modules/admin/components/DiscountsForm.tsx
import { Box, FormControl, OutlinedInput } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { SwitchCustom } from "./SwitchCustom";
import { ColorButton } from "@shared/components/buttons/ColorButton";
import { InputLabel } from "@theme/textStyles";
import { supabase } from "@/api/apiClient";

const validationSchema = Yup.object({
  taxDiscount: Yup.number(),   // tax_discount,
  bankTransfer: Yup.number(),    // bank_transfer,
  eventualDiscount1: Yup.number(),    // eventual_discount_1,
  eventualDiscount2: Yup.number(),    // eventual_discount_2,
  eventualDiscount3: Yup.number(),    // eventual_discount_3,
  activeTaxDiscount: Yup.boolean(),    // active_tax_discount,
  activeBankTransfer: Yup.boolean(),   // active_bank_transfer,
  activeEventual1: Yup.boolean(),    // active_eventual_1,
  activeEventual2: Yup.boolean(),    // active_eventual_2,
  activeEventual3: Yup.boolean()   // active_eventual_3
});

export const DiscountsForm: React.FC = () => {

  const formik = useFormik({
    initialValues: {
      taxDiscount: 0,
      activeTaxDiscount: false,
      bankTransfer: 0,
      activeBankTransfer: false,
      eventualDiscount1: 0,
      activeEventual1: false,
      eventualDiscount2: 0,
      activeEventual2: false,
      eventualDiscount3: 0,
      activeEventual3: false
    },
    validationSchema,
    onSubmit: (values, { resetForm, setSubmitting}) => {
      console.log(values);
      try {        
        toast.success('Se guardaron los cambios con éxito')
        resetForm();
        // TODO: hacer la logica para el registro
      } catch (error) {
        toast.error('Error al registrar los cambios')
        console.log('Error al registrar los cambios', error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchDiscounts = async () => {
      try {
        console.log("useEffect ejecutándose");
        
        const { data: discounts, error } = await supabase
          .from('discount_settings')
          .select('*')
          .limit(1); 

        console.log("Respuesta completa:", { data: discounts, error });

        if (error) {
          throw error;
        }
        if (discounts) {
          console.log("discounts", discounts);
          formik.setValues({
            taxDiscount: discounts[0].tax_discount,
            activeTaxDiscount: discounts[0].active_tax_discount,
            bankTransfer: discounts[0].bank_transfer,
            activeBankTransfer: discounts[0].active_bank_transfer,
            eventualDiscount1: discounts[0].eventual_discount_1,
            activeEventual1: discounts[0].active_eventual_1,
            eventualDiscount2: discounts[0].eventual_discount_2,
            activeEventual2: discounts[0].active_eventual_2,
            eventualDiscount3: discounts[0].eventual_discount_3,
            activeEventual3: discounts[0].active_eventual_3
          });
        }
      } catch (error) {
        console.error('Error al obtener los descuentos:', error);
      }
    };
    fetchDiscounts();
  }, []);

  return (
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{width: {xs: "90vw", sm: "345px", md: "416px", lg: "484px", xl: "470px"}, margin: "0 auto"}}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px", width: "100%" }}>
          {/* Opción 1 */}
          <FormControl fullWidth>
            <InputLabel id="label-taxDiscount" sx={{marginBottom: "4px"}}>Sin impuestos</InputLabel>
            <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
              <OutlinedInput
                fullWidth
                id="taxDiscount"
                name="taxDiscount"
                type="number"
                value={formik.values.taxDiscount}
                onChange={(e) => formik.setFieldValue("taxDiscount", e.target.value)}
              />
              <SwitchCustom checked={formik.values.activeTaxDiscount} onChange={(e) => formik.setFieldValue("activeTaxDiscount", e.target.checked)} />
            </Box>
          </FormControl>

          {/* Opción 2 */}
          <FormControl fullWidth>
            <InputLabel id="label-bankTransfer" sx={{marginBottom: "4px"}}>Por transferencia o depósito</InputLabel>
            <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
              <OutlinedInput
                fullWidth
                id="bankTransfer"
                name="bankTransfer"
                type="number"
                value={formik.values.taxDiscount}
                onChange={(e) => formik.setFieldValue("bankTransfer", e.target.value)}
              />
              <SwitchCustom checked={formik.values.activeBankTransfer} onChange={(e) => formik.setFieldValue("activeBankTransfer", e.target.checked)} />
            </Box>
          </FormControl>

          {/* Opción 3 */}
          <FormControl fullWidth>
            <InputLabel id="label-eventualDiscount1" sx={{marginBottom: "4px"}}>Descuento eventual 1</InputLabel>
            <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
              <OutlinedInput
                fullWidth
                id="eventualDiscount1"
                name="eventualDiscount1"
                type="number"
                value={formik.values.taxDiscount}
                onChange={(e) => formik.setFieldValue("eventualDiscount1", e.target.value)}
              />
              <SwitchCustom checked={formik.values.activeEventual1} onChange={(e) => formik.setFieldValue("activeEventual1", e.target.checked)} />
            </Box>
          </FormControl>


          {/* Opción 4 */}
          <FormControl fullWidth>
            <InputLabel id="label-eventualDiscount2" sx={{marginBottom: "4px"}}>Descuento eventual 2</InputLabel>
            <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
              <OutlinedInput
                fullWidth
                id="eventualDiscount2"
                name="eventualDiscount2"
                type="number"
                value={formik.values.taxDiscount}
                onChange={(e) => formik.setFieldValue("eventualDiscount2", e.target.value)}
              />
              <SwitchCustom checked={formik.values.activeEventual2} onChange={(e) => formik.setFieldValue("activeEventual2", e.target.checked)} />
            </Box>
          </FormControl>

          {/* Opción 5 */}
          <FormControl fullWidth>
            <InputLabel id="label-eventualDiscount3" sx={{marginBottom: "4px"}}>Descuento eventual 3</InputLabel>
            <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
              <OutlinedInput
                fullWidth
                id="eventualDiscount3"
                name="eventualDiscount3"
                type="number"
                value={formik.values.taxDiscount}
                onChange={(e) => formik.setFieldValue("eventualDiscount3", e.target.value)}
              />
              <SwitchCustom checked={formik.values.activeEventual3} onChange={(e) => formik.setFieldValue("activeEventual3", e.target.checked)} />
            </Box>
          </FormControl>
        </Box>

        <Box sx={{display: "flex", justifyContent: "space-between", marginTop: "30px"}}>

          <ColorButton 
            id={`bt-product-options-save`}
            type="brownButton"
            onClick={() => formik.submitForm()}
            text="Guardar Cambios"
            isFetching={formik.isSubmitting}
            disabled={formik.isSubmitting}
            sx={{width: "100%", maxWidth: "383px", marginX: "auto"}}
          />
        </Box>
      </Box>
  )
}