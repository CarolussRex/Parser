import { JSDOM } from 'jsdom'
import {  IDataVehicle, ICommon } from './types/types'

let data: Array<IDataVehicle> = []
const tabs: Array<string> = ["#vinTabsGeneral", "#vinStandardEquipment"]
const tabsData: ICommon = {}

const vehicleParse = async (file: string) => {
  try {
    const dom = await JSDOM.fromFile('./public/'+ file)
    const doc = dom.window.document
    
    tabs.forEach((tab ) => {
        const id = doc.querySelector(tab)
        const header = id.querySelector('.printonly').textContent
        const table = id.querySelector('.vinInfoTable')
        const tbody = table.querySelector('tbody')
        const tr = tbody.querySelectorAll('tr')

        tr.forEach((i:HTMLTableRowElement ) => {
          const tds = i.querySelectorAll('td')
          if (tds.length === 2){
            if(tds[1].textContent.replace(/\s+/g, " ") == " "){
              const post: IDataVehicle = {
                first: tds[0].textContent,
                }
              data.push(post) 
            }
            else{
              const post: IDataVehicle = {
                first: tds[0].textContent,
                last: tds[1].textContent,
                }
              data.push(post)}
            } 
          else{
            const post: IDataVehicle = {
              first: tds[0].textContent,
              middle: tds[1].textContent,
              last: tds[2].textContent,
              }
            data.push(post)       
          }
        })

      if (header == "Vehicle data")
        tabsData.vehicleData = data
      else
        tabsData.equipment = data

    data = []
    })
  
    let print = JSON.stringify(tabsData, null, 1)
    console.log(print)
  
  }
   catch (e) {
    console.log(e)
  }
}
 
vehicleParse('abath.html')
