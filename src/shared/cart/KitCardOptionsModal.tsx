// src\modules\products\components\KitOptionsModal.tsx
import React from "react";
import { Box, IconButton, MenuItem, Modal, Select, FormControl } from "@mui/material";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { BodyM, Heading5, InputLabel } from "@theme/textStyles";
import { greyColor } from "@theme/theme";
import { OnlyTextButton } from "@shared/components/buttons/OnlyTextButton";
import { toast } from "react-toastify";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import { selectInfo } from "../Layout/utils/filterProducts";
import { useCart } from "@/store/useCartStore";
import { IProductWithSections } from "@/types/ProductTypes";

// Esquema de validación con Yup
const validationSchema = Yup.object({
  option1: Yup.string().required("Opción 1 es obligatoria"),
  option2: Yup.string().required("Opción 2 es obligatoria"), 
  option3: Yup.string().required("Opción 3 es obligatoria")
});

interface IKitOptionsModal {
  isOpen: boolean;
  onClose: () => void;
  product: IProductWithSections;
}

export const KitCardOptionsModal: React.FC<IKitOptionsModal> = ({ 
  isOpen, 
  onClose,
  product,
}) => {

  const { addProduct } = useCart();

  const handleBtClose = () => {
    onClose()
  };

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
    >
      <Box sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "345px",
        minHeight: "375px",
        borderRadius: "8px",
        border: `2px solid ${greyColor[950]}`,
        backgroundColor: greyColor[50],
        color: greyColor[950],
        overflow: "hidden"
      }}>
        <Box sx={{
          width: "100%",
          height: "100%",
          display: "flex", 
          flexDirection: "column",
          position: "relative",
          padding: "36px 24px 12px 24px",
          gap: "16px"
        }}>
          <IconButton sx={{
            position: "absolute", 
            top: "4px", 
            right: "4px",
            color: greyColor[950],
            border: "none",
            "&:hover": {
              backgroundColor: "transparent",
              color: "secondary.dark",
              border: "none",
            },
          }}>
            <CloseOutlinedIcon sx={{cursor: "pointer", color: greyColor[950]}} onClick={onClose} />
          </IconButton>
          <Heading5 sx={{textAlign: "center", width: "100%"}}>ELEGIR OPCIONES</Heading5>
          <BodyM sx={{textAlign: "center", width: "100%"}}>Para añadir al carrito debés seleccionar las variantes:</BodyM>
          
          <Formik
            initialValues={{ 
              option1: "", 
              option2: "", 
              option3: "" 
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => {
              addProduct(product, 1, [values.option1, values.option2, values.option3]);
              onClose();
            }}
          >
            {({ values, touched, errors, setFieldValue, setFieldTouched, submitForm }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {/* Opción 1 */}
                  <FormControl
                    fullWidth
                    required 
                    error={touched.option1 && Boolean(errors.option1)}
                  >
                    <InputLabel id="label-select-one" sx={{marginBottom: "4px"}}>Opción 1</InputLabel>
                    <Select
                      labelId="label-select-one"
                      id="option1"
                      name="option1"
                      value={values.option1 || ""}
                      onChange={(e) => setFieldValue("option1", e.target.value)}
                      onBlur={() => setFieldTouched("option1", true)}
                    >
                      {selectInfo.map((info, index) => (
                        <MenuItem key={index} value={info.value}>{info.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Opción 2 */}
                  <FormControl
                    fullWidth
                    required 
                    error={touched.option2 && Boolean(errors.option2)}
                  >
                    <InputLabel id="label-select-two" sx={{marginBottom: "4px"}}>Opción 2</InputLabel>
                    <Select
                      labelId="label-select-two"
                      id="option2"
                      name="option2"
                      value={values.option2 || ""}
                      onChange={(e) => setFieldValue("option2", e.target.value)}
                      onBlur={() => setFieldTouched("option2", true)}
                    >
                      {selectInfo.map((info, index) => (
                        <MenuItem key={index} value={info.value}>{info.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {/* Opción 3 */}
                  <FormControl
                    fullWidth
                    required 
                    error={touched.option3 && Boolean(errors.option3)}
                  >
                    <InputLabel id="label-select-three" sx={{marginBottom: "4px"}}>Opción 3</InputLabel>
                    <Select
                      labelId="label-select-three"
                      id="option3"
                      name="option3"
                      value={values.option3 || ""}
                      onChange={(e) => setFieldValue("option3", e.target.value)}
                      onBlur={() => setFieldTouched("option3", true)}
                    >
                      {selectInfo.map((info, index) => (
                        <MenuItem key={index} value={info.value}>{info.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>

                <Box sx={{display: "flex", justifyContent: "space-between", marginTop: "20px"}}>
                  <OnlyTextButton 
                    id={`bt-product-options-cancel`}
                    type="primaryButton"
                    size="L"
                    onClick={handleBtClose}
                    text="cancelar"
                    isFetching={false}
                    disabled={false}
                    sx={{paddingX: "12px"}}
                  />
                  <OnlyTextButton 
                    id={`bt-product-options-save`}
                    type="primaryButton"
                    size="L"
                    onClick={() => {
                      // Marcar todos los campos como tocados para mostrar errores
                      setFieldTouched("option1", true);
                      setFieldTouched("option2", true);
                      setFieldTouched("option3", true);
                      
                      // Verificar si hay campos vacíos
                      if (values.option1 === "" || values.option2 === "" || values.option3 === "") {
                        toast.error("Todos los campos necesitan ser rellenados");
                      } else {
                        submitForm();
                      }
                    }}
                    icon={<ShoppingCartOutlinedIcon />}
                    text="Añadir"
                    isFetching={false}
                    disabled={false}
                    sx={{paddingX: "12px"}}
                  />
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Modal>
  )
}