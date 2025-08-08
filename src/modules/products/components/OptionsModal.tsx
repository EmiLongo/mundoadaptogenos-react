// src\modules\products\components\OptionsModal.tsx
import React, { useEffect } from "react";
import { Box, MenuItem, Select, FormControl } from "@mui/material";
import { InputLabel } from "@theme/textStyles";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";

const validationSchema = Yup.object({
  option1: Yup.string().required("Opción 1 es obligatoria"),
  option2: Yup.string().required("Opción 2 es obligatoria"),
  option3: Yup.string().required("Opción 3 es obligatoria"),
});

interface IOptionsModal {
  selectedOptions: string[];
  setSelectedOptions: (options: string[]) => void;
  selectInfo: { value: string; label: string }[];
  exposeValidation?: (validate: () => Promise<any>) => void;
  exposeReset?: (reset: () => void) => void;
}

export const OptionsModal: React.FC<IOptionsModal> = ({
  selectedOptions,
  setSelectedOptions,
  selectInfo,
  exposeValidation,
  exposeReset,
}) => {
  const formik = useFormik({
    initialValues: {
      option1: selectedOptions[0] || "",
      option2: selectedOptions[1] || "",
      option3: selectedOptions[2] || "",
    },
    validationSchema,
    onSubmit: (values) => {
      setSelectedOptions([values.option1, values.option2, values.option3]);
      toast.success("Las opciones se agregaron correctamente");
    },
  });

  const handleChange = (value: string, id: keyof typeof formik.values, position: number) => {
    if (value === "") return;
    const updatedOptions = [...selectedOptions];
    updatedOptions[position] = value;
    formik.setFieldValue(id, value);
    setSelectedOptions(updatedOptions);
  };

  useEffect(() => {
    if (exposeValidation) {
      exposeValidation(async () => {
        formik.setTouched({
          option1: true,
          option2: true,
          option3: true,
        });
        return formik.validateForm();
      });
    }
  }, [exposeValidation]);

  useEffect(() => {
    if (exposeReset) {
      exposeReset(() => formik.resetForm());
    }
  }, [exposeReset]);

  return (
    <Box
      sx={{
        width: { xs: "100%", sm: "265px", lg: "350px" },
        display: "flex",
        flexDirection: "column",
        position: "relative",
        gap: "16px",
      }}
    >
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {/* Opción 1 */}
          <FormControl
            fullWidth
            required
            error={formik.touched.option1 && Boolean(formik.errors.option1)}
          >
            <InputLabel id="label-select-one" sx={{ marginBottom: "4px" }}>
              Opción 1
            </InputLabel>
            <Select
              labelId="label-select-one"
              id="option1"
              name="option1"
              value={formik.values.option1}
              onChange={(e) => handleChange(e.target.value, "option1", 0)}
              onBlur={() => formik.setFieldTouched("option1", true)}
            >
              {selectInfo.map((info, index) => (
                <MenuItem key={index} value={info.value}>
                  {info.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Opción 2 */}
          <FormControl
            fullWidth
            required
            error={formik.touched.option2 && Boolean(formik.errors.option2)}
          >
            <InputLabel id="label-select-two" sx={{ marginBottom: "4px" }}>
              Opción 2
            </InputLabel>
            <Select
              labelId="label-select-two"
              id="option2"
              name="option2"
              value={formik.values.option2}
              onChange={(e) => handleChange(e.target.value, "option2", 1)}
              onBlur={() => formik.setFieldTouched("option2", true)}
            >
              {selectInfo.map((info, index) => (
                <MenuItem key={index} value={info.value}>
                  {info.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Opción 3 */}
          <FormControl
            fullWidth
            required
            error={formik.touched.option3 && Boolean(formik.errors.option3)}
          >
            <InputLabel id="label-select-three" sx={{ marginBottom: "4px" }}>
              Opción 3
            </InputLabel>
            <Select
              labelId="label-select-three"
              id="option3"
              name="option3"
              value={formik.values.option3}
              onChange={(e) => handleChange(e.target.value, "option3", 2)}
              onBlur={() => formik.setFieldTouched("option3", true)}
            >
              {selectInfo.map((info, index) => (
                <MenuItem key={index} value={info.value}>
                  {info.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </form>
    </Box>
  );
};
