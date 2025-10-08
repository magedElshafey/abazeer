import { FaImage } from "react-icons/fa";

interface TableSkeletonProps {
  columns?: number;
  rows?: number;
  headers?: string[];
  hasImages?: boolean;
  imageColumns?: number[];
  actionColumns?: number[];
  className?: string;
}

const TableSkeleton: React.FC<TableSkeletonProps> = ({
  columns = 5,
  rows = 3,
  headers,
  hasImages = false,
  imageColumns = [0],
  actionColumns = [],
  className = "",
}) => {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse bg-white rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-50 border-b">
            {[...Array(columns)].map((_, index) => (
              <th key={index} className="text-left py-4 px-6 font-medium text-gray-700">
                {headers && headers[index] ? headers[index] : (
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {[...Array(rows)].map((_, rowIndex) => (
            <tr key={rowIndex} className="border-b animate-pulse">
              {[...Array(columns)].map((_, colIndex) => (
                <td key={colIndex} className="py-4 px-6">
                  {hasImages && imageColumns.includes(colIndex) ? (
                    // Image column
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <FaImage size={16} className="text-gray-400" />
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="h-4 w-48 bg-gray-200 rounded" />
                        <div className="h-3 w-32 bg-gray-200 rounded" />
                      </div>
                    </div>
                  ) : actionColumns.includes(colIndex) ? (
                    // Action column (buttons)
                    <div className="flex justify-center">
                      <div className="h-8 w-24 bg-orange-200 rounded-md" />
                    </div>
                  ) : colIndex === columns - 1 && actionColumns.length === 0 ? (
                    // Last column (assumed to be action/remove column)
                    <div className="flex justify-center">
                      <div className="p-2 bg-gray-200 rounded">
                        <div className="w-4 h-4 bg-gray-300 rounded" />
                      </div>
                    </div>
                  ) : (
                    // Regular text column
                    <div className="flex flex-col gap-1">
                      <div className="h-4 w-full bg-gray-200 rounded" />
                      {colIndex === 1 && (
                        <div className="h-3 w-3/4 bg-gray-200 rounded" />
                      )}
                    </div>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableSkeleton;
