// src/modules/admin/components/DiscountsForm.tsx
import { Box, FormControl, OutlinedInput } from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { SwitchCustom } from "./SwitchCustom";
import { ColorButton } from "@shared/components/buttons/ColorButton";
import { InputLabel } from "@theme/textStyles";
import { supabase } from "@/api/apiClient";

const validationSchema = Yup.object({
  tax_discount: Yup.number(),   // tax_discount,
  active_tax_discount: Yup.boolean(),    // active_tax_discount,
  bank_transfer: Yup.number(),    // bank_transfer,
  active_bank_transfer: Yup.boolean(),   // active_bank_transfer,
  eventual_discount_1: Yup.number(),    // eventual_discount_1,
  active_eventual_1: Yup.boolean(),    // active_eventual_1,
  eventual_discount_2: Yup.number(),    // eventual_discount_2,
  active_eventual_2: Yup.boolean(),    // active_eventual_2,
  eventual_discount_3: Yup.number(),    // eventual_discount_3,
  active_eventual_3: Yup.boolean()   // active_eventual_3
});

export const DiscountsForm: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [discountId, setDiscountId] = useState<string | null>(null);
  const formik = useFormik({
    initialValues: {
      tax_discount: 0,
      active_tax_discount: false,
      bank_transfer: 0,
      active_bank_transfer: false,
      eventual_discount_1: 0,
      active_eventual_1: false,
      eventual_discount_2: 0,
      active_eventual_2: false,
      eventual_discount_3: 0,
      active_eventual_3: false
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting}) => {
        try {
        const { error } = await supabase
          .from("discount_settings")
          .update({
            ...values
          })
          .eq("id", discountId) // la única fila

        if (error) throw error;
        toast.success('Se guardaron los cambios con éxito')
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
        const { data: discounts, error } = await supabase
          .from('discount_settings')
          .select('*')
          .limit(1); 

        if (error) {
          throw error;
        }
        if (discounts && discounts[0]) {
          const newValues = {
            tax_discount: discounts[0].tax_discount,
            active_tax_discount: discounts[0].active_tax_discount,
            bank_transfer: discounts[0].bank_transfer,
            active_bank_transfer: discounts[0].active_bank_transfer,
            eventual_discount_1: discounts[0].eventual_discount_1,
            active_eventual_1: discounts[0].active_eventual_1,
            eventual_discount_2: discounts[0].eventual_discount_2,
            active_eventual_2: discounts[0].active_eventual_2,
            eventual_discount_3: discounts[0].eventual_discount_3,
            active_eventual_3: discounts[0].active_eventual_3
          };
          
          // Usa resetForm en lugar de setValues para establecer los valores iniciales
          formik.resetForm({ values: newValues });

          setDiscountId(discounts[0].id);
        }
      } catch (error) {
        console.error('Error al obtener los descuentos:', error);
      } finally {
        setLoading(false);
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
            <InputLabel id="label-tax_discount" sx={{marginBottom: "4px"}}>Sin impuestos</InputLabel>
            <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
              <OutlinedInput
                fullWidth
                id="tax_discount"
                name="tax_discount"
                type="number"
                value={formik.values.tax_discount}
                onChange={(e) => formik.setFieldValue("tax_discount", e.target.value)}
              />
              <SwitchCustom checked={formik.values.active_tax_discount} onChange={(e) => formik.setFieldValue("active_tax_discount", e.target.checked)} />
            </Box>
          </FormControl>

          {/* Opción 2 */}
          <FormControl fullWidth>
            <InputLabel id="label-bank_transfer" sx={{marginBottom: "4px"}}>Por transferencia o depósito</InputLabel>
            <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
              <OutlinedInput
                fullWidth
                id="bank_transfer"
                name="bank_transfer"
                type="number"
                value={formik.values.bank_transfer}
                onChange={(e) => formik.setFieldValue("bank_transfer", e.target.value)}
              />
              <SwitchCustom checked={formik.values.active_bank_transfer} onChange={(e) => formik.setFieldValue("active_bank_transfer", e.target.checked)} />
            </Box>
          </FormControl>

          {/* Opción 3 */}
          <FormControl fullWidth>
            <InputLabel id="label-eventual_discount_1" sx={{marginBottom: "4px"}}>Descuento eventual 1</InputLabel>
            <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
              <OutlinedInput
                fullWidth
                id="eventual_discount_1"
                name="eventual_discount_1"
                type="number"
                value={formik.values.eventual_discount_1}
                onChange={(e) => formik.setFieldValue("eventual_discount_1", e.target.value)}
              />
              <SwitchCustom checked={formik.values.active_eventual_1} onChange={(e) => formik.setFieldValue("active_eventual_1", e.target.checked)} />
            </Box>
          </FormControl>


          {/* Opción 4 */}
          <FormControl fullWidth>
            <InputLabel id="label-eventual_discount_2" sx={{marginBottom: "4px"}}>Descuento eventual 2</InputLabel>
            <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
              <OutlinedInput
                fullWidth
                id="eventual_discount_2"
                name="eventual_discount_2"
                type="number"
                value={formik.values.eventual_discount_2}
                onChange={(e) => formik.setFieldValue("eventual_discount_2", e.target.value)}
              />
              <SwitchCustom checked={formik.values.active_eventual_2} onChange={(e) => formik.setFieldValue("active_eventual_2", e.target.checked)} />
            </Box>
          </FormControl>

          {/* Opción 5 */}
          <FormControl fullWidth>
            <InputLabel id="label-eventual_discount_3" sx={{marginBottom: "4px"}}>Descuento eventual 3</InputLabel>
            <Box sx={{display: "flex", alignItems: "center", gap: "8px"}}>
              <OutlinedInput
                fullWidth
                id="eventual_discount_3"
                name="eventual_discount_3"
                type="number"
                value={formik.values.eventual_discount_3}
                onChange={(e) => formik.setFieldValue("eventual_discount_3", e.target.value)}
              />
              <SwitchCustom checked={formik.values.active_eventual_3} onChange={(e) => formik.setFieldValue("active_eventual_3", e.target.checked)} />
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
            disabled={formik.isSubmitting || loading || !formik.dirty}
            sx={{width: "100%", maxWidth: "383px", marginX: "auto"}}
          />
        </Box>
      </Box>
  )
}