export interface IDataVehicle{
  first: string,
  last?: string,
  middle?: string,
}


export interface ICommon
{
  vehicleData?: Array<IDataVehicle>,
  equipment?: Array<IDataVehicle>
}

