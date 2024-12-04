import type { NextRequest } from 'next/server'
export const runtime = 'edge'

export async function GET(request: NextRequest) {
    try {
        const response = await fetch('https://freeipapi.com/api/json');
        const data:any = await response.json();
        const CountryCode = data.countryCode;

        return new Response(CountryCode)
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Failed to fetch location' }))
    }
}
