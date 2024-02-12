import { NextResponse } from "next/server";
import { createClient } from '@/utils/supabase/server'
import { NextRequest } from 'next/server'

export async function GET(request: NextRequest){
    if (request != null){
        const searchParams = request.nextUrl.searchParams
        const requestedCarId = searchParams.get('carid')

        // Check if value is null
        if (requestedCarId == null) {
            return {}
        }
        
        // Load all database data for given car
        const supabase = createClient()
        const { data: car } = await supabase.from('car')
        .select('*, engine!inner(*), driver!inner(*), roadtaxhistory(*), insurancedetails(*), servicehistory!inner(*), maintenancehistory(*)')
        .eq('carid', requestedCarId)
             
        return NextResponse.json( { car } )
    }
}

export async function POST(request: NextRequest){
    if (request != null){
        const searchParams = request.nextUrl.searchParams
        const updateCarId = searchParams.get('carid')
        const updateCarMake = searchParams.get('carMake')
        const updateCarModel = searchParams.get('carModel')
        const updateCarYear = searchParams.get('carYear')

        // Update database
        const supabase = createClient()
        const { data: car } = await supabase.from('car')
        .update(
            {carid: updateCarId, make: updateCarMake, model: updateCarModel,year: updateCarYear}
        )
        .eq('carid', updateCarId)
        .select('*, engine!inner(*), driver!inner(*), roadtaxhistory(*), insurancedetails(*), servicehistory!inner(*), maintenancehistory(*)')
             
        return NextResponse.json( { car } )
    }
}