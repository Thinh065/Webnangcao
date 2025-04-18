import React from 'react'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardProduct from '../components/HorizontalCardProduct'
import VerticalCardProduct from '../components/VerticalCardProduct'

const Home = () => {
  return (
    <div>
      <BannerProduct/>

      <HorizontalCardProduct category={"laptop"} heading={"Laptops Nổi Bật"}/>
      <VerticalCardProduct category={"laptop"} heading={"Laptop"}/>
      <HorizontalCardProduct category={"dienthoai"} heading={"Điện Thoại Bán Chạy"}/>
      <VerticalCardProduct category={"dienthoai"} heading={"Điện Thoại"}/>
    </div>
  )
}

export default Home