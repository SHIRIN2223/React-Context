import { createContext, useState } from "react";



//!Context yapısının temelini oluşturma
 export const BasketContext = createContext();

 //! Sağlayıcı ve onun tuttuğu verileri tanımlama
 export function BasketProvider({ children }) {
    const [basket, setBasket] = useState([]);

   // sepete ekleme funksiyonları
   const addToBasket = (product) => {
    // sepette bu üründen daha önce eklenemiş mi kontrol et
    const found = basket.find((i) => i.id === product.id);

    if (found) {
        // olan ürünün miktarını arttır
      const updated = {...found, amount: found.amount + 1};   

      //dizideki ürünü güncelle
      const newBasket = basket.map((i) =>
       i.id === updated.id ? updated : i
      );

      //state'i günceller
      setBasket(newBasket);
    } else {
        //sepete ürünü ekle
     setBasket(basket.concat({...product, amount: 1 }));
    }

   };

   //sepetten ürün kaldırır
   const removeFromBasket = (delete_id) => {
    //kaldılıcak ürünü bul
    const found = basket.find((i) => i.id === delete_id)

    if(found.amount > 1) {
    // miktarı 1 azalt

     // olan ürünün miktarını arttır
     const updated = {...found, amount: found.amount - 1 };   

     //dizideki ürünü güncelle
     const newBasket = basket.map((i) =>
      i.id === updated.id ? updated : i
     );

     //state'i günceller
     setBasket(newBasket);
    } else {

        // ürünü sepetden cıkar
        const filtred = basket.filter((i) => i.id !== delete_id);

        setBasket(filtred);
    }
   };

   //tuttuğumuz  verileri uygulamayı akatar

   return (
    <BasketContext.Provider
      value={{
      basket, 
      addToBasket,
       removeFromBasket,
        }}>

     {children}
    </BasketContext.Provider> 
   )
 }