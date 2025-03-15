interface TokenData {
  marketCap: number
  price: number
  totalSupply: number
  bondingProgress: number
}

export function TokenInfo({ token }: { token: TokenData }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-2 text-white">Token Info</h3>
      <div>
        <h4 className="text-sm font-medium text-gray-400 mb-1">Bonding Curve Progress</h4>
        <div className="w-full bg-white rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full" style={{ width: `${token.bondingProgress}%` }}></div>
        </div>
        <p className="text-sm text-gray-400 mt-1">{token.bondingProgress}% Complete</p>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-400">Market Cap</p>
          <p className="font-semibold text-green-500">
            ${token.marketCap.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Price</p>
          <p className="font-semibold text-green-500">${token.price.toFixed(6)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-400">Total Supply</p>
          <p className="font-semibold text-green-500">{token.totalSupply.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
}

