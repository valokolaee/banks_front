// src/pages/Pools.tsx
import React, { useEffect, useRef, useState } from "react";
import SmartImage from "../../components/ui/SmartImage";
import { IPool, IService } from "../../intrfaceces/types";
import "../../styles/pools.css";
import WebService, { IWebServiceFuncs } from "../../webService";
import apis from "../../webService/ApiUrls/apis";
import IResponse from "../../webService/ApiUrls/apis/IResponse";


const PoolsItem: React.FC<{ pool: IPool; index: number; expandedPoolId: number; setExpandedPoolId: (id: number) => void }> = ({ pool, index, expandedPoolId, setExpandedPoolId }) => {
  const refWebService = useRef<IWebServiceFuncs>()

  const [_services, set_services] = useState<IService[]>([])
  const [_pools, set_pools] = useState<IPool[]>([])


  useEffect(() => {
    if (expandedPoolId === pool.id) {
      _load()
    }
  }, [expandedPoolId])

  const _act = () => {
    setExpandedPoolId(pool.id)
  }

  const _load = async () => {
               // https://localhost:3002/uploads/pool/avatar_12.png
    // const u = `https://localhost:3002/uploads/pool/1.svg`
    // const x1 = await refWebService.current?.callApi<IResponse<IPool[]>>(apis.pools.update({ id: pool.id, logo: u }))
    // console.log('x1', x1);

    const x2 = await refWebService.current?.callApi<IResponse<IPool[]>>(apis.pools.getAll())
    if (x2?.success) {
      set_pools(x2.data!)
    }
    console.log(x2);

  }

  console.log(pool);
  
  return (
    <div
      key={pool.id}
      onClick={_act}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      className={`pool-card level-${pool.level} group transition-all duration-300 ${expandedPoolId === pool.id ? '!border-primary !scale-105 expanded' : ''
        }`}
    >
      {/* Compact Card View */}
      <div
        className="pool-compact group-hover:bg-dark-gray/50 transition-colors duration-200 cursor-pointer"
        tabIndex={0}
        role="button"
        aria-label={`Toggle ${pool.name} details`}
        aria-expanded={expandedPoolId === pool.id}
      >

        <SmartImage
          src={pool.logo || ''}
          alt={pool.name}
          fallbackSrc="/images/fallback-pool.png"
          maxRetries={2}
          className="w-12 h-12"
          loading="lazy"
        />

        <div className="info">
          <h3 className="group-hover:text-primary transition-colors duration-200">
            {pool.name}
          </h3>
          <div className="flex flex-wrap gap-1">
            <span className="level-tag group-hover:bg-primary group-hover:text-black transition-all duration-200">
              Level: {pool.level}
            </span>
            {pool.reward && (
              <span className="reward-tag group-hover:bg-gold group-hover:text-black transition-all duration-200">
                Reward: {pool.reward}
              </span>
            )}
          </div>
        </div>

        <span className="pool-status group-hover:scale-110 transition-transform duration-200">
          {pool.status || 'Active'}
        </span>
      </div>

      {/* Expanded Services View */}
      {expandedPoolId === pool.id && (
        <div
          className="pool-details animate-in fade-in-80 zoom-in-95"
          data-aos="fade-in"
        >
          <div className="pool-header">
            <SmartImage
              src={pool.logo || ''}
              alt={pool.name}
              fallbackSrc="/images/fallback-pool.png"
              maxRetries={2}
              className="w-16 h-16"
            />
            <div>
              <h3 className="text-xl font-bold text-primary">{pool.name}</h3>
              <p className="pool-description text-gray-300">
                {pool.desc || 'High-yield investment pool'}
              </p>
              {pool.capital_invested && (
                <p className="text-gold text-sm mt-2">
                  Capital: ${pool.capital_invested.toLocaleString()}
                </p>
              )}
            </div>
          </div>



          {/* Services List */}
          {_services && _services?.length > 0 ? (
            <div className="pool-services">
              {_services.map((service, index) => (
                <div
                  key={index}
                  className="service-item animate-in fade-in-80 slide-in-from-bottom-2"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <strong className="text-primary">{service.key}</strong>
                  <span className="text-gray-200">{service.value}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400 text-center py-4">No services available</p>
          )}




          {/* Action Buttons */}
          <div className="pool-actions">
            <button className="btn btn-outline hover:bg-primary hover:text-black transition-all duration-200">
              Invest Now
            </button>
            <button
              className="btn btn-small hover:bg-red-500 transition-all duration-200"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedPoolId(-1)
                // _act()
                // togglePoolServices(-1);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
      <WebService ref={refWebService} />
    </div>

  )


};

export default PoolsItem;