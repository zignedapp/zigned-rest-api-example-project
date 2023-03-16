import React from "react";
import { Link } from "@remix-run/react";
interface IBigButtonProps {
  label: string | React.ReactNode;
  to?: string;
}

export default function BigButtonLink({ label, to = "" }: IBigButtonProps) {
  return (
    <Link className="big button-link light outline" to={to}>
      <span className="inner">{label}</span>
    </Link>
  );
}
