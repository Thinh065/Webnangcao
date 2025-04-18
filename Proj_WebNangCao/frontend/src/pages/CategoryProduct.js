import React, { useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCardProduct from '../components/VerticalCardProduct'

const CategoryProduct = () => {
    const [searchParams] = useSearchParams()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(true)

    const fetchData = useCallback(async() => {
        setLoading(true)
        const response = await fetch(SummaryApi.categoryWiseProduct.url,{
            method : SummaryApi.categoryWiseProduct.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                category : searchParams.get("category")
            })
        })

        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }
        setLoading(false)
    }, [searchParams])

    useEffect(() => {
        fetchData()
    }, [fetchData])

    return (
        <div className='container mx-auto px-4'>
            <h2 className='text-2xl font-semibold py-4'>Sản phẩm {searchParams.get("category")}</h2>
            <VerticalCardProduct loading={loading} data={data}/>
        </div>
    )
}

export default CategoryProduct