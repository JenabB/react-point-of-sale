import React, { useEffect, FC } from "react";
import { Modal, Typography, Descriptions, List } from "antd";
import { useParams } from "react-router-dom";
import { formatDate } from "../../../../common/utils";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { DashboardSelectors, DashboardModels } from "../../";
import { InvoiceActions } from "../../action";
import InvoiceDetailSkeleton from "./InvoiceDetailSkeleton";

interface Props {
  invoice: DashboardModels.Invoice | null;
  isOpen: boolean;
  onClose: () => void;
}

const InvoiceDetail: FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const { id } = useParams();
  const invoice = useAppSelector(DashboardSelectors.selectInvoiceDetails);

  useEffect(() => {
    dispatch(
      InvoiceActions.getInvoiceById({
        shopId: id,
        invoiceId: props.invoice?.invoiceId,
      })
    );
  }, [dispatch, id, props.invoice?.invoiceId]);

  return (
    <Modal
      title="Invoice Details"
      visible={props.isOpen}
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
              {formatDate(invoice.createdAt)}
            </Descriptions.Item>
          </Descriptions>
          <div style={{ marginTop: 20 }}>
            <Typography.Paragraph>Products</Typography.Paragraph>
            <List
              dataSource={invoice.products}
              renderItem={(item: any) => (
                <List.Item>
                  <List.Item.Meta
                    title={item.productName}
                    description={item.productPrice}
                  />
                  <div>{item.quantity}</div>
                </List.Item>
              )}
            />
          </div>
        </>
      ) : (
        <InvoiceDetailSkeleton />
      )}
    </Modal>
  );
};

export default InvoiceDetail;
