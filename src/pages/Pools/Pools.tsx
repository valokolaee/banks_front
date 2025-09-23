// src/pages/Pools.tsx
import React, { useEffect, useRef, useState } from "react";
import { IPool, IService } from "../../intrfaceces/types";
import "../../styles/pools.css";
import WebService, { IWebServiceFuncs } from "../../webService";
import apis from "../../webService/ApiUrls/apis";
import IResponse from "../../webService/ApiUrls/apis/IResponse";
import PoolsItem from "./item";



const Pools: React.FC = () => {
  const refWebService = useRef<IWebServiceFuncs>()

  const [expandedPoolId, setExpandedPoolId] = useState<number>(-1);
  const [_services, set_services] = useState<IService[]>([])
  const [_pools, set_pools] = useState<IPool[]>([])


  useEffect(() => {
    _loadPools()
  }, [])



  const _loadPools = async () => {

    const x2 = await refWebService.current?.callApi<IResponse<IPool[]>>(apis.pools.getAll())
    if (x2?.success) {
      set_pools(x2.data!)
    }

  }



  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        {/* Page Header */}
        <div data-aos="fade-up" className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-br from-primary to-primary/70 bg-clip-text sm:text-5xl md:text-6xl mb-4">
            Investment Pools
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover high-yield investment opportunities with secure returns
          </p>
        </div>

        {/* Pools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {_pools?.map((pool, index) => (<PoolsItem pool={pool} index={index} expandedPoolId={expandedPoolId} setExpandedPoolId={setExpandedPoolId} />))}
        </div>

        {/* Empty State */}
        {!_pools?.length && (
          <div
            data-aos="fade-up"
            className="text-center py-12 text-gray-400"
          >
            <div className="text-6xl mb-4">💧</div>
            <h3 className="text-xl font-semibold mb-2">No pools available</h3>
            <p>Investment opportunities will be listed here soon</p>
          </div>
        )}
      </div>
      <WebService ref={refWebService} />

    </div>
  );
};

export default Pools;