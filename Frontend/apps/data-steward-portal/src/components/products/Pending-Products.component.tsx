import { ProductApproveStatusEnum } from '@b2b-app-mfe/services';
import ProductTable from '../datatable/ProductTable.component';

const PendingProducts = () => {
  return (
    <div>
      <ProductTable status={ProductApproveStatusEnum.PENDING} />
    </div>
  );
};

export default PendingProducts;
