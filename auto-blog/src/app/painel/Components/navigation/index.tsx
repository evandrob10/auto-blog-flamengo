import Link from "next/link";

export default function Navigation() {
    return (
        <nav>
            <ul className='flex items-center justify-center py-2'>
                <Link href={'/painel/'} className="mr-2">INICIO</Link>
                <Link href={'/painel/posts'}>POSTS</Link>
            </ul>
        </nav>
    )
}
