// src/pages/Pools.tsx
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useGetPoolsQuery, useGetPoolServicesQuery } from "../../features/api/poolsEndpoint";
import SmartImage from "../../components/ui/SmartImage";
import "../../styles/pools.css";
import WebService, { IWebServiceFuncs } from "../../webService";
import apis from "../../webService/ApiUrls/apis";
import { useAppSelector } from "../../redux/hooks";
import { IKeyValue } from "mrv-utils";
import IResponse from "../../webService/ApiUrls/apis/IResponse";
import { IPool, IService } from "../../intrfaceces/types";

/**
 * Pools page with optimized expand/collapse behavior and smooth animations
 * Features single-expand functionality and proper service isolation
 */

const Pools: React.FC = () => {
  const refWebService = useRef<IWebServiceFuncs>()
  // const { data: pools, isLoading, error } = useGetPoolsQuery();
  const [expandedPoolId, setExpandedPoolId] = useState<number | null>(null);
  const [_services, set_services] = useState<IService[]>([])
  const [_pools, set_pools] = useState<IPool[]>([])

  // const { data: services } = useGetPoolServicesQuery(expandedPoolId!, { skip: !expandedPoolId, });
  const _userID = useAppSelector((s) => s.userSlice.id)

  // Fetch services only for the currently expanded pool

  const clickTimeoutRef = useRef<number | null>(null);
  const lastClickedRef = useRef<number>(0);

  /**
   * Toggle pool expansion with debouncing and single-expand behavior
   * Only one pool can be expanded at a time with smooth animations
   */
  const togglePoolServices = useCallback((poolId: number) => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickedRef.current;

    // Prevent rapid consecutive clicks (300ms protection)
    if (timeSinceLastClick < 300) return;

    lastClickedRef.current = now;

    // Clear any existing timeout
    if (clickTimeoutRef.current !== null) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    // Set timeout for smooth animation handling
    clickTimeoutRef.current = window.setTimeout(() => {
      setExpandedPoolId(prev => prev === poolId ? null : poolId);
    }, 30);
  }, []);



  // Cleanup timeouts on component unmount
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current !== null) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);



  useEffect(() => {
    _loadPools()
  }, [])
  useEffect(() => {
    _loadServices()
  }, [expandedPoolId])



  const _loadPools = async () => {

    const x2 = await refWebService.current?.callApi<IResponse<IPool[]>>(apis.pools.getAll())
    if (x2?.success) {
      set_pools(x2.data!)
    }

  }

  const _loadServices = async () => {
    const x1 = await refWebService.current?.callApi<IResponse<IService[]>>(apis.pools.services(expandedPoolId!))
    if (x1?.success) {
      set_services(x1.data!)
    }
  }




  // return <>
  //     <WebService ref={refWebService} />
  // </>

  // Loading state
  // if (isLoading)
  // return (
  //   <div className="relative min-h-screen">
  //     <div className="relative z-10 text-center py-20 text-white text-xl">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
  //       Loading investment pools...
  //     </div>

  //     <WebService ref={refWebService} />
  //   </div>
  // );

  // Error state
  // if (error) return (
  //   <div className="relative min-h-screen">
  //     <div className="relative z-10 text-center py-20 text-red-400 text-lg">
  //       <div className="text-4xl mb-4">⚠️</div>
  //       Failed to load pools data. Please try again later.
  //     </div>
  //   </div>
  // );

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
          {_pools?.map((pool, index) => (
            <div
              key={pool.id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`pool-card level-${pool.level} group transition-all duration-300 ${expandedPoolId === pool.id ? '!border-primary !scale-105 expanded' : ''
                }`}
            >
              {/* Compact Card View */}
              <div
                className="pool-compact group-hover:bg-dark-gray/50 transition-colors duration-200 cursor-pointer"
                onClick={() => togglePoolServices(pool.id)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    togglePoolServices(pool.id);
                  }
                }}
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
                        togglePoolServices(pool.id);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
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