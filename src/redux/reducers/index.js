import { combineReducers } from 'redux';

import reducerRegion from './reducer-region';
import reducerSubregion from './reducer-subregion';
import reducerDepartment from './reducer-department';
import reducerOffice from './reducer-office';
import reducerStore from './reducer-store';
import reducerUser from './reducer-user';

import reducerPurchase from './reducer-purchase';



import reducerCustomer from './reducer-customer';
import reducerOrder from './reducer-order';

import reducerProduct from './reducer-product';
import reducerProductLog from './reducer-product-log';
import reducerSerial from './reducer-serial';

import reducerCategory from './reducer-category';
import reducerSupplier from './reducer-supplier';
import reducerUnit from './reducer-unit';
import reducerDeleteReason from './reducer-delete-reason';
import reducerTransporter from './reducer-transporter';

import reducerBillAccount from './reducer-bill-account';
import reducerBill from './reducer-bill';
import reducerPayment from './reducer-payment';

import reducerCusType from './reducer-customer-type' ;
import reducerLevel from './reducer-level';
import reducerCusStatus from './reducer-customer-status';
import reducerCusOriginal from './reducer-customer-original';
import reducerWarehouses from './reducer-warehouse';
import reducerWarehouseReceipt from './reducer-warehouse-receipt';

import reducerIservice from './reducer-iservice';
import reducerRole from './reducer-role';

import reducerCoupon from './reducer-coupon';



const allReducers = combineReducers({
  departments:reducerDepartment,
  users:reducerUser,
  offices:reducerOffice,
  regions:reducerRegion,
  subregions:reducerSubregion,
  stores:reducerStore,

  purchases:reducerPurchase,

  customers:reducerCustomer,
  orders:reducerOrder,
  products:reducerProduct,
  product_logs:reducerProductLog,
  serials:reducerSerial,

  categories:reducerCategory,
  suppliers:reducerSupplier,
  units:reducerUnit,
  delete_reasons:reducerDeleteReason,
  transporters:reducerTransporter,
  bill_accounts:reducerBillAccount,
  bills:reducerBill,
  payments:reducerPayment,
  customer_types:reducerCusType,
  levels:reducerLevel,
  customer_status:reducerCusStatus,
  customer_originals:reducerCusOriginal,
  warehouses:reducerWarehouses,
  warehouse_receipts:reducerWarehouseReceipt,
  iservices:reducerIservice,
  roles:reducerRole,
  coupons:reducerCoupon

});

export default allReducers;
