import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'

const UploadProduct = ({
    onClose,
    fetchData
}) => {
  const [data,setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })
  const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
  const [fullScreenImage,setFullScreenImage] = useState("")


  const handleOnChange = (e)=>{
      const { name, value} = e.target

      setData((preve)=>{
        return{
          ...preve,
          [name]  : value
        }
      })
  }

  const handleUploadProduct = async(e) => {
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [ ...preve.productImage, uploadImageCloudinary.url]
      }
    })
  }

  const handleDeleteProductImage = async(index)=>{
    const newProductImage = data.productImage.filter((_,i)=>i !== index)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage]
      }
    })
  }


  {/**upload product */}
  const handleSubmit = async(e) =>{
    e.preventDefault();

    try {
      const priceNumeric = parseFloat(data.price);
      const sellingPriceNumeric = parseFloat(data.sellingPrice);

      // Validate that sellingPrice is less than price
      if (sellingPriceNumeric >= priceNumeric) {
        toast.error("Giá bán phải thấp hơn giá gốc");
        return;
      }

      if (data.productImage.length === 0) {
        toast.error("Vui lòng tải lên ít nhất một hình ảnh sản phẩm");
        return;
      }

      const response = await fetch(SummaryApi.uploadProduct.url, {
        method: SummaryApi.uploadProduct.method,
        credentials: 'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(data)
      });

      const dataResponse = await response.json();

      if (dataResponse.success) {
        toast.success(dataResponse.message);
        onClose();
        fetchData();
      } else {
        toast.error(dataResponse.message || "Không thể tải lên sản phẩm");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error("Đã xảy ra lỗi khi tải lên sản phẩm");
    }
  }

  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-slate-300 bg-opacity-50 z-40 h-full overflow-auto'>
        <div className='mx-auto p-4 w-full max-w-md bg-white mt-20 rounded-md'>

            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold'>Thêm sản phẩm</h2>
                <span className='text-xl hover:text-primary-600 cursor-pointer' onClick={onClose}>
                    <CgClose/>
                </span>
            </div>

            <form className='mt-3 grid gap-2' onSubmit={handleSubmit}>
              <label htmlFor='productName'>Tên sản phẩm :</label>
              <input
                type='text'
                id='productName'
                placeholder='Nhập tên sản phẩm'
                value={data.productName}
                name='productName'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />

              <label htmlFor='brandName'>Tên thương hiệu :</label>
              <input
                type='text'
                id='brandName'
                placeholder='Nhập tên thương hiệu'
                value={data.brandName}
                name='brandName'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />

              <label htmlFor='category'>Danh mục :</label>
              <select
                id='category'
                value={data.category}
                name='category'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              >
                <option>Chọn danh mục</option>
                  {
                    productCategory.map(product => {
                      return(
                        <option key={product.value} value={product.value}>{product.label}</option>
                      )
                    })
                  }
              </select>

              {/**Uplad image */}
              <label htmlFor='uploadImageInput'>
              <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                        <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                          <span className='text-4xl'><FaCloudUploadAlt/></span>
                          <p className='text-sm'>Tải ảnh sản phẩm</p>
                          <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>
                        </div>
              </div>
              </label>
              <div>
                  {
                    data?.productImage[0] ? (
                        <div className='flex items-center gap-2 flex-wrap'>
                            {
                              data.productImage.map((el,index)=>{
                                return(
                                  <div key={index} className='relative group'>
                                      <img
                                        src={el}
                                        alt={el}
                                        width={80}
                                        height={80}
                                        className='bg-slate-100 border cursor-pointer object-contain'
                                        onClick={()=>{
                                          setOpenFullScreenImage(true)
                                          setFullScreenImage(el)
                                        }}/>

                                        <div className='absolute bottom-0 right-0 p-1 text-white bg-primary-600 rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                          <MdDelete/>
                                        </div>
                                  </div>

                                )
                              })
                            }
                        </div>
                    ) : (
                      <p className='text-primary-600 text-xs'>*Vui lòng tải lên ảnh sản phẩm</p>
                    )
                  }

              </div>

              <label htmlFor='price' className='mt-3'>Giá gốc :</label>
              <input
                type='number'
                id='price'
                placeholder='Nhập giá gốc'
                value={data.price}
                name='price'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />


              <label htmlFor='sellingPrice'>Giá bán :</label>
              <input
                type='number'
                id='sellingPrice'
                placeholder='Nhập giá bán'
                value={data.sellingPrice}
                name='sellingPrice'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded'
                required
              />

              <label htmlFor='description'>Mô tả :</label>
              <textarea
                rows={5}
                id='description'
                placeholder='Nhập mô tả sản phẩm'
                value={data.description}
                name='description'
                onChange={handleOnChange}
                className='p-2 bg-slate-100 border rounded resize-none'
                required
              />

              <button type='submit' className='px-3 py-1 bg-primary-600 text-white font-medium mt-2 rounded-full hover:bg-primary-700'>Thêm sản phẩm</button>

            </form>
        </div>

        {/**full screen image */}
        {
          openFullScreenImage && (
            <DisplayImage imgUrl={fullScreenImage} onClose={() => setOpenFullScreenImage(false)}/>
          )
        }


    </div>
  )
}

export default UploadProduct