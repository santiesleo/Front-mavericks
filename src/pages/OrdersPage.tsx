import { useFetchOrders } from '../hooks/useFetchOrders';
import OrderList from '../components/OrderList';
import '../styles/OrdersPageStyle.css';
import BackButton from '../components/BackButton';
import PageTitle from '../components/PageTitle';

const OrdersPage = () => {
  const { orders, loading, error, isAdmin } = useFetchOrders();

  if (loading) {
    return (
      <div className="orders-page-container">
        <div className="orders-loading">
          <p>Cargando órdenes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page-container">
        <div className="orders-error">
          <p>Error al cargar órdenes: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <PageTitle title="Lista de órdenes" />
      <div className="inline-block mt-8 ml-4 w-full bg-white">
        <BackButton to="/products" label="Volver a Productos" />
      </div>
      <div className="orders-page-container">
        <div className="orders-content">
          <div className="orders-card">
            <div className="orders-list">
              <OrderList orders={orders} isAdmin={isAdmin} /> {/* Pasamos isAdmin aquí */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
