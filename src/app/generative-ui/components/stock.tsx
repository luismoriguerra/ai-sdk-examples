type StockProps = {
    price: number;
    symbol: string;
  };
  
  export const Stock = ({ price, symbol }: StockProps) => {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-sm">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Stock Information</h2>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Symbol:</span>
            <span className="font-medium text-gray-800">{symbol}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Price:</span>
            <span className="font-medium text-gray-800">
              ${price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>
    );
  };