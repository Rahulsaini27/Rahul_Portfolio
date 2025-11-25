import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-64 w-full">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-100 border-b-[#10b981]"></div>
        </div>
    );
};

export default Loading;