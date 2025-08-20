// src/modules/admin/components/ProductDetailsForm.tsx
import { BodyM, BodyS, Heading5 } from "@/theme/textStyles"
import { greyColor } from "@/theme/theme"
import { Box, Checkbox, FormControl, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
import React, { useState } from "react"
import { SwitchCustom } from "./SwitchCustom"
import { ListItemText } from "@mui/material"
import { SelectChangeEvent } from "node_modules/@mui/material"
import * as Yup from "yup";
import { useFormik } from "formik"
import { useSections } from "@/shared/hooks/api/useSections"
import { useDiscounts } from "@/shared/hooks/api/useDiscounts"
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import { Button } from "@mui/material"
import { ColorButton } from "@/shared/components/buttons/ColorButton"

const validationSchema = Yup.object({
  isActive: Yup.boolean().required('Requerido'),
  sectionId: Yup.array().required('Requerido'),
  code: Yup.string().required('Requerido'),
  title: Yup.string().required('Requerido'),
  description: Yup.string().required('Requerido'),
  price: Yup.number().required('Requerido'),
  image: Yup.string().required('Requerido'),
  categoryId: Yup.string().required('Requerido'),
  packagingId: Yup.string().required('Requerido'),
  discount: Yup.number().required('Requerido'),
  hasOptions: Yup.boolean().required('Requerido'),
});

export const ProductDetailsForm: React.FC = () => {

  const [selectedSections, setSelectedSections] = useState<number[]>([]);
  const { 
    sections, 
    isLoading: isLoadingSections, 
    // error: errorSections 

  } = useSections();
  const { 
    discounts, 
    isLoading: isLoadingDiscounts, 
    // error: errorDiscounts 

  } = useDiscounts();

  const formik = useFormik({
    initialValues: {
      isActive: true,
      sectionId: '',
      code: '',
      title: '',
      price: "",
      discount: "",
      description: '',
      image: '',
      category: '',
      packagingId: '',
      hasOptions: false,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <Box
      component="form"
      onSubmit={formik.handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "24px",
      }}
    >
      {/* CABECERA */}
      <Box sx={{
        display: "flex", 
        justifyContent: "space-between", 
        gap:"24px",
        backgroundColor: greyColor[200],
        borderRadius: "8px",
        padding: "16px",
      }}>
        <FormControl>
          <Heading5>Estado del producto</Heading5>
          <Box sx={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
            <SwitchCustom name="isActive" checked={formik.values.isActive} onChange={formik.handleChange} />
            <BodyS>{formik.values.isActive ? "Activo" : "Inactivo"}</BodyS>
          </Box>
        </FormControl>
        <Box sx={{ display: "flex", columnGap: "16px", flexWrap: "wrap", width: {xs: "100%", md: "auto"}}}>
          <FormControl sx={{ width: "260px", minWidth: "240px", flex: {xs: 1, md: 0} }}>
            <Heading5 marginBottom={"4px"}>Sección del producto</Heading5>

            <Select
              id="sectionId"
              name="sectionId"
              multiple
              value={selectedSections}
              displayEmpty
              onChange={(event: SelectChangeEvent<number[]>) => {
                const {
                  target: { value },
                } = event;
                const newSelected = typeof value === 'string' 
                  ? value.split(',').map(Number) 
                  : value.map(Number);
                setSelectedSections(newSelected);
              }}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                // Aseguramos que selected sea tratado como number[]
                const selectedNumbers = Array.isArray(selected) ? selected : [];
                
                if (selectedNumbers.length === 0) {
                  return <BodyM sx={{ color: greyColor[400] }}>Seleccionar secciones</BodyM>;
                }
                
                return sections
                  .filter((section) => selectedNumbers.includes(section.id))
                  .map((section) => section.title)
                  .join(', ');
              }}
              sx={{ width: "100%" }}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 225,
                    width: 240,
                  },
                },
              }}
            >
              {sections.map((section) => (
                <MenuItem key={`${section.id}-${section.slug}`} value={section.id}>
                  <Checkbox checked={selectedSections.includes(section.id)} />
                  <ListItemText primary={section.title} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: "180px", flex: {xs: 1, md: 0}}}>
            <Heading5 marginBottom={"4px"}>Código del producto</Heading5>
            <TextField 
              name="code" 
              value={formik.values.code} 
              onChange={formik.handleChange}
              placeholder="Ej. ABC1011" 
            />
          </FormControl>
        </Box>

      </Box>
      {/* TITULO */}
      <FormControl sx={{ width: "100%"}}>
        <Heading5 marginBottom={"4px"}>Título / Nombre del producto</Heading5>
        <TextField name="title" value={formik.values.title} onChange={formik.handleChange} placeholder="Ej: Reishi - Doble Extracto 30ml"/>
      </FormControl>
      {/* PRECIOS */}
      <Box sx={{ display: "flex", columnGap: "16px" }}>
        <FormControl sx={{ flex: 1 }}>
          <Heading5 marginBottom={"4px"}>Precio del producto</Heading5>
          <TextField name="price" value={formik.values.price} onChange={formik.handleChange} placeholder="Ej: 30000" />
        </FormControl>
        <FormControl sx={{ flex: 1 }}>
          <Heading5 marginBottom={"4px"}>Descuento ocasional</Heading5>
          <Select 
            name="discount" 
            value={formik.values.discount} 
            onChange={formik.handleChange}
            renderValue={(selected) => {
              if (selected === '') {
                return 'Seleccionar descuento'
              }
              return `Eventual ${selected} %`;
            }}
          >
            {discounts.eventualDiscount1 && 
            <MenuItem value={discounts.eventualDiscount1}>
              <ListItemText primary={`Eventual ${discounts.eventualDiscount1} %`} />
            </MenuItem>}
            {discounts.eventualDiscount2 && 
            <MenuItem value={discounts.eventualDiscount2}>
              <ListItemText primary={`Eventual ${discounts.eventualDiscount2} %`} />
            </MenuItem>}
            {discounts.eventualDiscount3 && <MenuItem value={discounts.eventualDiscount3}>
              <ListItemText primary={`Eventual ${discounts.eventualDiscount3} %`} />
            </MenuItem>}
          </Select>

        </FormControl>
      </Box>
      {/* DESCRIPCION */}
      <Box>
      <FormControl sx={{ width: "100%"}}>
        <Heading5 marginBottom={"4px"}>Detalles del producto</Heading5>
        <TextField
          fullWidth
          multiline={true}
          rows={4}
          name="description"
          value={formik.values.description}
          onChange={formik.handleChange}
          placeholder="Escribí acá la información adicional sobre el producto"
          sx={{ "& .MuiOutlinedInput-root": { padding: "16px 20px" }}}
        />
      </FormControl>

      </Box>
      {/* IMAGENES */}
      <Box>
        <Heading5 marginBottom={"4px"}>Imágenes del producto</Heading5>
        {/* card de nueva imagen */}
        <Button 
        variant="contained" 
        sx={{ 
          display: "flex", 
          flexDirection: "column",
          alignItems: "center", 
          justifyContent: "center", 
          gap: "4px",
          width: "144px",
          height: "144px",
          color: greyColor[950],
          backgroundColor: greyColor[200],
          textTransform: "none",
          padding: "20px",
        }}>
          <AddBoxOutlinedIcon sx={{ fontSize: "40px" }}/>
          <BodyS>Agregar imágenes</BodyS>
        </Button>
      </Box>
      {/* BOTONES  isLoading*/}
      <Box>
        <ColorButton
          id={`bt-admin-product-save`}
          type="brownButton"
          onClick={() => formik.submitForm()}
          text="Guardar Cambios"
          isFetching={formik.isSubmitting}
          disabled={formik.isSubmitting || isLoadingSections || isLoadingDiscounts}
          sx={{width: "100%", maxWidth: "383px", marginX: "auto"}}
        />
      </Box>
    </Box>
  )
}