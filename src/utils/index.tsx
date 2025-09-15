import React from "react";
import type { ReactNode } from "react";
import { Empty, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export const Loading = () => {
    return  <div className="w-full h-screen flex items-center justify-center">
         <Spin indicator={<LoadingOutlined spin />} size="large" />
    </div>
}

export const MiniLoading = () => {
    return  <div className="w-full flex justify-center py-4">
         <Spin indicator={<LoadingOutlined spin />} size="default" />
    </div>
}

export const Suspense = ({children}:{children: ReactNode}) => {
    return <React.Suspense fallback={<Loading/>}>{children}</React.Suspense>
}

export const CustomEmpty = ({title="Ma'lumotlar topilmadi"}:{title?:string }) => {
    return <Empty description={title} image={Empty.PRESENTED_IMAGE_SIMPLE} />
}