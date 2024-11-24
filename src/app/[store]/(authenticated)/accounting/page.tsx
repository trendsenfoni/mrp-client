"use client"
import { BreadcrumbAbi } from '@/components/breadcrumb'

interface Props {
  params: {
    store: string
  }
}
export default function AccountingPage({ params }: Props) {

  return (<>
    <BreadcrumbAbi store={params.store} list={[
      { href: `/accounting`, children: "Cari" },
    ]} />
    <h1 ><i className="fa-solid fa-file-invoice me-2"></i> Cari</h1>
    <hr />

  </>)
}