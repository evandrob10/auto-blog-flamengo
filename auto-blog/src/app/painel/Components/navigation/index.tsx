import Link from "next/link";

export default function Navigation() {
    return (
        <nav className="bg-black">
            <ul className='mx-auto sm:w-[40%] flex items-center justify-evenly py-2 text-[#FFF]'>
                <Link href={'/painel/'}>INICIO</Link>
                <Link href={'/painel/posts'}>POSTS</Link>
                <Link href={'/painel/posts/imports'}>IMPORTAÇÃO</Link>
            </ul>
        </nav>
    )
}
