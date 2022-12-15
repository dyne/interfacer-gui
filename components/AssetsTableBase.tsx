import { FetchInventoryQuery } from "lib/types";
import { useTranslation } from "next-i18next";

// Components
import Link from "next/link";
import AssetsTableRow from "./AssetsTableRow";
import BrTable from "./brickroom/BrTable";

//

export interface AssetsTableBaseProps {
  data: FetchInventoryQuery;
  hidePagination?: boolean;
  onLoadMore?: () => void;
}

//

export default function AssetsTableBase(props: AssetsTableBaseProps) {
  const { data, hidePagination = false, onLoadMore = () => {} } = props;
  const { t } = useTranslation("lastUpdatedProps");

  const assets = data.economicResources?.edges;
  const hasNextPage = data.economicResources?.pageInfo.hasNextPage;
  const showEmptyState = !Boolean(assets) || assets?.length == 0;

  //

  return (
    <div>
      <BrTable headArray={[t("Asset"), t("Asset Type"), t("Last update"), t("tags"), t("Owner")]}>
        {assets?.map((e: any) => (
          <AssetsTableRow asset={e} key={e.cursor} />
        ))}
      </BrTable>

      {/* Empty state */}
      {showEmptyState && (
        <div className="p-4 pt-6">
          <h4>{t("Create a new asset")}</h4>
          <p className="pt-2 pb-5 font-light text-white-700">{t("empty_state_assets")}</p>
          <Link href="/create_asset">
            <a className="btn btn-accent btn-md">{t("Create asset")}</a>
          </Link>
        </div>
      )}

      {/* Pagination */}
      {!hidePagination && (
        <div className="w-full pt-4 text-center">
          {hasNextPage && (
            <button className="text-center btn btn-primary" onClick={onLoadMore}>
              {t("Load more")}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
