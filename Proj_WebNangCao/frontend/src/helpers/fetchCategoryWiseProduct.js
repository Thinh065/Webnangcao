const { default: SummaryApi } = require("../common")

const fetchCategoryWiseProduct = async(category)=>{
    try {
        const response = await fetch(SummaryApi.categoryWiseProduct.url, {
            method: SummaryApi.categoryWiseProduct.method,
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                category: category
            })
        });

        if (!response.ok) {
            console.error(`Error fetching category products: ${response.status} ${response.statusText}`);
            return { success: false, data: [], error: true, message: "Failed to fetch products" };
        }

        const dataResponse = await response.json();
        return dataResponse;
    } catch (error) {
        console.error("Error in fetchCategoryWiseProduct:", error);
        return { success: false, data: [], error: true, message: error.message || "Network error" };
    }
}

export default fetchCategoryWiseProduct