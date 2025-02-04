import { Link, Stack, Text } from "@bbtgnn/polaris-interfacer";
import { License } from "lib/licenses/types";
import { getLicenseById } from "lib/licenses/utils";

export interface Props {
  label?: string;
  license?: License;
  licenseId?: string;
}

export default function LicenseDisplay(props: Props) {
  const { label, license, licenseId } = props;

  let l: License;

  if (license) l = license;
  else if (licenseId) l = getLicenseById(licenseId)!;
  else return <></>;

  return (
    <Stack vertical spacing="extraTight">
      {label && (
        <Text as="p" variant="bodyMd" fontWeight="bold" id="license-scope">
          {label}
        </Text>
      )}
      <Text as="p" variant="bodyMd" id="license-id">
        {licenseId === "NOASSERTION" ? (
          "UNKNOW"
        ) : (
          <Link external url={`https://spdx.org/licenses/${l?.licenseId}.html`}>
            {l?.name}
          </Link>
        )}
      </Text>
    </Stack>
  );
}
