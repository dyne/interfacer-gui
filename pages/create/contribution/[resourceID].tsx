import { Card, Stack, Text } from "@bbtgnn/polaris-interfacer";
import CreateContributionFrom from "components/partials/create/contribution/CreateContributionForm";
import PLabel from "components/polaris/PLabel";
import ResourceDetailsCard from "components/ResourceDetailsCard";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { NextPageWithLayout } from "pages/_app";
import { ReactElement, useState } from "react";

// Request
import { useMutation, useQuery } from "@apollo/client";
import { PROPOSE_CONTRIBUTION, QUERY_RESOURCE, QUERY_UNIT_AND_CURRENCY } from "lib/QueryAndMutation";
import { EconomicResource, GetUnitAndCurrencyQuery } from "lib/types";
import { CREATE_PROCESS } from "lib/QueryAndMutation";
import devLog from "lib/devLog";
import { useAuth } from "hooks/useAuth";

//

const CreateContribution: NextPageWithLayout = () => {
  const { t } = useTranslation("CreateContributionProps");
  const [formError, setFormError] = useState("");

  const router = useRouter();
  const { resourceID } = router.query;
  const id = resourceID?.toString() || "";
  const { user } = useAuth();

  const unitAndCurrency = useQuery<GetUnitAndCurrencyQuery>(QUERY_UNIT_AND_CURRENCY).data?.instanceVariables;
  const [createProcess] = useMutation(CREATE_PROCESS);
  const [proposeContribution] = useMutation(PROPOSE_CONTRIBUTION);
  const { data, error } = useQuery<{ economicResource: EconomicResource }>(QUERY_RESOURCE, {
    variables: { id },
  });

  const resource = data?.economicResource;

  const onSubmit = async (formData: any) => {
    if (!resource) throw new Error("No original resource found");
    else {
      const processName = `contribution of ${resource.name} by ${user!.name}`;
      const { data: processData, errors } = await createProcess({ variables: { name: processName } });
      if (errors) throw new Error(errors[0].message);
      devLog("The process was created successfully with id: " + processData.createProcess.process.id);
      const variables = {
        resource: id,
        process: processData.createProcess.process.id,
        agent: user!.ulid,
        name: `${resource!.name} forked by ${user!.name}`,
        note: formData.description,
        metadata: JSON.stringify(resource?.metadata),
        location: resource!.currentLocation?.id,
        unitOne: unitAndCurrency?.units.unitOne.id!,
        creationTime: new Date().toISOString(),
        repo: formData.repositoryOrId,
        tags: resource!.classifiedAs,
        spec: resource!.conformsTo.id,
      };
      devLog("The variables are: ", variables);
      const proposal = await proposeContribution({ variables });
      devLog("The contribution was created successfully with id: " + JSON.stringify(proposal));
    }
  };

  if (error) {
    return (
      <Card>
        <div className="p-4 text-center text-red-600 space-y-2">
          <p>{t("Resource not found")}</p>
          <pre>{t(error.message)}</pre>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Stack vertical spacing="extraLoose">
        <Stack vertical spacing="tight">
          <Text as="h1" variant="headingXl">
            {t("Make a Contribution")}
          </Text>
          <Text as="p" variant="bodyMd">
            {t("Lorem ipsum sic dolor amet")}
          </Text>
        </Stack>

        <Stack vertical spacing="tight">
          <Text as="h2" variant="headingLg">
            {t("Contribution info")}
          </Text>
          <Text as="p" variant="bodyMd">
            {t("Help us display your proposal correctly.")}
          </Text>
        </Stack>

        {resource && (
          <Stack vertical spacing="extraTight">
            <PLabel label={t("Parent repository")} />
            <ResourceDetailsCard resource={resource} />
          </Stack>
        )}

        <CreateContributionFrom onSubmit={onSubmit} error={formError} setError={setFormError} />
      </Stack>
    </>
  );
};

//

CreateContribution.getLayout = function getLayout(page: ReactElement) {
  return <div className="mx-auto max-w-lg p-6">{page}</div>;
};

export default CreateContribution;
