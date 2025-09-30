// src/pages/Account.tsx
import React, { useEffect, useRef, useState } from "react";
import CAvatar from "../components/ui/CAvatar";
import ImageUploader from "../components/ui/ImageUploader";
import {
  IBankAffiliation,
  IInvestment,
  ILoan,
  IProfits,
  IReferral,
  IUserStats
} from "../features/api/userEndpoint";
import IUser from "../intrfaceces/IUser";
import { useAppSelector } from "../redux/hooks";
import "../styles/account.css";
import csvOperations from "../utils/csvOperations";
import WebService, { IWebServiceFuncs } from "../webService";
import apis from "../webService/ApiUrls/apis";
import IResponse from "../webService/ApiUrls/apis/IResponse";
import { csvUrler } from "../webService/ApiUrls/apiUrlService/baseUrl";
import { Image } from "antd";
import { setUser, setUserAvatar } from "../redux/actions";
import { useNavigate } from "react-router-dom";

/**
 * Comprehensive account dashboard with user profile, stats, and financial data
 */
const Account: React.FC = () => {
  const refWebService = useRef<IWebServiceFuncs>()
  const navigate = useNavigate();
  const _user = useAppSelector((s) => s.userSlice)


  const [profit, set_profit] = useState<IProfits>({});
  // const [user, set_user] = useState<IUser>({});
  const [stats, set_stats] = useState<IUserStats>();
  const [investments, set_investments] = useState<IInvestment[]>([]);
  const [bankAffiliations, set_bankAffiliations] = useState<IBankAffiliation[]>([]);
  const [referrals, set_referrals] = useState<IReferral[]>();
  const [loans, set_loans] = useState<ILoan[]>();





  useEffect(() => {
    setTimeout(() => {
      _loadProf()
    }, 1000);
  }, [])


  const _loadProf = async () => {

    const csvFilePath = 'https://w.bankon.click/asset/data/reportu/royal_kmn.csv'
    const csvFilePath2 = 'https://w.bankon.click/asset/data/report/data_info.csc'
    const stats = await refWebService?.current?.callApi<IUserStats>(apis.users.stats)
    // set_stats(stats)
    console.log('stats', stats);


    const x2: IProfits[] = await csvOperations(csvFilePath2)
    const x: IProfits[] = await csvOperations(csvUrler('royal_kmn'))
    console.log('x', x2,);
    if (x.length > 0) {
      set_stats({
        total_assets: x[0].profit1,
        forex_earnings: x[0].profit2,
        referral_earnings: x[0].profit3,
        active_referrals: x[0].profit4,
      })
    }
    set_stats({
      total_assets: csvSampleData[0].profit1,
      forex_earnings: csvSampleData[0].profit2,
      referral_earnings: csvSampleData[0].profit3,
      active_referrals: csvSampleData[0].profit4,
    })
    const getMe = await refWebService?.current?.callApi<IResponse<IUser>>(apis.auth.getMe)

    if (getMe?.success) {
      setUser({ ..._user, ...getMe?.data! })
      setUserAvatar(_user.profileImage!)
    } else {
      // setUser( undefined)
      // TODO checke if not logged in and what to do
      // better show a ui to lead user into login page
      setUserAvatar('')
      // navigate('/login')

    }

    console.log('getMe', getMe);

    const investments = await refWebService?.current?.callApi<IInvestment[]>(apis.users.investments)
    // set_investments(investments!)
    // console.log('investments', investments);

    const bankAffiliations = await refWebService?.current?.callApi<IBankAffiliation[]>(apis.users.bank_affiliations)
    // set_bankAffiliations(bankAffiliations!)
    // console.log('bankAffiliations', bankAffiliations);

    const referrals = await refWebService?.current?.callApi<IReferral[]>(apis.users.referrals)
    // set_referrals(referrals!)
    // console.log('referrals', referrals);

    const loans = await refWebService?.current?.callApi<ILoan>(apis.users.loans)
    // console.log('loans', loans);


  }




  return (
    <div className="relative min-h-screen">
      <div className="relative z-10 px-6 py-20 max-w-7xl mx-auto">
        {/* Header */}
        <div data-aos="fade-up" className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-transparent bg-gradient-to-br from-gold via-bronze to-gold bg-clip-text sm:text-5xl mb-4">
            Account Dashboard
          </h1>
          <p className="text-gray-400 text-lg">
            Manage your investments, track performance, and view account details
          </p>
        </div>

        {/* Profile & Stats Section */}
        <div data-aos="fade-up" data-aos-delay="100" className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          {/* Profile Card */}
          <div className="account-card lg:col-span-1">
            <div className="profile-header">
              <div className="relative ">
                <div className="relative w-1/2 h-1/2 ">

                  <CAvatar
                    size={150}
                    shape="square"
                    url={_user?.profileImage! + '&a=' + new Date()}
                  />
                </div>
                {/* <Image
                  src={_user?.profileImage! + '&a=' + new Date()}
                  style={{ borderRadius: '10px' }}
                />
                */}
                <div className='absolute bottom-3 right-3 opacity-25 hover:opacity-75'>

                  <ImageUploader numberOfItems={1} />
                </div>

              </div>


              <h2 className="text-xl font-bold text-gold text-center">Welcome Back, {_user?.username}</h2>
              <p className="text-gray-400 text-center">{_user?.email}</p>
              <p className="text-bronze text-sm text-center capitalize mt-2">
                {_user?.clientType?.replace('_', ' ') || 'Individual Member'}
              </p>
            </div>

            <div className="profile-meta mt-4">
              <p className="text-sm text-gray-400">

                <strong>Member Since:</strong> {_user?.createdAt ? new Date(_user.createdAt).toLocaleDateString() : 'N/A'}
              </p>
              <p className="text-sm text-gray-400">
                {/* TODO Last Login should be checked on backend */}
                <strong>Last Login:</strong> {new Date().toLocaleDateString()}
              </p>
              <p className="text-sm text-gold">
                <strong>Rank:</strong> Gold Member
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="stat-card">
              <h3>Total Assets</h3>
              <p className="stat-value">${stats?.total_assets?.toLocaleString() || '0.00'}</p>
            </div>

            <div className="stat-card">
              <h3>Forex Earnings</h3>
              <p className="stat-value profit">
                +${stats?.forex_earnings?.toLocaleString() || '0.00'}
              </p>
            </div>

            <div className="stat-card">
              <h3>Referral Earnings</h3>
              <p className="stat-value">${stats?.referral_earnings?.toLocaleString() || '0.00'}</p>
            </div>

            <div className="stat-card">
              <h3>Active Referrals</h3>
              <p className="stat-value">{stats?.active_referrals || 0}</p>
            </div>
          </div>
        </div>

        {/* Investment Performance Section */}
        <div data-aos="fade-up" data-aos-delay="200" className="account-card mb-8">
          <h2 className="section-title">Investment Performance</h2>
          <div className="performance-placeholder">
            <p className="text-gray-400 text-center py-12">
              Investment chart will be displayed here
            </p>
          </div>
        </div>

        {/* Membership Plan Section */}
        <div data-aos="fade-up" data-aos-delay="300" className="account-card mb-8">
          <h2 className="section-title">Your Membership Plan</h2>
          <div className="plan-details">
            <p><strong>Current Rank:</strong> Gold Member</p>
            <p><strong>Available Services:</strong> Forex Trading, Pools A-F, Loans, Referral Bonuses</p>
            <p><strong>Locked Services:</strong> Premium Analytics, AI Signals</p>
          </div>
        </div>

        {/* Referrals Section */}
        <div data-aos="fade-up" data-aos-delay="400" className="account-card mb-8">
          <h2 className="section-title">Your Referral Network ({referrals?.length || 0})</h2>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Joined</th>
                </tr>
              </thead>
              <tbody>
                {referrals?.map((referral) => (
                  <tr key={referral.id}>
                    <td>{referral.name}</td>
                    <td>{referral.email}</td>
                    <td>
                      <span className={`status-badge ${referral.status}`}>
                        {referral.status}
                      </span>
                    </td>
                    <td>{new Date(referral.joined_at!).toLocaleDateString()}</td>
                  </tr>
                ))}
                {(!referrals || referrals.length === 0) && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-4">
                      No referrals found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Pool Investments Section */}
        <div data-aos="fade-up" data-aos-delay="500" className="account-card mb-8">
          <h2 className="section-title">Pool Investments ({investments?.length || 0})</h2>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Pool Name</th>
                  <th>Capital Invested</th>
                  <th>Profitability</th>
                  <th>Status</th>
                </tr>
              </thead>
              {investments?.length > 0 && <tbody>
                {investments?.map((investment) => (
                  <tr key={investment.id}>
                    <td>{investment.pool_name}</td>
                    <td>${investment.capital_invested!.toLocaleString()}</td>
                    <td className={investment.profitability!.startsWith('+') ? 'profit' : 'loss'}>
                      {investment.profitability}
                    </td>
                    <td>
                      <span className={`status-badge ${investment.status}`}>
                        {investment.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!investments || investments.length === 0) && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-4">
                      No active investments
                    </td>
                  </tr>
                )}
              </tbody>}
            </table>
          </div>
        </div>

        {/* Bank Affiliations Section */}
        <div data-aos="fade-up" data-aos-delay="600" className="account-card mb-8">
          <h2 className="section-title">Bank Affiliations ({bankAffiliations?.length || 0})</h2>
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Bank Name</th>
                  <th>Capital Invested</th>
                  <th>Profitability</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {bankAffiliations?.map((bank) => (
                  <tr key={bank.id}>
                    <td>{bank.bank_name}</td>
                    <td>${bank.capital_invested!.toLocaleString()}</td>
                    <td className={bank.profitability!.startsWith('+') ? 'profit' : 'loss'}>
                      {bank.profitability}
                    </td>
                    <td>
                      <span className={`status-badge ${bank.status}`}>
                        {bank.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {(!bankAffiliations || bankAffiliations.length === 0) && (
                  <tr>
                    <td colSpan={4} className="text-center text-gray-400 py-4">
                      No bank affiliations
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Loans Section */}
        <div data-aos="fade-up" data-aos-delay="700" className="account-card">
          <h2 className="section-title">Loan Details ({loans?.length || 0})</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loans?.map((loan) => (
              <div key={loan.id} className="loan-card">
                <h4>Loan #{loan.loan_id}</h4>
                <p><strong>Amount:</strong> ${loan.amount!.toLocaleString()}</p>
                <p><strong>Interest Rate:</strong> {loan.interest_rate}%</p>
                <p><strong>Term:</strong> {loan.term} months</p>
                <p><strong>Remaining:</strong> {loan.remaining_payments} payments</p>
                <p>
                  <strong>Status:</strong>
                  <span className={`status-badge ${loan.status} ml-2`}>
                    {loan.status}
                  </span>
                </p>
              </div>
            ))}
            {(!loans || loans.length === 0) && (
              <div className="col-span-full text-center text-gray-400 py-4">
                No active loans
              </div>
            )}
          </div>
        </div>
      </div>
      <WebService ref={refWebService} />
    </div>
  );


};

export default Account;

const csvSampleData: IProfits[] = [{
  profit1: 7062,
  profit2: 0.01,
  profit3: 6.08,
  profit4: 7491.37,

}]