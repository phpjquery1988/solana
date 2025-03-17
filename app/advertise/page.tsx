export default function AdvertisePage() {
  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Fees</h1>

        <p className="text-gray-400 mb-8">
          The following are fees charged by the ApeOrDie.fun platform when you use the platform:
        </p>

        <div className="overflow-x-auto">
          <table className="w-full mb-8">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left py-4 text-gray-400">Action</th>
                <th className="text-left py-4 text-gray-400">Fee</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-800">
                <td className="py-4">Create a coin</td>
                <td className="py-4">0.5 SOL</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-4">Buy or sell a coin while on the bonding curve</td>
                <td className="py-4">0.3% of the total purchase or sale price for each trade (in SOL)</td>
              </tr>
              <tr className="border-b border-gray-800">
                <td className="py-4">When a coin graduates from the platform to Raydium*</td>
                <td className="py-4">6 SOL</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="space-y-4 text-gray-400 text-sm">
          <p>
            *This is a fixed fee of 6 SOL that includes network and Raydium fees even though these may vary from time to
            time. This 6 SOL is taken from the liquidity of the coin and does not require the user to pay this as an
            additional amount.
          </p>

          <p>
            Note that none of the ApeOrDie.fun frontend services charge any fees in addition to those above. If you
            access the platform or smart contracts via another interface or platform, you may incur additional fees
            charged by those interfaces or platforms.
          </p>
        </div>
      </div>
    </div>
  )
}

