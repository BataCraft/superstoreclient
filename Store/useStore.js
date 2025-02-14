import toast from 'react-hot-toast';
import { create } from 'zustand';

const useStore = create((set) => ({
  data: { products: [] },
  loading: false,
  error: null,


  fetchData: async (url) => {
    set({ loading: true });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/get-product`);
      if(!response.ok){
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      // console.log('Fetched Data:', data); // Debug log
      set({ data, loading: false });

    } catch (error) {
      console.error('Fetch Error:', error);
      set({ error: error.message, loading: false });
    }
  },

  getProductById : async (id) =>{
    set({ loading: true });
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/product/get-product/${id}`);
      if(!response.ok)
      { 
        throw new Error('Failed to fetch data');

      };

      const data = await response.json();
      // console.log('Fetched Data:', data); 
      set({
       product :  data.product, loading: false
      })
      
    } catch (error) {
      /* The line `// console.log('Fetched Data:', data);` is a commented-out debug log statement in
      the JavaScript code. It is used to log the fetched data to the console for debugging purposes.
      When this line is uncommented (by removing the `//`), it will output the fetched data along
      with the message 'Fetched Data:' to the console, providing visibility into the data that has
      been retrieved from the API during the fetch operation. This can be helpful for developers to
      inspect the structure and content of the data being received from the server. */
      toast.error(error.message);
      set({ loading: false, error: error.message });
      
    }
  }
}));

export default useStore;