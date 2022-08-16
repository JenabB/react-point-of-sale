import React, { useEffect, FC } from "react";
import { format } from "fecha";
import { Button, Modal, Typography, Descriptions } from "antd";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { DashboardActions, DashboardSelectors, DashboardModels } from "../../";

interface Props {
  invoice: DashboardModels.Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}
const InvoiceDetail: FC<Props> = (props) => {
  console.log(props, "detail");
  const dispatch = useAppDispatch();

  const { shopId } = useAppSelector(DashboardSelectors.selectShop);
  const invoice = useAppSelector(DashboardSelectors.selectInvoiceDetails);

  useEffect(() => {
    if (props.invoice?.invoiceId) {
      dispatch(
        DashboardActions.getInvoiceById({
          shopId,
          invoiceId: props.invoice?.invoiceId,
        })
      );
    }
  }, [dispatch, props.invoice?.invoiceId, shopId]);
  return (
    <Modal
      title="Invoice Details"
      visible={props.isOpen}
      //   onOk={handleOk}
      onCancel={props.onClose}
    >
      {invoice ? (
        <>
          <Descriptions bordered column={1}>
            <Descriptions.Item label="Invoice Code">
              {invoice.invoiceCode}
            </Descriptions.Item>
            <Descriptions.Item label="Invoice Id">
              {invoice.invoiceId}
            </Descriptions.Item>
            <Descriptions.Item label="Customer Name">
              {invoice.customerName}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {format(new Date(invoice.createdAt), "D MMM YYYY")}
            </Descriptions.Item>
          </Descriptions>
        </>
      ) : (
        <h1>Loading...</h1>
      )}
    </Modal>
  );
};

export default InvoiceDetail;
