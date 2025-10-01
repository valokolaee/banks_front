// src/pages/Banks.tsx
import React, { useState, useCallback, useEffect, useRef } from "react";
import { useGetBanksQuery, useGetBankServicesQuery } from "../../features/api/banksEndpoint";
// import Background from "../components/ui/Background";
import SmartImage from "../../components/ui/SmartImage";
import "../../styles/banks.css";
import { IBank, IService } from "../../intrfaceces/types";
import WebService, { IWebServiceFuncs } from "../../webService";
import IResponse from "../../webService/ApiUrls/apis/IResponse";
import apis from "../../webService/ApiUrls/apis";

type Timeout = ReturnType<typeof setTimeout>;

/**
 * Banks page with proper service isolation and single-expand behavior
 * Each bank shows only its own services, and only one bank can be expanded at a time
 */
const BanksItem: React.FC<IBank> = ({logo,has_loan,id,level,name,profit,desc,services}) => {
  const refWebService = useRef<IWebServiceFuncs>()
  const [banks, set_banks] = useState<IBank[]>();
  // const [services, set_services] = useState<IService[]>([])
  const [expandedBankId, setExpandedBankId] = useState<number | null>(null);


  useEffect(() => {
    _loadPools()
  }, [])
  // useEffect(() => {
  //   _loadServices()
  // }, [expandedBankId])



  const _loadPools = async () => {

    const x2 = await refWebService.current?.callApi<IResponse<IBank[]>>(apis.banks.getAll())
    if (x2?.success) {
      set_banks(x2.data!)
      console.log(x2);

    }

  }

  // const _loadServices = async () => {
  //   const x1 = await refWebService.current?.callApi<IResponse<IService[]>>(apis.pools.services(expandedBankId!))
  //   if (x1?.success) {
  //     set_services(x1.data!)
  //   }
  // }


  // const { data: banks, isLoading, error } = useGetBanksQuery();
  // Get services only for the currently expanded bank
  // const { data: services } = useGetBankServicesQuery(expandedBankId!, {
  //   skip: !expandedBankId, // Only fetch if a bank is expanded
  // });

  const clickTimeoutRef = useRef<Timeout | null>(null);
  const lastClickedRef = useRef<number>(0);

  /**
   * Toggle bank expansion with proper single-expand behavior
   * Only one bank can be expanded at a time
   */
  const toggleBankServices = useCallback((bankId: number) => {
    const now = Date.now();
    const timeSinceLastClick = now - lastClickedRef.current;

    // Prevent double-clicks
    if (timeSinceLastClick < 300) {
      return;
    }

    lastClickedRef.current = now;

    // Clear any existing timeout
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
    }

    // Set timeout for smooth animation
    clickTimeoutRef.current = setTimeout(() => {
      setExpandedBankId(prev => {
        // If clicking the same bank, toggle it
        // If clicking different bank, close previous and open new one
        return prev === bankId ? null : bankId;
      });
    }, 30);
  }, []);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (clickTimeoutRef.current) {
        clearTimeout(clickTimeoutRef.current);
      }
    };
  }, []);



  // return<>coming soon</>


  // if (isLoading) return (
  //   <div className="relative min-h-screen">
  //     {/* <Background /> */}
  //     <div className="relative z-10 text-center py-20 text-white text-xl">
  //       <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto mb-4"></div>
  //       Loading financial institutions...
  //     </div>
  //   </div>
  // );

  // if (error) return (
  //   <div className="relative min-h-screen">
  //     {/* <Background /> */}
  //     <div className="relative z-10 text-center py-20 text-red-400 text-lg">
  //       <div className="text-4xl mb-4">⚠️</div>
  //       Failed to load banks data. Please try again later.
  //     </div>
  //   </div>
  // );

  return (
    
            <div
              key={ id}
              data-aos="fade-up"
              // data-aos-delay={index * 100}
              className={`bank-card level-${ level} group transition-all duration-300 ${expandedBankId ===  id ? '!border-gold !scale-105' : ''
                }`}
            >
              {/* Compact Card View */}
              <div
                className="card-compact group-hover:bg-dark-gray/50 transition-colors duration-200 cursor-pointer"
                onClick={() => toggleBankServices( id)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    toggleBankServices( id);
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label={`Toggle ${ name} details`}
                aria-expanded={expandedBankId ===  id}
              >
                <SmartImage
                  src={ logo || ''}
                  alt={`${ name} logo`}
                  fallbackSrc="/images/fallback- png"
                  maxRetries={2}
                  className="w-12 h-12"
                  loading="lazy"
                />

                <div className="info">
                  <h3 className="group-hover:text-gold transition-colors duration-200">
                    { name}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    <span className="profit-tag group-hover:bg-gold group-hover:text-black transition-all duration-200">
                      Profit: { profit}%
                    </span>
                    <span className="loan-tag group-hover:bg-bronze group-hover:text-white transition-all duration-200">
                      Loan: { has_loan ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>

                <span className="bank-level group-hover:scale-110 transition-transform duration-200">
                  { level.toUpperCase()}
                </span>
              </div>

              {/* Expanded Services View - Only show for the currently expanded bank */}
              {expandedBankId ===  id && (
                <div
                  className="card-details animate-in fade-in-80 zoom-in-95"
                  data-aos="fade-in"
                >
                  <div className="bank-header">
                    <SmartImage
                      src={ logo || ''}
                      alt={`${ name} logo`}
                      fallbackSrc="/images/fallback- png"
                      maxRetries={2}
                      className="w-16 h-16"
                    />
                    <div>
                      <h3 className="text-xl font-bold text-gold">{ name}</h3>
                      <p className="bank-description text-gray-300">
                        { desc || 'Comprehensive financial services provider'}
                      </p>
                    </div>
                  </div>

                  {/* Services List - Only show if this bank is expanded */}
                  {services && expandedBankId ===  id ? (
                    <div className="bank-services">
                      {services.map((service, index) => (
                        <div
                          key={index}
                          className="service-item animate-in fade-in-80 slide-in-from-bottom-2"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <strong className="text-gold">{service.key}</strong>
                          <span className="text-gray-200">{service.value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-4">Loading services...</p>
                  )}

                  <div className="bank-actions">
                    <button className="btn btn-outline hover:bg-gold hover:text-black transition-all duration-200">
                      View Details
                    </button>
                    <button
                      className="btn btn-small hover:bg-red-500 transition-all duration-200"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleBankServices( id);
                      }}
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
      <WebService ref={refWebService} />
            </div>
           
  );
};

export default BanksItem;