import Head from "next/head";
import Navbar from "../components/Navbar";
import TradeMain from "../components/Trade";

import { useRouter } from "next/router";

import { useState, useEffect } from "react";
import { getWallet } from "../lib/near";

const Trade = () => {
  const router = useRouter();
  const queries = router.query;

  const [nearId, setNearId] = useState();

  useEffect(() => {
    router.replace("/trade", undefined, { shallow: true });
  }, []);

  useEffect(() => {
    getWallet().then((r) => {
      const { near, wallet } = r;
      console.log("wallet", wallet.account().accountId);
      setNearId(wallet.account().accountId);
    });
  }, []);

  return (
    <>
      <Head>
        <title>Trades</title>
      </Head>
      <Navbar nearId={nearId} setNear={setNearId} />
      {<TradeMain nearId={nearId} query={queries} />}
    </>
  );
};

export default Trade;
