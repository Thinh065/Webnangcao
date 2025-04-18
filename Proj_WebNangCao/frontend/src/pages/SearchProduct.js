import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SummaryApi from '../common'
import ProductList from '../components/ProductList'

const SearchProduct = () => {
    const [searchParams] = useSearchParams()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)
    const searchQuery = searchParams.get("q") || ""

    const fetchData = useCallback(async() => {
        setLoading(true)
        if (!searchQuery.trim()) {
            setData([])
            setLoading(false)
            return
        }

        try {
            console.log(`Đang tìm kiếm với từ khóa: "${searchQuery}"`)
            const response = await fetch(`${SummaryApi.searchProduct.url}?search=${searchQuery}`,{
                method : SummaryApi.searchProduct.method,
                headers : {
                    "content-type" : "application/json"
                }
            })

            const responseData = await response.json()
            console.log('Kết quả tìm kiếm:', responseData)

            if(responseData.success){
                setData(responseData.data)
            } else {
                console.error('Lỗi tìm kiếm:', responseData.message)
                setData([])
            }
        } catch (error) {
            console.error('Lỗi khi tìm kiếm:', error)
            setData([])
        } finally {
            setLoading(false)
        }
    }, [searchQuery])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className='container mx-auto px-4'>
            <h2 className='text-2xl font-semibold py-4'>
                {searchQuery
                    ? `Kết quả tìm kiếm cho "${searchQuery}"`
                    : "Vui lòng nhập từ khóa để tìm kiếm"}
            </h2>
            {searchQuery ? (
                <ProductList loading={loading} data={data} />
            ) : (
                <div className="text-center py-8 text-gray-500">
                    Hãy nhập từ khóa vào ô tìm kiếm để xem sản phẩm
                </div>
            )}
        </div>
    )
}

export default SearchProduct