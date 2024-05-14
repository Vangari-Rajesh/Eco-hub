import { MarketNavBar } from "../MarketComponents/MarketNavBar"
import { ProductCards } from "../MarketComponents/ProductCards"
import React, { useState } from 'react';
function MarketHomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  return (
    
    <div>
        <MarketNavBar setSearchQuery={setSearchQuery}/>
        <ProductCards searchQuery={searchQuery} />
    </div>
  )
}

export default MarketHomePage
