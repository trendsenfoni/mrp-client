"use client"

import ButtonLink from '@/components/button-link'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'

import { PaginationType } from '@/types/PaginationType'
import Loading from '@/components/loading'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import Pagination from '@/components/pagination'
import { FirmType } from '@/types/FirmType'
import { ItemType } from '@/types/ItemType'
import { getList } from '@/lib/fetch'
import Cookies from 'js-cookie'
import { Button } from '@/components/ui/button'
import { ButtonInfo } from '@/components/button-information'
import { Label } from '@/components/ui/label'
import { Skeleton } from '@/components/ui/skeleton'
interface Props {
  store: string
}

export function ItemList({ store }: Props) {
  const [token, setToken] = useState('')
  const [list, setList] = useState<ItemType[]>([])

  const [loading, setLoading] = useState(false)
  const { toast } = useToast()
  const [pagination, setPagination] = useState<PaginationType>({ pageCount: 0, page: 1, pageSize: 10, totalDocs: 0 })
  const [search, setSearch] = useState('')

  const load = (pageNo?: number, s?: string) => {
    let url = `/${store}/items?pageSize=${pagination.pageSize}&page=${pageNo || pagination.page}`
    if (s != undefined) url += `&search=` + encodeURIComponent(s)

    setLoading(true)
    getList(url, token)
      .then(result => {
        console.log('result:', result)
        setList(result.docs as ItemType[])
        setPagination(result as PaginationType)
      })
      .catch(err => toast({ title: 'Error', description: err, variant: 'destructive' }))
      .finally(() => setLoading(false))
  }
  useEffect(() => { !token && setToken(Cookies.get('token') || '') }, [])
  useEffect(() => { token && load(1, '') }, [token])

  return (<>
    <div className='flex flex-col gap-4 w-full'>
      <div className='grid grid-cols-1 md:grid-cols-7 gap-4 '>
        <div className='md:col-span-3'>
          <h1 className='text-3xl ms-2 hidden md:flex gap-4 text-primary'>
            <i className="fa-solid fa-boxes-stacked me-2"></i> Ürünler
          </h1>
        </div>
        <div className='flex flex-row items-center justify-end  md:col-span-4 gap-2'>
          {/* <div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'> */}
          <div className="relative flex-grow md:max-w-80">
            <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Input
              type='search'
              // className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
              className="ps-8 w-full"
              placeholder="ara..."
              defaultValue={search}
              onChange={e => {
                setSearch(e.target.value)
                e.target.value == "" && load(1, "")
              }}
              onKeyDown={e => e.code == 'Enter' && load(1, search)}
            />
          </div>
          <div className='flex-shrink'>
            <ButtonInfo text={<i className='fa-solid fa-filter'></i>} >
              <div className='flex flex-col gap-2'>
                <div>
                  <Label>fitifit</Label>
                  <Input />
                </div>
                <div>
                  <Label>qwerty</Label>
                  <Input />
                </div>
              </div>
            </ButtonInfo>
          </div>
          {/* </div> */}
        </div>
      </div>
      <hr />
      <div className='grid grid-cols-4'>
        <div>Ürün/Kod</div>
        <div>Üretici</div>
        <div className='text-right'>Fiyat</div>
        <div className="text-right text-2xl">#</div>
      </div>
      {!loading && <>

        {list.map(e => (
          <div key={e._id} className='flex flex-col w-full'>
            <div className='flex flex-col w-full'>

              <div className='flex flex-col w-full'>
                {e.name}

              </div>
              <div className='flex flex-row justify-between w-full gap-4'>
                <div className='grid grid-cols-3 w-full'>
                  <div className='flex flex-col  text-xs text-muted-foreground'>
                    <span >{e.code}</span>
                    <span >{e.group} group</span>
                  </div>
                  <div className='flex flex-col'>
                    {e.brand}Brand
                    <span className='text-xs text-muted-foreground'>{e.manufacturerCode}ereer</span>
                  </div>
                  <div className="font-medium flex flex-col text-right">
                    55
                    <span className='text-xs text-muted-foreground'>Kdv%{e.vatRate} Net:455.65</span>
                  </div>
                </div>
                <div className="flex justify-center align-middle gap1-4 text-xl">
                  <Button variant={'outline'} onClick={() => alert(e.name)} >
                    <i className="fa-solid fa-square-plus"></i>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
        <Pagination pagination={pagination} onPageClick={(pageNo: number) => {
          setPagination({ ...pagination, page: pageNo })
          load(pageNo, search)
        }} />
      </>}
      {loading && Array.from(Array(10).keys()).map(e => (
        <div key={e} className='my-2'>
          <div className='grid grid-cols-4 gap-2'>
            <Skeleton className="h-4 " />
            <Skeleton className="h-4 " />
            <Skeleton className="h-4 " />
            <Skeleton className="h-4 " />
          </div>
        </div>
      ))}
    </div>
  </>)
}