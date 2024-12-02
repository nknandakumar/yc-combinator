import { auth, signIn, signOut } from "@/auth";


import Image from "next/image";
import Link from "next/link";
import React from "react";

const NavBar = async () => {
	const session = await auth();
	return (
		<header className="px-5 py-3 bg-white shadow-sm font-work-sans">
			<div className="flex justify-between items-center">
				<Link href="/">
					<Image src="/logo.png" alt="logo" width={144} height={30} />
				</Link>
		
			<div className="flex items-center gap-5 text-black ">
				{session && session?.user ? (
					<>
						<Link href={"/startup/create"}>
							<span>Create</span>
						</Link>

						<form action={async()=>  {
               "use server"
               await signOut({options : {RedirectTo:"/"}})
            }}>
              <button type="submit">Logout</button>
            </form>

						<Link href={`/user/${session?.id}`}>
							<span>{session?.user?.name}</span>
						</Link>
					</>
				) : (
					<>
						<form
							action={async () => {
                "use server"
								await signIn({ provider: "github" });
							}}
						>
						   <button type="submit">Login</button>
						</form>
					</>
				)}
			</div>
      </div>
		</header>
	);
};

export default NavBar;
