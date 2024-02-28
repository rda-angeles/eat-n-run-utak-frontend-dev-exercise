import { salesSummaryContents } from "@/constants";
import { HeaderTypes } from "@/types";
import { SummaryCard } from "@/components";

import { useState, useEffect } from "react";

import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "@/config/firebase";

const SalesSummary = () => {
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    const getProductCount = async () => {
      const fbQuery = query(collection(db, "items"));
      const unsubscribe = onSnapshot(fbQuery, (querySnapshot) => {
        let itemsArrCount: any = [];
        querySnapshot.forEach((doc) => {
          itemsArrCount.push({ ...doc.data(), id: doc.id });
        });
        setProductCount(itemsArrCount.length);
      });
    };
    getProductCount();
  }, []);
  return (
    <div className="mb-6">
      <h1 className="font-bold text-4xl mb-[2rem]">Sales summary.</h1>

      <div className="grid grid-cols-3 gap-8 lg:max-w-[60rem]">
        {salesSummaryContents.map(
          ({ id, header, content, bgColor }: HeaderTypes) => (
            <SummaryCard
              key={id}
              id={id}
              header={header}
              content={content}
              bgColor={bgColor}
              productCount={productCount}
            />
          )
        )}
      </div>
    </div>
  );
};

export default SalesSummary;
