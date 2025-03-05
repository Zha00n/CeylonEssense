import Link from 'next/link';


export default function Footer() {
    return (
<footer className="font-sans bg-custom-brown dark:bg-gray-900">
    <div className="container px-6 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-y-10 lg:grid-cols-4">
            <div className="sm:col-span-2">
                <h1 className="max-w-lg text-xl font-semibold tracking-tight text-white xl:text-2xl dark:text-white">Pure. Authentic. Sri Lankan.</h1>

                <div className="flex flex-col mx-auto mt-6 space-y-3 md:space-y-0 md:flex-row">
                        <p className='w-[70%] text-zinc-200 italic'>Ceylon Essence offers you an authentic connection to the vibrant culture and natural bounty of Sri Lanka. With ethically sourced spices, herbs, and natural products, we bring the island's finest offerings to your doorstep. Join us in supporting local communities and preserving the beauty of Sri Lanka, one product at a time.</p>
                </div>
            </div>

            <div>
                <p className="font-semibold text-white dark:text-white">Quick Link</p>

                <div className="flex flex-col items-start mt-5 space-y-2">
                    <Link href={"/"}>
                    <p className="transition-colors duration-300 text-white/50 dark:text-gray-300 dark:hover:text-blue-600 hover:underline hover:cursor-pointer hover:text-blue-500">Home</p>
                    </Link>
                    <Link href={"/products"}>
                    <p className="transition-colors duration-300 text-white/50 dark:text-gray-300 dark:hover:text-blue-600 hover:underline hover:cursor-pointer hover:text-blue-500">Our Products</p>
                    </Link>
                    <Link href={"/about"}>
                    <p className="transition-colors duration-300 text-white/50 text-z dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">About US</p>
                    </Link>
                    <Link href={"/resourceCenter"}>
                    <p className="transition-colors duration-300 text-white/50 text-z dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Resource Center</p>
                    </Link>
                    <Link href={"/contact"}>
                    <p className="transition-colors duration-300 text-white/50 text-z dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Contact US</p>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col items-end">
                <p className="text-4xl font-semibold text-white dark:text-white">Ceylon Essence</p>

                <div className="flex flex-col items-end mt-5 space-y-2">
                    <p className="text-white transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">No. 123, Ja-Ela, Sri Lanka</p>
                    <p className="text-white transition-colors duration-300 dark:text-gray-300 dark:hover:text-blue-400 hover:underline hover:cursor-pointer hover:text-blue-500">Tel: +9407222222</p>
                </div>
            </div>
        </div>
        
        <hr className="h-2 my-6 border-gray-200 md:my-8 dark:border-gray-700" />
        
        <div className="sm:flex sm:items-center sm:justify-between">
            <div className="flex flex-1 gap-4 ">

            </div>
            
            <div className="flex gap-4 hover:cursor-pointer">
                <Link href={'https://www.facebook.com'} target='_blank'><img src="https://www.svgrepo.com/show/303113/facebook-icon-logo.svg" width="30" height="30" alt="fb" /></Link>
                <Link href={'https://www.instegram.com'} target='_blank'><img src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" width="30" height="30" alt="inst" /></Link>
                <Link href={'https://www.youtube.com'} target='_blank'><img src="https://www.svgrepo.com/show/303198/youtube-icon-logo.svg" width="30" height="30" alt="yt" />
                </Link>
                <Link href={'https://www.linkedin.com'} target='_blank'><img src="https://www.svgrepo.com/show/303299/linkedin-icon-2-logo.svg" width="30" height="30" alt="in" /></Link>
                <Link href={'https://www.tiktok.com'} target='_blank'><img  src="https://www.svgrepo.com/show/487139/brand-tiktok-sq.svg" width="30" height="30" alt="in" /></Link>


                

                {/* <img src="https://www.svgrepo.com/show/303115/twitter-3-logo.svg" width="30" height="30" alt="tw" />
                <img src="https://www.svgrepo.com/show/303145/instagram-2-1-logo.svg" width="30" height="30" alt="inst" />
                <img src="https://www.svgrepo.com/show/94698/github.svg" className="" width="30" height="30" alt="gt" />
                <img src="https://www.svgrepo.com/show/22037/path.svg" width="30" height="30" alt="pn" />
                <img src="https://www.svgrepo.com/show/28145/linkedin.svg" width="30" height="30" alt="in" />
                <img src="https://www.svgrepo.com/show/22048/dribbble.svg" className="" width="30" height="30" alt="db" /> */}
            </div>
        </div>
        <p className="p-8 font-sans text-start md:text-center md:text-lg md:p-4">© 2025 Ceylon Essence (PVT) LTD. All rights reserved.</p>
    </div>
</footer>
    );
  }
  














  {/* <footer className="py-6 text-white bg-custom-brown">
        <div className="max-w-7xl mx-auto flex justify-between p-[50px]">
          <div>
            <h4 className="font-bold">Ceylon Essence</h4>
            <p>No. 123, Ja-Ela, Sri Lanka</p>
            <p>Tel: +9407222222</p>
          </div>
          <div className="text-sm">&copy; 2025 All rights reserved.</div>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">Facebook</a>
            <a href="#" className="hover:underline">Twitter</a>
            <a href="#" className="hover:underline">Instagram</a>
          </div>
        </div>
      </footer> */}