import { useEffect, useState } from 'react';

export default function useLatestData() {
  // creating slices state
  const [hotSlices, setHotSlices] = useState();

  // creating slicemasters state
  const [slicemasters, setSlicemasters] = useState();

  // use a side effect to fetch the data from the graphql
  // endpoint
  useEffect(function () {
    fetch(process.env.GATSBY_GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
        query {
          StoreSettings(id: "downtown") {
            name
            slicemaster {
              name
            }
            hotSlices {
              name
            }
          }
        }
        `,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        // TODO check for errors
        // set data to state
        setHotSlices(res.data.StoreSettings.hotSlices);
        setSlicemasters(res.data.StoreSettings.slicemaster);
      });
    // when componenet loads, fetch the data
  }, []);
  return {
    hotSlices,
    slicemasters,
  };
}
