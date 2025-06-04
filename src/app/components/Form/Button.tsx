'use client'
import { useRouter } from "next/navigation";

export default function Button({route, text}) {
    const router = useRouter();
    
    return (
        <button className="button" type="button" onClick={() => router.push(route)}>{text}</button>
    );

}