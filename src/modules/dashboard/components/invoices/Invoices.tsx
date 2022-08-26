import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../common/state/hooks";
import { DashboardActions, DashboardSelectors } from "../..";
import InvoiceList from "./InvoiceList";
import EmptyInvoice from "./EmptyInvoice";

const Invoices = () => {
  const dispatch = useAppDispatch();

  const { data } = useAppSelector(DashboardSelectors.selectInvoices);

  return <div>{data ? <InvoiceList invoices={data} /> : <EmptyInvoice />}</div>;
};

export default Invoices;
