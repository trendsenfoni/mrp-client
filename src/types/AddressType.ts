import { FirmType } from './FirmType'

export interface AddressType {
  _id?: string
  firm?: FirmType
  name?: string
  room?: string
  streetName?: string
  blockName?: string
  buildingName?: string
  buildingNumber?: string
  citySubdivisionName?: string
  cityName?: string
  postalZone?: string
  postbox?: string
  region?: string
  district?: string
  country?: CountryType

}

export interface CountryType {
  identificationCode?: string
  name?: string

}