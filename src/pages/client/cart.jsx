import React,{useState,useEffect} from 'react'
import Header from '../../components/header'
import Footer from '../../components/footer'
import PlaceOrder from '../../components/placeOrder'
import UserOrders from '../../components/userOrders'
import axios from 'axios';

const Cart = (props) => {
  const [itemsList, setItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  
  useEffect(() => {
    axios
      .get('http://localhost:3001/api/cartItems/all')
      .then(response => {
        setItems(response.data);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, []);

  function deleteItem(id) {
    axios.delete(`http://localhost:3001/api/cartItems/${id}`)
      .then(response => {
        setItems(prevItems => prevItems.filter(item => item._id !== id));
      })
      .catch(error => {
        console.error('Error deleting message:', error);
      });
  }

  const calculateTotalPrice = () => {
    const total = itemsList.reduce((accumulator, currentItem) => {
      return accumulator + currentItem.count * currentItem.price;
    }, 0);
    setTotalPrice(total);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [itemsList]);

  return (
    <div>
      <Header />
      <div id="cart">
          <div class="row">
              <div class="list">
                <div>
                    <p className='contactSubheadings'>Products</p>
                </div>
                {itemsList.map((productItem) => {
                  return (
                      <UserOrders 
                          key={productItem._id}
                          id={productItem._id}
                          item={productItem.item} 
                          price={productItem.price}
                          count={productItem.count}
                          onDelete={deleteItem}
                      />
                  );
                })}
              </div>
              <div className='form'>
                  <div class="totalprice">
                    <p>Total Price</p>
                    <h1>Rs. {totalPrice}</h1>
                  </div>
                  <PlaceOrder totalPrice={totalPrice}/>
              </div>
            </div>
        </div>
      <Footer />
    </div>
  )
}

export default Cart


  // function editCount() {
  //     setProduct(order => {
  //         return ;
  //     })
  // }

  // function deleteProduct(id) {
  //     setProduct(order => {
  //         return order.filter((productItem, index) => {
  //             return index !== id;
  //         })
  //     });
  // }