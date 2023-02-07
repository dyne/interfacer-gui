import { Checkbox, Stack, TextField } from "@bbtgnn/polaris-interfacer";
import { yupResolver } from "@hookform/resolvers/yup";
import PTitleSubtitle from "components/polaris/PTitleSubtitle";
import SelectLocation2 from "components/SelectLocation2";
import { LocationLookup } from "lib/fetchLocation";
import { isRequired } from "lib/isFieldRequired";
import { useTranslation } from "next-i18next";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { ProjectType } from "./CreateProjectForm";

//

export interface LocationStepValues {
  locationName: string;
  location: LocationLookup.Location | null;
  remote: boolean;
}

export const locationStepDefaultValues: LocationStepValues = {
  locationName: "",
  location: null,
  remote: false,
};

export const locationStepSchema = yup.object().shape({
  locationName: yup.string(),
  location: yup
    .object()
    .when("$projectType", ([projectType], schema) =>
      projectType == "product" ? schema.required() : schema.nullable()
    ),
  remote: yup.boolean(),
});

export interface LocationStepSchemaContext {
  projectType: ProjectType;
}

//

export type LocationStepData = FormValues | null;

export interface Props {
  onValid?: (values: LocationStepData) => void;
  projectType?: "product" | "service";
}

//

export default function LocationStepProduct(props: Props) {
  const { onValid = () => {}, projectType = "service" } = props;
  const { t } = useTranslation();

  const defaultValues: FormValues = {
    locationName: "",
    location: null,
    remote: false,
  };

  const locationError = t("Please search for a location");

  const serviceSchema = yup.object().shape({
    locationName: yup.string(),
    location: yup.object().nullable(),
    remote: yup.boolean(),
  });
  const projectSchema = yup.object().shape({
    locationName: yup.string(),
    location: yup.object().required(locationError),
    remote: yup.boolean(),
  });
  const schema = projectType == "service" ? serviceSchema : projectSchema;

  const form = useForm<FormValues>({
    mode: "all",
    resolver: yupResolver(schema),
    defaultValues,
  });

  const { formState, control, watch } = form;
  const { errors, isValid } = formState;

  onValid(isValid ? watch() : null);

  //

  return (
    <Stack vertical spacing="extraLoose">
      <PTitleSubtitle title={t("Set location")} subtitle={t("Please read our Documentation Guidelines.")} />

      <Controller
        control={control}
        name="locationName"
        render={({ field: { onChange, onBlur, name, value } }) => (
          <TextField
            type="text"
            id={name}
            name={name}
            value={value}
            autoComplete="off"
            onChange={onChange}
            onBlur={onBlur}
            label={t("Location name")}
            placeholder={t("Cool fablab")}
            helpText={t("The name of the place where the project is stored")}
            error={errors[name]?.message}
            requiredIndicator={isRequired(schema, name)}
          />
        )}
      />

      <Controller
        control={control}
        name="location"
        render={({ field: { onChange, onBlur, name, ref } }) => (
          <SelectLocation2
            id={name}
            name={name}
            ref={ref}
            onBlur={onBlur}
            onChange={onChange}
            label={t("Search the full address")}
            placeholder={t("Hamburg, Boxhagener Str. 3")}
            error={errors[name]?.message ? locationError : ""}
            creatable={false}
            requiredIndicator={isRequired(schema, name)}
            isClearable
          />
        )}
      />

      {projectType == "service" && (
        <Checkbox
          id="remote"
          name="remote"
          onChange={value => form.setValue("remote", value)}
          checked={watch("remote")}
          label={t("This service happens remotely / online")}
          error={errors["remote"]?.message}
        />
      )}
    </Stack>
  );
}
