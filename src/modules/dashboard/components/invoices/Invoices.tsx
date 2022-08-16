import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { DashboardActions, DashboardSelectors } from "../..";
import InvoiceList from "./InvoiceList";
import EmptyInvoice from "./EmptyInvoice";

const Invoices = () => {
  const dispatch = useAppDispatch();

  const invoices = useAppSelector(DashboardSelectors.selectInvoices);

  return (
    <div>
      {invoices ? <InvoiceList invoices={invoices} /> : <EmptyInvoice />}
    </div>
  );
};

export default Invoices;
