import { ProductApproveStatusEnum } from '@b2b-app-mfe/services';
import ProductTable from '../datatable/ProductTable.component';

const ApprovedProducts = () => {
  return (
    <div>
      <ProductTable status={ProductApproveStatusEnum.APPROVED} />
    </div>
  );
};

export default ApprovedProducts;
