'use client'
import { useSearchParams } from 'next/navigation'
import { FormEvent } from 'react';


export default async function Car() {
    // Fetch data from API
    async function getCarData(carId: string) {
        const response = await fetch('http://localhost:3000/api/?carid='+carId, { cache: 'no-store' })
        return await response.json();
    }

    const searchParams = useSearchParams()
    const searchCarId = searchParams.get('carid')

    if (searchCarId == null){
        return <>Please enter a car id</>
    }
    const carData = await getCarData(searchCarId);
    
    return (<>
        <table>
            <tr><td><h1>Car Data for car ID {searchCarId}</h1></td></tr>
            <tr>
                <td><h2>Car Details</h2></td>
                <td><h2>Driver Details</h2></td>
                <td><h2>Engine Details</h2></td>
            </tr>
            <tr>
                <td>
                    <form>
                        ID: <input type="text" name="carid" defaultValue={carData.car[0].carid} readOnly></input><br/>
                        Make: <input type="text" name="carMake" defaultValue={carData.car[0].make}></input><br/>
                        Model: <input type="text" name="carModel" defaultValue={carData.car[0].model}></input><br/>
                        Year: <input type="text" name="carYear" defaultValue={carData.car[0].year}></input><br/>
                        <button type="submit">Update Car Details</button>
                    </form>
                </td>
                <td>
                    Driver Name: <input type="text" name="driverMake" value={carData.car[0].driver.name} readOnly></input><br/>
                    License Number: <input type="text" name="driverLicense" value={carData.car[0].driver.licensenumber} readOnly></input><br/>
                    Address: <input type="text" name="driverAddress" value={carData.car[0].driver.address} readOnly></input><br/>
                    Phone: <input type="text" name="driverPhone" value={carData.car[0].driver.phone} readOnly></input><br/>
                </td>
                <td>
                    Engine Type: <input type="text" name="engineType" value={carData.car[0].engine.enginetype} readOnly></input><br/>
                    Horse Power: <input type="text" name="engineHP" value={carData.car[0].engine.horsepower} readOnly></input><br/>
                    Torque: <input type="text" name="engineTorque" value={carData.car[0].engine.torque} readOnly></input><br/>
                </td>
            </tr>
        </table>
        <br/><br/><br/><h1>Full JSON</h1>
        {JSON.stringify(carData)}
    </>)
}