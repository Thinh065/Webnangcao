const laptopsData = [
  {
    id: "1",
    name: 'MacBook Pro 16"',
    price: 2499,
    shortDescription: "Apple M2 Pro, 16GB RAM, 512GB SSD",
    description:
      "The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro chip — the first of its kind — you get groundbreaking performance and amazing battery life.",
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
    specs: [
      { name: "Processor", value: "Apple M2 Pro" },
      { name: "RAM", value: "16GB" },
      { name: "Storage", value: "512GB SSD" },
      { name: "Display", value: "16-inch Liquid Retina XDR" },
      { name: "Graphics", value: "16-core GPU" },
      { name: "Battery", value: "Up to 22 hours" },
    ],
  },
  {
    id: "2",
    name: "Dell XPS 15",
    price: 1899,
    shortDescription: "Intel Core i7, 16GB RAM, 1TB SSD, RTX 3050 Ti",
    description:
      "The Dell XPS 15 combines powerful performance with a stunning display. Perfect for creative professionals and power users who need reliability and performance.",
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&flip=horizontal",
    ],
    specs: [
      { name: "Processor", value: "Intel Core i7-12700H" },
      { name: "RAM", value: "16GB DDR5" },
      { name: "Storage", value: "1TB NVMe SSD" },
      { name: "Display", value: "15.6-inch 3.5K OLED" },
      { name: "Graphics", value: "NVIDIA RTX 3050 Ti" },
      { name: "Battery", value: "Up to 13 hours" },
    ],
  },
  {
    id: "3",
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1599,
    shortDescription: "Intel Core i5, 16GB RAM, 512GB SSD",
    description:
      "The ThinkPad X1 Carbon is a premium business laptop that offers excellent performance, a great keyboard, and impressive battery life in a lightweight package.",
    image:
      "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1630794180018-433d915c34ac?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1630794180018-433d915c34ac?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&flip=horizontal",
    ],
    specs: [
      { name: "Processor", value: "Intel Core i5-1240P" },
      { name: "RAM", value: "16GB LPDDR5" },
      { name: "Storage", value: "512GB PCIe SSD" },
      { name: "Display", value: "14-inch 2.2K IPS" },
      { name: "Graphics", value: "Intel Iris Xe" },
      { name: "Battery", value: "Up to 15 hours" },
    ],
  },
  {
    id: "4",
    name: "HP Spectre x360",
    price: 1399,
    shortDescription: "Intel Core i7, 16GB RAM, 1TB SSD, 2-in-1 Convertible",
    description:
      "The HP Spectre x360 is a premium 2-in-1 laptop with a sleek design, powerful performance, and versatile functionality that adapts to your needs.",
    image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&flip=horizontal",
    ],
    specs: [
      { name: "Processor", value: "Intel Core i7-1260P" },
      { name: "RAM", value: "16GB DDR4" },
      { name: "Storage", value: "1TB NVMe SSD" },
      { name: "Display", value: "13.5-inch 3K2K OLED Touch" },
      { name: "Graphics", value: "Intel Iris Xe" },
      { name: "Battery", value: "Up to 16 hours" },
    ],
  },
  {
    id: "5",
    name: "ASUS ROG Zephyrus G14",
    price: 1799,
    shortDescription: "AMD Ryzen 9, 32GB RAM, 1TB SSD, RTX 4060",
    description:
      "The ASUS ROG Zephyrus G14 is a powerful gaming laptop that packs incredible performance into a compact and portable design without compromising on features.",
    image:
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3&flip=horizontal",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3",
    ],
    specs: [
      { name: "Processor", value: "AMD Ryzen 9 7940HS" },
      { name: "RAM", value: "32GB DDR5" },
      { name: "Storage", value: "1TB PCIe 4.0 SSD" },
      { name: "Display", value: "14-inch QHD 165Hz" },
      { name: "Graphics", value: "NVIDIA RTX 4060 8GB" },
      { name: "Battery", value: "Up to 10 hours" },
    ],
  },
  {
    id: "6",
    name: "Microsoft Surface Laptop 5",
    price: 1299,
    shortDescription: "Intel Core i5, 8GB RAM, 512GB SSD",
    description:
      "The Microsoft Surface Laptop 5 offers the perfect combination of style, performance, and portability with its sleek design and all-day battery life.",
    image:
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
    images: [
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3",
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&flip=horizontal",
    ],
    specs: [
      { name: "Processor", value: "Intel Core i5-1235U" },
      { name: "RAM", value: "8GB LPDDR5X" },
      { name: "Storage", value: "512GB SSD" },
      { name: "Display", value: "13.5-inch PixelSense Touch" },
      { name: "Graphics", value: "Intel Iris Xe" },
      { name: "Battery", value: "Up to 18 hours" },
    ],
  },
]

// Simulate API calls with a delay
const simulateDelay = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms))

// Get all laptops
export const getLaptops = async () => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.get('/api/laptops');
    // return response.data;

    await simulateDelay()
    return laptopsData
  } catch (error) {
    console.error("Error fetching laptops:", error)
    throw error
  }
}

// Get a laptop by ID
export const getLaptopById = async (id) => {
  try {
    // In a real app, this would be an API call
    // const response = await axios.get(`/api/laptops/${id}`);
    // return response.data;

    await simulateDelay()
    const laptop = laptopsData.find((laptop) => laptop.id === id)

    if (!laptop) {
      throw new Error("Laptop not found")
    }

    return laptop
  } catch (error) {
    console.error(`Error fetching laptop with ID ${id}:`, error)
    throw error
  }
}