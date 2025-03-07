
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

interface StoreItem {
  id: string;
  title: string;
  amount: number;
  price: string;
  image: string;
  type: 'gems' | 'gold';
}

const StoreItems = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'gems' | 'gold'>('gems');

  const storeItems: StoreItem[] = [
    { id: 'gem1', title: 'FISTFUL OF GEMS', amount: 100, price: '$0.99', image: '💎', type: 'gems' },
    { id: 'gem2', title: 'BUNCH OF GEMS', amount: 500, price: '$4.99', image: '💎', type: 'gems' },
    { id: 'gem3', title: 'PILE OF GEMS', amount: 1200, price: '$9.99', image: '💎', type: 'gems' },
    { id: 'gem4', title: 'BAG OF GEMS', amount: 2600, price: '$19.99', image: '💎', type: 'gems' },
    { id: 'gem5', title: 'CASE OF GEMS', amount: 7000, price: '$49.99', image: '💎', type: 'gems' },
    { id: 'gem6', title: 'TRUNK OF GEMS', amount: 15000, price: '$99.99', image: '💎', type: 'gems' },
    { id: 'gold1', title: 'POUCH OF GOLD', amount: 1000, price: '$0.99', image: '🪙', type: 'gold' },
    { id: 'gold2', title: 'BAG OF GOLD', amount: 5000, price: '$4.99', image: '🪙', type: 'gold' },
    { id: 'gold3', title: 'CHEST OF GOLD', amount: 12000, price: '$9.99', image: '🪙', type: 'gold' },
    { id: 'gold4', title: 'VAULT OF GOLD', amount: 25000, price: '$19.99', image: '🪙', type: 'gold' },
    { id: 'gold5', title: 'FORTUNE OF GOLD', amount: 75000, price: '$49.99', image: '🪙', type: 'gold' },
    { id: 'gold6', title: 'DRAGON HOARD', amount: 200000, price: '$99.99', image: '🪙', type: 'gold' },
  ];

  const filteredItems = storeItems.filter(item => item.type === activeTab);

  const handleBuy = (id: string) => {
    setSelectedItem(id);
    setTimeout(() => {
      setSelectedItem(null);
      // Here you would process the purchase
      console.log(`Purchased item ${id}`);
    }, 1000);
  };

  return (
    <div className="mt-8">
      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="relative flex rounded-xl overflow-hidden">
          <motion.div 
            className="absolute h-full bg-blue-600/30 rounded-xl" 
            initial={false}
            animate={{ 
              x: activeTab === 'gems' ? 0 : '100%', 
              width: '50%' 
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          />
          <button 
            className={`relative px-8 py-3 text-lg font-bold ${activeTab === 'gems' ? 'text-cyan-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('gems')}
          >
            GEMS
          </button>
          <button 
            className={`relative px-8 py-3 text-lg font-bold ${activeTab === 'gold' ? 'text-yellow-300' : 'text-gray-400'}`}
            onClick={() => setActiveTab('gold')}
          >
            GOLD
          </button>
        </div>
      </div>

      {/* Store Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {filteredItems.map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.03 }}
            className={`group relative overflow-hidden rounded-xl backdrop-blur-sm border border-blue-500/30 bg-blue-900/10 p-6 transition-all duration-300`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Glow effect on hover */}
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-300" />
            
            <div className="relative flex flex-col items-center">
              <motion.div
                className={`w-24 h-24 mb-4 flex items-center justify-center text-4xl`}
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, 0, -5, 0],
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 4,
                  ease: "easeInOut"
                }}
              >
                {item.image}
              </motion.div>
              
              <h3 className={`text-lg font-bold mb-1 text-center ${item.type === 'gems' ? 'text-cyan-300' : 'text-yellow-300'}`}>
                {item.title}
              </h3>
              
              <p className="text-3xl font-bold mb-4 text-white">
                {item.amount.toLocaleString()}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-lg font-bold text-white ${
                  selectedItem === item.id 
                    ? 'bg-green-500' 
                    : `bg-gradient-to-r ${item.type === 'gems' ? 'from-blue-500 to-purple-600' : 'from-yellow-500 to-amber-600'}`
                } shadow-lg`}
                onClick={() => handleBuy(item.id)}
                disabled={selectedItem !== null}
              >
                {selectedItem === item.id ? 'PROCESSING...' : item.price}
              </motion.button>
              
              <div className="absolute top-2 right-2">
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 90 }}
                  className="p-1 rounded-full bg-blue-500/20 text-blue-300"
                >
                  <Plus size={16} />
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StoreItems;
