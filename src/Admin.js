import { fetchAllPurchases, fetchAllUsers } from "./api";
import AdminUsers from "./AdminUsers";
import { useState, useEffect } from 'react'
import AdminProducts from "./AdminProducts";
import AdminPurchases from "./AdminPurchases";

export default function Admin({ products, setProducts }) {
  const [adminUsers, setAdminUsers] = useState([])
  const [allPurchases, setAllPurchases] = useState([])

  useEffect(() => {
    try {
      Promise.all([fetchAllUsers()]).then(([data]) => {
        setAdminUsers(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    try {
      Promise.all([fetchAllPurchases()]).then(([data]) => {
        setAllPurchases(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <AdminUsers adminUsers={adminUsers} setAdminUsers={setAdminUsers} />
      <AdminProducts products={products} setProducts={setProducts} />
      <div>
        <AdminPurchases style={{ width: '300px', height: '300px' }} allPurchases={allPurchases} />
      </div>
    </div>
  )
}
