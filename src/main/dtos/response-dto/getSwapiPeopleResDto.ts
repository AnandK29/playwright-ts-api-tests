import { Url } from "url";

type getSwapiPeopleApiRes = {
  "count": number, 
  "next": string | Url, 
  "previous": string | null, 
  "results": Array<Object>,
}