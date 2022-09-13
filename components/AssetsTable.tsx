import React, {useEffect, useState} from "react";
import Link from "next/link";
import BrTable from "./brickroom/BrTable";
import BrTags from "./brickroom/BrTags";
import BrDisplayUser from "./brickroom/BrDisplayUser";
import AssetImage from "./AssetImage";
import {useTranslation} from "next-i18next";
import {gql, useQuery} from "@apollo/client";
import devLog from "../lib/devLog";

const AssetsTable = ({userid}:{userid?:string}) => {
    const {t} = useTranslation('lastUpdatedProps')
    const QUERY_ASSETS = gql`query ($first: Int, $after: ID, $last: Int, $before: ID) {
  proposals(first: $first, after: $after, before: $before, last: $last) {
    pageInfo {
      startCursor
      endCursor
      hasPreviousPage
      hasNextPage
      totalCount
      pageLimit
    }
    edges {
      cursor
      node {
        id
        name
        primaryIntents {
          action {
            id
          }
          hasPointInTime
          hasBeginning
          hasEnd
          resourceInventoriedAs {
            conformsTo {
              name
            }
            primaryAccountable{
              name
              id
            }
            name
            id
            note
            onhandQuantity {
              hasUnit {
                label
              }
            }
            images {
              hash
              name
              mimeType
            }
          }
        }
        reciprocalIntents {
          resourceQuantity {
            hasNumericalValue
            hasUnit {
              label
              symbol
            }
          }
        }
      }
    }
  }
}
`
    const queryResult = useQuery(QUERY_ASSETS, {variables: {last: 10}})
    const updateQuery = (previousResult: any, {fetchMoreResult}: any) => {
        if (!fetchMoreResult) {
            return previousResult;
        }

        const previousEdges = previousResult.proposals.edges;
        const fetchMoreEdges = fetchMoreResult.proposals.edges;

        fetchMoreResult.proposals.edges = [...previousEdges, ...fetchMoreEdges];

        return {...fetchMoreResult}
    }
    const getHasNextPage = queryResult.data?.proposals.pageInfo.hasNextPage;
    const loadMore = () => {
        if (queryResult.data && queryResult.fetchMore) {
            const nextPage = getHasNextPage;
            const before = queryResult.data.proposals.pageInfo.endCursor;

            if (nextPage && before !== null) {
                queryResult.fetchMore({updateQuery, variables: {before}});
            }
        }
    }
    // Poll interval that works with pagination
    useEffect(() => {
        const intervalId = setInterval(() => {
            const total =
                (queryResult.data?.proposals.edges.length || 0)

            queryResult?.refetch({
                ...queryResult.variables,
                last: total
            });
        }, 7000);

        return () => clearInterval(intervalId);
    }, [
        ...Object.values(queryResult.variables!).flat(),
        queryResult.data?.proposals.pageInfo.startCursor
    ]);
    devLog(queryResult.data)
    const assets = userid?
        queryResult.data?.proposals.edges.filter((edge:any) => edge.node.primaryIntents[0].resourceInventoriedAs.primaryAccountable.id === userid) :
        queryResult.data?.proposals.edges


    return (<>
        <BrTable headArray={t('tableHead', {returnObjects: true})}>
            {assets?.map((e: any) =>
                <tr key={e.cursor}>
                    <td>
                        <div className="flex max-w-xs min-w-[10rem]">
                            {e.node.primaryIntents[0].resourceInventoriedAs?.images[0] &&
                            <div className="w-2/5 flex-none">
                                <AssetImage
                                    image={{
                                        hash: e.node.primaryIntents[0].resourceInventoriedAs?.images[0]?.hash,
                                        mimeType: e.node.primaryIntents[0].resourceInventoriedAs?.images[0]?.hash
                                    }}
                                    className="mr-1 max-h-20"/>
                            </div>}
                            <Link href={`/asset/${e.node.id}`} className="flex-auto">
                                <a className="ml-1">
                                    <h3 className="whitespace-normal break-words">
                                        {e.node.primaryIntents[0].resourceInventoriedAs?.name}
                                    </h3>
                                </a>
                            </Link>
                        </div>
                    </td>
                    <td className="pl-1">
                        <h4>4 min ago</h4>
                        <h5 className="whitespace-normal">11:00 AM, 11/06/2022</h5>
                    </td>
                    <td>
                        <h3>{e.node.reciprocalIntents[0].resourceQuantity.hasNumericalValue}</h3>
                        <p className="text-primary">Fab Tokens</p>
                    </td>
                    <td>
                        <BrDisplayUser id={e.node.primaryIntents[0].resourceInventoriedAs.primaryAccountable.id}
                                       name={e.node.primaryIntents[0].resourceInventoriedAs.primaryAccountable.name}/>
                    </td>
                    <td className="max-w-[12rem]">
                        <BrTags tags={['this', 'tags', 'are', 'fakes']}/>
                    </td>
                </tr>
            )}
        </BrTable>
        <div className="grid grid-cols-1 gap-4 mt-4 place-items-center">
            <button className="btn btn-primary" onClick={loadMore} disabled={!getHasNextPage}>{t('Load more')}</button>
        </div>
    </>)
}

export default AssetsTable
