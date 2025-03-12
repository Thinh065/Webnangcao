(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/_036791._.js", {

"[project]/lib/api.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "getLaptopById": (()=>getLaptopById),
    "getLaptops": (()=>getLaptops)
});
const laptopsData = [
    {
        id: "1",
        name: 'MacBook Pro 16"',
        price: 2499,
        shortDescription: "Apple M2 Pro, 16GB RAM, 512GB SSD",
        description: "The most powerful MacBook Pro ever is here. With the blazing-fast M2 Pro chip — the first of its kind — you get groundbreaking performance and amazing battery life.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3",
        images: [
            "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=2626&auto=format&fit=crop&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3"
        ],
        specs: [
            {
                name: "Processor",
                value: "Apple M2 Pro"
            },
            {
                name: "RAM",
                value: "16GB"
            },
            {
                name: "Storage",
                value: "512GB SSD"
            },
            {
                name: "Display",
                value: "16-inch Liquid Retina XDR"
            },
            {
                name: "Graphics",
                value: "16-core GPU"
            },
            {
                name: "Battery",
                value: "Up to 22 hours"
            }
        ]
    },
    {
        id: "2",
        name: "Dell XPS 15",
        price: 1899,
        shortDescription: "Intel Core i7, 16GB RAM, 1TB SSD, RTX 3050 Ti",
        description: "The Dell XPS 15 combines powerful performance with a stunning display. Perfect for creative professionals and power users who need reliability and performance.",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3",
        images: [
            "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&flip=horizontal"
        ],
        specs: [
            {
                name: "Processor",
                value: "Intel Core i7-12700H"
            },
            {
                name: "RAM",
                value: "16GB DDR5"
            },
            {
                name: "Storage",
                value: "1TB NVMe SSD"
            },
            {
                name: "Display",
                value: "15.6-inch 3.5K OLED"
            },
            {
                name: "Graphics",
                value: "NVIDIA RTX 3050 Ti"
            },
            {
                name: "Battery",
                value: "Up to 13 hours"
            }
        ]
    },
    {
        id: "3",
        name: "Lenovo ThinkPad X1 Carbon",
        price: 1599,
        shortDescription: "Intel Core i5, 16GB RAM, 512GB SSD",
        description: "The ThinkPad X1 Carbon is a premium business laptop that offers excellent performance, a great keyboard, and impressive battery life in a lightweight package.",
        image: "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
        images: [
            "https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1630794180018-433d915c34ac?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1630794180018-433d915c34ac?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&flip=horizontal"
        ],
        specs: [
            {
                name: "Processor",
                value: "Intel Core i5-1240P"
            },
            {
                name: "RAM",
                value: "16GB LPDDR5"
            },
            {
                name: "Storage",
                value: "512GB PCIe SSD"
            },
            {
                name: "Display",
                value: "14-inch 2.2K IPS"
            },
            {
                name: "Graphics",
                value: "Intel Iris Xe"
            },
            {
                name: "Battery",
                value: "Up to 15 hours"
            }
        ]
    },
    {
        id: "4",
        name: "HP Spectre x360",
        price: 1399,
        shortDescription: "Intel Core i7, 16GB RAM, 1TB SSD, 2-in-1 Convertible",
        description: "The HP Spectre x360 is a premium 2-in-1 laptop with a sleek design, powerful performance, and versatile functionality that adapts to your needs.",
        image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
        images: [
            "https://images.unsplash.com/photo-1544731612-de7f96afe55f?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&flip=horizontal"
        ],
        specs: [
            {
                name: "Processor",
                value: "Intel Core i7-1260P"
            },
            {
                name: "RAM",
                value: "16GB DDR4"
            },
            {
                name: "Storage",
                value: "1TB NVMe SSD"
            },
            {
                name: "Display",
                value: "13.5-inch 3K2K OLED Touch"
            },
            {
                name: "Graphics",
                value: "Intel Iris Xe"
            },
            {
                name: "Battery",
                value: "Up to 16 hours"
            }
        ]
    },
    {
        id: "5",
        name: "ASUS ROG Zephyrus G14",
        price: 1799,
        shortDescription: "AMD Ryzen 9, 32GB RAM, 1TB SSD, RTX 4060",
        description: "The ASUS ROG Zephyrus G14 is a powerful gaming laptop that packs incredible performance into a compact and portable design without compromising on features.",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3",
        images: [
            "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=2668&auto=format&fit=crop&ixlib=rb-4.0.3&flip=horizontal",
            "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3"
        ],
        specs: [
            {
                name: "Processor",
                value: "AMD Ryzen 9 7940HS"
            },
            {
                name: "RAM",
                value: "32GB DDR5"
            },
            {
                name: "Storage",
                value: "1TB PCIe 4.0 SSD"
            },
            {
                name: "Display",
                value: "14-inch QHD 165Hz"
            },
            {
                name: "Graphics",
                value: "NVIDIA RTX 4060 8GB"
            },
            {
                name: "Battery",
                value: "Up to 10 hours"
            }
        ]
    },
    {
        id: "6",
        name: "Microsoft Surface Laptop 5",
        price: 1299,
        shortDescription: "Intel Core i5, 8GB RAM, 512GB SSD",
        description: "The Microsoft Surface Laptop 5 offers the perfect combination of style, performance, and portability with its sleek design and all-day battery life.",
        image: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
        images: [
            "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop&ixlib=rb-4.0.3",
            "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&flip=horizontal"
        ],
        specs: [
            {
                name: "Processor",
                value: "Intel Core i5-1235U"
            },
            {
                name: "RAM",
                value: "8GB LPDDR5X"
            },
            {
                name: "Storage",
                value: "512GB SSD"
            },
            {
                name: "Display",
                value: "13.5-inch PixelSense Touch"
            },
            {
                name: "Graphics",
                value: "Intel Iris Xe"
            },
            {
                name: "Battery",
                value: "Up to 18 hours"
            }
        ]
    }
];
// Simulate API calls with a delay
const simulateDelay = (ms = 500)=>new Promise((resolve)=>setTimeout(resolve, ms));
const getLaptops = async ()=>{
    try {
        // In a real app, this would be an API call
        // const response = await axios.get('/api/laptops');
        // return response.data;
        await simulateDelay();
        return laptopsData;
    } catch (error) {
        console.error("Error fetching laptops:", error);
        throw error;
    }
};
const getLaptopById = async (id)=>{
    try {
        // In a real app, this would be an API call
        // const response = await axios.get(`/api/laptops/${id}`);
        // return response.data;
        await simulateDelay();
        const laptop = laptopsData.find((laptop)=>laptop.id === id);
        if (!laptop) {
            throw new Error("Laptop not found");
        }
        return laptop;
    } catch (error) {
        console.error(`Error fetching laptop with ID ${id}:`, error);
        throw error;
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/product/[id]/page.js [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, k: __turbopack_refresh__, m: module, z: __turbopack_require_stub__ } = __turbopack_context__;
{
__turbopack_esm__({
    "default": (()=>ProductDetail)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/node_modules/swiper/swiper-react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_import__("[project]/node_modules/swiper/modules/index.mjs [app-client] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/hooks/use-cart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$translation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/hooks/use-translation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_import__("[project]/lib/api.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/arrow-left.js [app-client] (ecmascript) <export default as ArrowLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$navigation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__ = __turbopack_import__("[project]/node_modules/swiper/modules/navigation.mjs [app-client] (ecmascript) <export default as Navigation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$pagination$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pagination$3e$__ = __turbopack_import__("[project]/node_modules/swiper/modules/pagination.mjs [app-client] (ecmascript) <export default as Pagination>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__ = __turbopack_import__("[project]/node_modules/lucide-react/dist/esm/icons/shopping-cart.js [app-client] (ecmascript) <export default as ShoppingCart>");
;
var _s = __turbopack_refresh__.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
function ProductDetail() {
    _s();
    const { id } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const { t } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$translation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"])();
    const { addToCart } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"])();
    const [laptop, setLaptop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ProductDetail.useEffect": ()=>{
            const fetchLaptop = {
                "ProductDetail.useEffect.fetchLaptop": async ()=>{
                    try {
                        setLoading(true);
                        const data = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getLaptopById"])(id);
                        setLaptop(data);
                    } catch (err) {
                        setError(err.message);
                    } finally{
                        setLoading(false);
                    }
                }
            }["ProductDetail.useEffect.fetchLaptop"];
            if (id) {
                fetchLaptop();
            }
        }
    }["ProductDetail.useEffect"], [
        id
    ]);
    if (loading) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto p-4 text-center",
        children: t("loading")
    }, void 0, false, {
        fileName: "[project]/app/product/[id]/page.js",
        lineNumber: 45,
        columnNumber: 23
    }, this);
    if (error) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto p-4 text-center",
        children: [
            t("error"),
            ": ",
            error
        ]
    }, void 0, true, {
        fileName: "[project]/app/product/[id]/page.js",
        lineNumber: 48,
        columnNumber: 7
    }, this);
    if (!laptop) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto p-4 text-center",
        children: t("productNotFound")
    }, void 0, false, {
        fileName: "[project]/app/product/[id]/page.js",
        lineNumber: 52,
        columnNumber: 23
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "container mx-auto p-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "ghost",
                className: "mb-4",
                onClick: ()=>router.back(),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowLeft$3e$__["ArrowLeft"], {
                        className: "mr-2 h-4 w-4"
                    }, void 0, false, {
                        fileName: "[project]/app/product/[id]/page.js",
                        lineNumber: 57,
                        columnNumber: 9
                    }, this),
                    t("backToProducts")
                ]
            }, void 0, true, {
                fileName: "[project]/app/product/[id]/page.js",
                lineNumber: 56,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-1 md:grid-cols-2 gap-8",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Swiper"], {
                            modules: [
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$navigation$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Navigation$3e$__["Navigation"],
                                __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$modules$2f$pagination$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pagination$3e$__["Pagination"]
                            ],
                            navigation: true,
                            pagination: {
                                clickable: true
                            },
                            className: "rounded-lg overflow-hidden",
                            children: laptop.images?.map((image, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$swiper$2f$swiper$2d$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SwiperSlide"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "aspect-video",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: image || "/placeholder.svg",
                                            alt: `${laptop.name} - Image ${index + 1}`,
                                            className: "w-full h-full object-cover"
                                        }, void 0, false, {
                                            fileName: "[project]/app/product/[id]/page.js",
                                            lineNumber: 72,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/app/product/[id]/page.js",
                                        lineNumber: 71,
                                        columnNumber: 17
                                    }, this)
                                }, index, false, {
                                    fileName: "[project]/app/product/[id]/page.js",
                                    lineNumber: 70,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/app/product/[id]/page.js",
                            lineNumber: 63,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/product/[id]/page.js",
                        lineNumber: 62,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-3xl font-bold mb-2",
                                children: laptop.name
                            }, void 0, false, {
                                fileName: "[project]/app/product/[id]/page.js",
                                lineNumber: 84,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-2xl font-bold text-primary mb-4",
                                children: [
                                    "$",
                                    laptop.price.toLocaleString()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/product/[id]/page.js",
                                lineNumber: 85,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold mb-2",
                                        children: t("specifications")
                                    }, void 0, false, {
                                        fileName: "[project]/app/product/[id]/page.js",
                                        lineNumber: 88,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                        className: "space-y-2",
                                        children: laptop.specs?.map((spec, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                className: "flex",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium min-w-32",
                                                        children: [
                                                            spec.name,
                                                            ":"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/product/[id]/page.js",
                                                        lineNumber: 92,
                                                        columnNumber: 19
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: spec.value
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/product/[id]/page.js",
                                                        lineNumber: 93,
                                                        columnNumber: 19
                                                    }, this)
                                                ]
                                            }, index, true, {
                                                fileName: "[project]/app/product/[id]/page.js",
                                                lineNumber: 91,
                                                columnNumber: 17
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/app/product/[id]/page.js",
                                        lineNumber: 89,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/product/[id]/page.js",
                                lineNumber: 87,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-6",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-xl font-semibold mb-2",
                                        children: t("description")
                                    }, void 0, false, {
                                        fileName: "[project]/app/product/[id]/page.js",
                                        lineNumber: 100,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-muted-foreground",
                                        children: laptop.description
                                    }, void 0, false, {
                                        fileName: "[project]/app/product/[id]/page.js",
                                        lineNumber: 101,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/product/[id]/page.js",
                                lineNumber: 99,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "lg",
                                className: "w-full",
                                onClick: ()=>addToCart(laptop),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingCart$3e$__["ShoppingCart"], {
                                        className: "mr-2 h-5 w-5"
                                    }, void 0, false, {
                                        fileName: "[project]/app/product/[id]/page.js",
                                        lineNumber: 105,
                                        columnNumber: 13
                                    }, this),
                                    t("addToCart")
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/product/[id]/page.js",
                                lineNumber: 104,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/product/[id]/page.js",
                        lineNumber: 83,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/product/[id]/page.js",
                lineNumber: 61,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/product/[id]/page.js",
        lineNumber: 55,
        columnNumber: 5
    }, this);
}
_s(ProductDetail, "eHhm8dmkkz1lAjiJqNAPB1L7Psg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$translation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useTranslation"],
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$cart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCart"]
    ];
});
_c = ProductDetail;
var _c;
__turbopack_refresh__.register(_c, "ProductDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_refresh__.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/app/product/[id]/page.js [app-rsc] (ecmascript, Next.js server component, client modules)": ((__turbopack_context__) => {

var { r: __turbopack_require__, f: __turbopack_module_context__, i: __turbopack_import__, s: __turbopack_esm__, v: __turbopack_export_value__, n: __turbopack_export_namespace__, c: __turbopack_cache__, M: __turbopack_modules__, l: __turbopack_load__, j: __turbopack_dynamic__, P: __turbopack_resolve_absolute_path__, U: __turbopack_relative_url__, R: __turbopack_resolve_module_id_path__, b: __turbopack_worker_blob_url__, g: global, __dirname, t: __turbopack_require_real__ } = __turbopack_context__;
{
}}),
}]);

//# sourceMappingURL=_036791._.js.map