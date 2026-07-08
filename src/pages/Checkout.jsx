import React from 'react';

export default function Checkout() {
    return (
        <div className="container mx-auto p-8">
            <h1 className="text-3xl font-bold mb-6">Buyurtmani rasmiylashtirish</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600 mb-4">Yetkazib berish manzili va to'lov usulini tanlang.</p>
                {/* To'lov formasi va Payme/Click integratsiyasi shu yerga tushadi */}
            </div>
        </div>
    );
}
