// src/modules/admin/components/ProductDetailsForm.tsx
import { BodyM, BodyMEmph, BodyS, Heading5 } from "@/theme/textStyles"
import { greyColor } from "@/theme/theme"
import { Box, Checkbox, FormControl, MenuItem, OutlinedInput, Select, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
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
import { useCloudinaryUpload } from "@/shared/hooks/api/useCloudinaryUpload"
import { useCloudinaryMultiUpload } from "@/shared/hooks/api/useCloudinaryMultipleUploads"
import { ThumbnailImage } from "@/shared/components/cloudinary/ThumbnailImage"
import { supabase } from "@/api/apiClient"
import { toast } from "react-toastify"
import { numberToPrice } from "@/shared/utils/convertNumberToPrice"
import { roundToThousands } from "@/shared/utils/roundPrices"

const validationSchema = Yup.object({
  title: Yup.string().required("Requerido"),
  description: Yup.string(),
  internal_code: Yup.string().required("Requerido"),
  price: Yup.number().required("Requerido").positive(),
  price_without_tax: Yup.number(),
  price_discount: Yup.number(),
  price_transfer: Yup.number(),
  plan: Yup.string(),
  discount: Yup.number().min(0).max(100),
  packaging_id: Yup.number().required("Requerido"),
  sectionIds: Yup.array().of(Yup.number()).min(1, "Seleccioná al menos una sección"),
  img_secure_url: Yup.string().required("Subí la portada"),
  img_public_id: Yup.string().required("Falta el publicId de la portada"),
  gallery_public_ids: Yup.array().of(Yup.string()),
  is_valid: Yup.boolean().required(),
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

  const { uploadFile, uploading: uploadingCover } = useCloudinaryUpload();
  const { uploadFiles, uploading: uploadingGallery } = useCloudinaryMultiUpload();


  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      internal_code: "",
      price: 0,
      price_discount: 0,
      price_transfer: 0,
      price_without_tax: 0,
      plan: "",
      discount: "",
      packaging_id: 0,
      sectionIds: [] as number[],
      img_secure_url: "",
      img_public_id: "",
      gallery_public_ids: [] as string[],
      is_valid: true,
    },
    validationSchema,
    validateOnMount: true,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setSubmitting(true);

            const { sectionIds, ...productData } = values;

        // insertar producto (primera llamada - sin sectionIds)
        const { data: product, error: productError } = await supabase
          .from("products")
          .insert([
            {
              ...productData,
              //si en el futuro se necesita, agregar FormControl para traer Packaging
              packaging_id: 1,
            },
          ])
          .select("id")
          .single();

        if (productError) throw productError;

        // insertar relaciones en product_sections
        if (sectionIds.length > 0) {
          const sectionRows = sectionIds.map((sectionId) => ({
            product_id: product.id,
            section_id: sectionId,
          }));

          const { error: sectionError } = await supabase
            .from("product_sections")
            .insert(sectionRows);

          if (sectionError) throw sectionError;
        }

        console.log("✅ Producto creado con éxito:", product.id);
        resetForm();
        setSelectedSections([]);
        toast.success("Producto creado con éxito");

      } catch (err) {
        toast.error("Error creando producto");
        console.error("Error creando producto:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    // solo calculamos si tenemos un price válido y discounts ya llegó
    if (!formik.values.price || !discounts || !formik.values.discount) return;

    const price = Number(formik.values.price);
    const discount = Number(formik.values.discount || 0);

    // aplicamos descuentos con fallback por si faltan
    const bankTransfer = discounts.bankTransfer ?? 0;
    const taxDiscount = discounts.taxDiscount ?? 0;

    // valores calculados
    const priceDiscount = roundToThousands(price * (100 - discount) / 100);
    const priceTransfer = priceDiscount * (100 - bankTransfer) / 100;
    const priceWithoutTax = price * (100 - taxDiscount) / 100;
    const plan = `6 x ${numberToPrice(priceDiscount / 6)}`

    formik.setFieldValue("price_discount", priceDiscount);
    formik.setFieldValue("price_transfer", priceTransfer);
    formik.setFieldValue("price_without_tax", priceWithoutTax);
    formik.setFieldValue("plan", plan);

  }, [
    formik.values.price,
    formik.values.discount,
    discounts // depende directamente del hook de supabase
  ]);

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
      <FormControl sx={{width: "100%", height: "64px"}}>
        <Box sx={{
          height: "100%",
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          backgroundColor: greyColor[200],
          borderRadius: "8px",
          padding: "24px 16px",
        }}>
          <Heading5>Estado del producto</Heading5>
          <Box sx={{ display: "flex", alignItems: "center", columnGap: "8px" }}>
            <SwitchCustom name="isActive" checked={formik.values.is_valid} onChange={formik.handleChange} />
            <BodyS>{formik.values.is_valid ? "Activo" : "Inactivo"}</BodyS>
          </Box>
        </Box>
      </FormControl>
      <Box sx={{
        display: "flex", 
        justifyContent: "space-between", 
        gap:"24px",
        columnGap: "16px", flexWrap: "wrap",
        
      }}>
        <Box sx={{
          backgroundColor: greyColor[200],
          flex: {xs: 1, sm: 1, md: 1},
          borderRadius: "8px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
          <FormControl sx={{ width: "100%", minWidth: "240px", flex: {xs: 1, md: 0} }}>
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
                formik.setFieldValue("sectionIds", newSelected);
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
              sx={{ 
                width: "100%",
                // "& .MuiSelect-select": {
                //   backgroundColor: greyColor[50],
                // },
                "& .MuiOutlinedInput-root": {
                  backgroundColor: greyColor[50]
                }
              }}
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

          <FormControl sx={{width: "100%", minWidth: "180px", flex: {xs: 1, md: 0}}}>
            <Heading5 marginBottom={"4px"}>Código del producto</Heading5>
            <TextField 
              name="internal_code" 
              value={formik.values.internal_code} 
              onChange={formik.handleChange}
              placeholder="Ej. ABC1011"
              sx={{"& .MuiOutlinedInput-root": { backgroundColor: greyColor[50] }}}
            />
          </FormControl>
        </Box>
        
        <Box sx={{
          backgroundColor: greyColor[200], 
          flex: {xs: 1, sm: 0, md: 1},
          borderRadius: "8px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
          <Heading5 marginBottom={"4px"}>Portada del producto</Heading5>
          <Box
            component="input"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            id="cover-upload"
            onChange={async (e) => {
              if (e.target.files && e.target.files[0]) {
                const result = await uploadFile(e.target.files[0]);
                if (result) {
                  formik.setFieldValue("img_secure_url", result.secure_url);
                  formik.setFieldValue("img_public_id", result.public_id);
                }
              }
            }}
          />
          {/* card de nueva imagen */}
          <label htmlFor="cover-upload">
            <Button 
            variant="contained" 
            component="span"
            disabled={uploadingCover}
            sx={{ 
              display: "flex", 
              flexDirection: "column",
              alignItems: "center", 
              justifyContent: "center", 
              gap: "4px",
              width: "144px",
              height: "144px",
              color: greyColor[950],
              backgroundColor: greyColor[50],
              textTransform: "none",
              border: `1px solid ${greyColor[800]}`,
              padding: 0,
              margin: 0,
            }}>
            {formik.values.img_secure_url ? (
              <img
                src={formik.values.img_secure_url}
                alt="cover"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <>
                <AddBoxOutlinedIcon sx={{ fontSize: "40px" }} />
                <BodyS sx={{ textAlign: "center" }}>Agregar Portada</BodyS>
              </>
            )}
            </Button>
          </label>
        </Box>

      </Box>
      {/* TITULO */}
      <FormControl sx={{ width: "100%"}}>
        <Heading5 marginBottom={"4px"}>Título / Nombre del producto</Heading5>
        <TextField name="title" value={formik.values.title} onChange={formik.handleChange} placeholder="Ej: Reishi - Doble Extracto 30ml"/>
      </FormControl>
      {/* PRECIOS */}
      <Box sx={{ display: "flex", gap: "32px" }}>
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px"}}>
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
                if (!selected) {
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
        <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
          <Heading5 marginBottom={"4px"}>Detallado de precios</Heading5>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}><BodyMEmph>Sin impuestos</BodyMEmph><BodyM>{formik.values.price_without_tax ? numberToPrice(formik.values.price_without_tax) : "--"}</BodyM></Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}><BodyMEmph>Con descuento eventual</BodyMEmph><BodyM>{formik.values.price_discount ? numberToPrice(roundToThousands(formik.values.price_discount)) : "--"}</BodyM></Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}><BodyMEmph>Por transferencia / depósito</BodyMEmph><BodyM>{formik.values.price_transfer ? numberToPrice(formik.values.price_transfer) : "--"}</BodyM></Box>
          <Box sx={{ display: "flex", alignItems: "center", gap: "4px" }}><BodyMEmph>En cuotas</BodyMEmph><BodyM>{formik.values.price_discount ? `6 x ${numberToPrice(formik.values.price_discount / 6)}` : "--"}</BodyM></Box>

        </Box>
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
        <Box sx={{ display: "flex", gap: "16px", flexWrap: "wrap"}}>
          <Box
            component="input"
            type="file"
            accept="image/*"
            multiple
            sx={{ display: "none" }}
            id="gallery-upload"
            onChange={async (e) => {
              if (e.target.files && e.target.files.length > 0) {
                const files = Array.from(e.target.files);
                const results = await uploadFiles(files);
                if (results.length > 0) {
                  const publicIds = results.map((r) => r.public_id);
                  formik.setFieldValue("gallery_public_ids", [
                    ...formik.values.gallery_public_ids,
                    ...publicIds,
                  ]);
                }
              }
            }}
          />
          <label htmlFor="gallery-upload">
            <Button
            component="span"
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
              border: `1px solid ${greyColor[800]}`,
            }}>
              <AddBoxOutlinedIcon sx={{ fontSize: "40px" }}/>
              <BodyS sx={{ textAlign: "center" }}>Agregar imágenes</BodyS>
            </Button>
          </label>
          {formik.values.gallery_public_ids && 
          formik.values.gallery_public_ids.map((publicId) => (
            <Box key={`thumbnail-${publicId}`} 
              sx={{ 
              width: "144px", 
              height: "144px", 
              overflow: "hidden", 
              display: "flex", 
              justifyContent: "center", 
              alignItems: "center",
              borderRadius: "8px",
              }}>
              <ThumbnailImage imgPublicId={publicId} />
            </Box>
          ))}
        </Box>
      </Box>
      {/* BOTONES  isLoading*/}
      <Box sx={{ display: "flex", gap: "16px"}}>
        <ColorButton
          id={`bt-admin-product-save`}
          type="brownButton"
          onClick={() => formik.submitForm()}
          text="Guardar Cambios"
          isFetching={formik.isSubmitting}
          disabled={
            !formik.dirty || 
            !formik.isValid || 
            formik.isSubmitting || 
            isLoadingSections || 
            isLoadingDiscounts || 
            uploadingGallery || 
            uploadingCover
          }
          sx={{width: "100%", maxWidth: "383px", marginX: "auto"}}
        />
        {/* <ColorButton
          id={`bt-admin-product-save`}
          type="brownButton"
          onClick={() => console.log("formik.values", formik.values)}
          text="Mostrar valores"
          isFetching={formik.isSubmitting}
          disabled={false}
          sx={{width: "100%", maxWidth: "383px", marginX: "auto"}}
        /> */}
      </Box>
    </Box>
  )
}