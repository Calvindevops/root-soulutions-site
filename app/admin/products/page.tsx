"use client";

import { products } from "@/lib/products";
import StatusBadge from "@/components/admin/StatusBadge";
import Image from "next/image";

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <button className="bg-[#2D5A27] text-white rounded-lg px-4 py-2 font-semibold hover:bg-opacity-90 transition">
          Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Image</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition even:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div 
                    className="w-12 h-12 rounded-lg flex items-center justify-center relative overflow-hidden"
                    style={{ background: `linear-gradient(to bottom, ${product.gradient_from}, ${product.gradient_to})` }}
                  >
                    {product.images?.[0] && (
                      <Image 
                        src={product.images[0]} 
                        alt={product.title} 
                        fill 
                        className="object-contain p-1" 
                      />
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-semibold text-gray-900">{product.title}</div>
                  <div className="text-sm text-gray-500">{product.subtitle}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="bg-gray-100 text-gray-600 rounded-full px-3 py-1 text-xs font-semibold uppercase">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={product.available ? "active" : "inactive"} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button className="text-[#2D5A27] hover:underline font-semibold">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
