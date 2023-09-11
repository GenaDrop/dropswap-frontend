import Head from "next/head";
import Navbar from "../components/Navbar";
import Main from "../components/Main";

import { useRouter } from "next/router";

import { useEffect, useState } from "react";
import { getWallet } from "../lib/near";

export default function Home() {
  // pass near wallet prop into here
  const router = useRouter();
  const queries = router.query;
  const [nearId, setNearId] = useState(null);

  useEffect(() => {
    router.replace("/", undefined, { shallow: true });
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
        <title>HavenSwap</title>
      </Head>
      <Navbar setNear={setNearId} nearId={nearId} />
      {<Main nearId={nearId} query={queries} />}
    </>
  );
}
